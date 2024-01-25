"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Facebook,
  Grape,
  Heart,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  MoveDown,
  MoveRight,
  Phone,
  ShoppingCart,
  StarHalf,
  StarIcon,
  Twitter,
} from "lucide-react";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Element, Link as ScrollLink, Button as ScrollBtn } from "react-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TypeAnimation } from "react-type-animation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Post } from "../types/post";
import { urlForImage } from "../../../sanity/lib/image";
import { useRouter } from "next/navigation";

type BlogSectionProps = {
  posts: Post[];
};

const BlogSection = ({ posts }: BlogSectionProps) => {
  const router = useRouter();
  if (!posts) return <p>Loading</p>;
  return (
    <div className=" flex justify-center px-4 py-20 ">
      <div className="md:w-[80vw] ">
        <div className=" pb-12 " data-aos="zoom-in">
          <div className="flex justify-center">
            <h2 className="mb-4 font-normal">Our</h2>{" "}
            <h2 className="mb-4 px-2 text-primary">Blog</h2>
          </div>
        </div>

        <div className="">
          <Carousel
            className="w-full "
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {posts.map((post, index) => (
                <CarouselItem
                  key={index}
                  className="    md:basis-1/2 lg:basis-1/3 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  onClick={() => router.push(`/blog/${post.slug.current}`)}
                >
                  <div className="mb-4 relative   ">
                    <div className="mb-4    h-[300px] overflow-hidden rounded-md">
                      <Image
                        src={urlForImage(post.mainImage)}
                        className="object-cover rounded-md  h-[300px] w-full  hover:scale-105 transition-all duration-300"
                        alt="Organic"
                        height={400}
                        width={400}
                      />
                    </div>
                    <div className="absolute text-white -bottom-12 right-4 px-5 py-2 bg-primary rounded-lg">
                      <h4 className="">
                        {String(new Date(post._updatedAt).getDate()).padStart(
                          2,
                          "0"
                        )}
                      </h4>
                      <p>Jan</p>
                      <p>{new Date(post._updatedAt).getFullYear()}</p>
                    </div>
                  </div>

                  <div className="flex gap-x-6 px-2 mb-4">
                    <div className="flex items-center gap-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <p>10 comments</p>
                    </div>
                    {/* <div className="flex">
                    By <p className="px-1">Mark Johnson</p>
                  </div> */}
                  </div>
                  <div className="">
                    <h6 className="text-foreground font-semibold mb-4 transition-all duration-300  hover:text-primary">
                      {post.title}
                    </h6>

                    <Button
                      variant="outline"
                      className="text-primary border-primary    text-md  hover:text-white hover:border-none  "
                    >
                      Read more
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {[...Array(3)].map((_, i) => (
            <div key={i} className=" basis-2/6 "></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
