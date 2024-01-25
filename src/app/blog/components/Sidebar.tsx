import React, { useEffect, useState, useTransition } from "react";

import { Calendar, Diamond, Search } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { groq } from "next-sanity";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { client } from "../../../../sanity/lib/client";
import { Category, Post } from "@/app/types/post";
import { urlForImage } from "../../../../sanity/lib/image";

//posts
const query = groq`
*[_type == "post"] | order(_updatedAt desc) [0...6] {
  ...,
categories[]->,
tags[],
author->
  } 
  `;

//cat query
const catQuery = groq`
*[_type == "category"] [0...6] 
  `;

const Sidebar = () => {
  const [isPending, startTransition] = useTransition();

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const [posts, categories] = await Promise.all([
          client.fetch<Post[]>(query),
          client.fetch<Array<Category>>(catQuery),
        ]);
        setPosts(posts);
        setCategories(categories);
      } catch (error) {
        console.log;
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      <Card className="group border-border-light  ">
        <CardContent className="py-8">
          <div className="flex ">
            <Input placeholder="Search blog" className="rounded-e-none " />
            <Button size="icon" className="text-white rounded-s-none">
              <Search />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="group  border-border-light">
        <CardHeader className="">
          <CardTitle>
            <p className="text-2xl">Categories</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-dotted">
          <div>{isPending && <div className="animate-pulse">loading</div>}</div>
          {categories.map((cat) => (
            <p key={cat._id} className="  py-2">
              {cat.title}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card className="group  border-border-light">
        <CardHeader className="">
          <CardTitle>
            <p className="text-2xl">Recent Posts</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <div>{isPending && <div className="animate-pulse">loading</div>}</div>
          {posts.map((post, index) => (
            <div
              className="  flex gap-x-6"
              key={post._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="basis-2/6">
                <Image
                  className="cursor-pointer object-cover   h-[100px] w-full  hover:scale-105 transition-all duration-300"
                  src={urlForImage(post.mainImage)}
                  alt={post.author.name}
                  width={300}
                  height={1}
                />
              </div>
              <div className="basis-4/6 ">
                <div>
                  <p className="text-wrap line-clamp-2 font-semibold  transition-all duration-300  hover:text-primary">
                    {post.title}
                  </p>
                </div>
                <div className="flex items-center gap-x-1 py-2">
                  <Calendar className="h-4 w-4" />
                  <p className="text-muted-foreground text-sm">
                    {new Date(post._createdAt).toLocaleDateString("us-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="group  border-border-light">
        <CardHeader className="">
          <CardTitle>
            <p className="text-2xl">Tags</p>
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex gap-3 flex-wrap">
          {[
            "Vegetables",
            "Fruits",
            "Juices",
            "Tea and Coffee",
            "Jam",
            "SeaFood",
            "Fresh Meats",
          ].map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-white  py-2"
            >
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>

      {/* <Card className="group  ">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>
                    <h6>Recent Posts</h6>
                  </CardTitle>
                  <CardDescription className="px-4 "></CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter className=" "></CardFooter>
              </Card> */}
    </div>
  );
};

export default Sidebar;
