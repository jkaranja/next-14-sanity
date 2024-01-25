"use client";

import React, { useEffect, useState, useTransition } from "react";

import Image from "next/image";
import { groq } from "next-sanity";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "../../../sanity/lib/client";
import { getPosts } from "./actions";
import { Post } from "../types/post";
import { useRouter } from "next/navigation";
import { urlForImage } from "../../../sanity/lib/image";
import Banner from "../components/Banner";
import { Calendar, Diamond, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PortableText } from "@portabletext/react";
import RichTextComponents from "../components/RichTextComponents";
import Sidebar from "./components/Sidebar";

//use groq and install sanity.io vscode extension for syntax highlighting
// Step 1: write a query
// const query = groq`
//   *[_type == 'blogPost'] {
//     // pick the title
//     title,
//     // then a full expansion of the author
//     author -> { ... },
//   }
// `;

//const query = `*[_type == "post"]`;//will return all fields
//*[_type == 'movie' && releaseYear >= 1979]
//#Projections->select only fields we want. Passed inside {}
//can also declare new fields in projections:  "directorName": director->name
//Tip: use {..., author->} //the ... selects all fields/can add fields that need custom format like reference/same like in graphql
//Note: for array fields, must use: producers[] else field will be null. even producers->
//#sorting: use | and order function=> | order(releaseYear desc, title, ...) accepts a list of fields(optional direction->default is asc)
//#Slicing the result set//add it at the end or after type array: works exactly like an array accessor
//[0]  return only the first element.i.e like array bracket notation to access specific doc eg [2] for 2nd doc
//last doc: [-1], can slice backwards eg [-3...-1]
//[0...100]: ->If we want a slice, we can add the range operator like this: [0...100]. //works like slice method i.e end index not included
//i.e This would return the first hundred movies from index 0 through 99.
//#References and joins->Expanding references/fetching referenced doc:
//director-> or director->{name} for projection //director alone would only return an object with _ref/_type only
//By adding the dereferencing operator -> we ask Sanity to follow the reference and replace it with the actual content of the document referenced
//Expanding an array of references: we will use the dereferencing operator (->) again.
//producers[]-> or with projection producers[]->{name,...}////producers[] alone would only return array with objects which have _ref/_type only
//can also declare new fields in projections:  "directorName": director->name
//#filter=>goes inside th type array: [_type == 'movie' && releaseYear >= 1979]
//Examples: [_type == 'movie' && filtersBelow:
//Text search using the match operator, e.g. *[title match "Alien*"]
//The in-operator which matches values in arrays, as in *["sci-fi" in genres]
//You can of course combine these filters using the boolean operators:
// && (and), || (or), ! (not), like this:
// *[_type == "movie" && (!("sci-fi" in genres) || releaseYear >= 1979)]
//#passing variables: use $lastId
//and pass {lastId} as second arg to fetch(`query`, {lastId})

//use count(*[_type == "post"]) //to count records//wrap your query in a count():

//NOTE: slicing should come after order else it won't work
//Otherwise, order can be:
//1.  order | slicing | projection
//2.  order | projection | Slicing
//3.  projection | order  | Slicing
const queryx = `*[_type == "post"] | order(releaseYear desc, title, ...) {  
  _id, title, releaseYear, director->{name}
}[0...20]`;

const query = groq`
*[_type == "post" && _updatedAt > $lastUpdatedAt] | order(_updatedAt desc) [0...9] {
  ...,
categories[]->,
author->
  } 
  `;


const Blog = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(
    new Date(0).toISOString()
  );

  useEffect(() => {
    startTransition(async () => {
      try {
        const results = await getPosts({ query, lastUpdatedAt });
        setPosts(results || []);
        if (results.length > 0) {
          setLastUpdatedAt(results[results.length - 1]._createdAt);
        } else {
          setLastUpdatedAt(null); // Reached the end
        }
      } catch (error) {}
    });
  }, []);

  const fetchNextPage = async () => {
    if (!lastUpdatedAt) {
      return;
    }
    // const results = await client.fetch<Post[]>(query, { lastUpdatedAt });
  };

  //to handle previous page, keep track of firstUpdatedAt and query should be updateAt < firstUpdatedAt

  return (
    <div>
      <Banner>
        <h1 className="text-4xl font-bold">Blog</h1>

        <div className="flex gap-x-3 py-2 items-center">
          <p>Home </p>
          <Diamond fill="white" className="h-2 w-2" />
          <p>
            <Link href="/blog">Blog</Link>
          </p>
        </div>
      </Banner>

      <div className=" flex justify-center  ">
        <div className="md:w-[80vw] pt-16 px-6  ">
          <div className="flex gap-x-10  flex-col lg:flex-row gap-y-5">
            <div className="basis-3/4">
              <div>
                {isPending && <div className="animate-pulse">loading</div>}
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {posts.map((post) => (
                  <Card className="group  border-border-light" key={post._id}>
                    <CardHeader className="px-0 pt-0">
                      <div className=" overflow-hidden rounded-t-md">
                        <Image
                          className="cursor-pointer object-cover rounded-t-md  h-[300px] w-full  hover:scale-105 transition-all duration-300"
                          src={urlForImage(post.mainImage)}
                          alt={post.author.name}
                          width={300}
                          height={300}
                          onClick={() =>
                            router.push(`/blog/${post.slug?.current}`)
                          }
                        />
                      </div>
                      <div className="  flex   gap-x-4 px-4">
                        {post.categories.map((cat) => (
                          <Badge
                            key={cat._id}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-white  py-2"
                          >
                            {cat.title}
                          </Badge>
                        ))}
                      </div>

                      <CardTitle
                        className="pb-3 px-4 cursor-pointer"
                        onClick={() =>
                          router.push(`/blog/${post.slug?.current}`)
                        }
                      >
                        <h5 className=" transition-all duration-300  hover:text-primary">
                          {post.title}
                        </h5>
                      </CardTitle>
                      <CardDescription className="px-4 ">
                        <div className="flex gap-x-3 ">
                          <div className="flex gap-x-1">
                            <User className="h-5 w-5" />
                            <p className="cursor-pointer transition-all duration-300  hover:text-primary">
                              Mark Philip
                            </p>
                          </div>
                          |
                          <div className="flex items-center gap-x-1">
                            <Calendar className="h-4 w-4" />
                            <p>
                              {new Date(post._createdAt).toLocaleDateString(
                                "us-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    {/* <CardContent></CardContent>
            <CardFooter className=" "></CardFooter> */}
                  </Card>
                ))}
              </div>
            </div>
            <div className="  basis-1/4  flex flex-col gap-y-5">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
