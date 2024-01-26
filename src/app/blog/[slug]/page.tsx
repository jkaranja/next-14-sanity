
import Banner from "@/app/components/Banner";
import RichTextComponents from "@/app/components/RichTextComponents";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PortableText } from "@portabletext/react";
import { Calendar, Diamond, MessageSquare, User } from "lucide-react";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import { Post } from "../../types/post";
import CommentForm from "./CommentForm";

type SinglePostProps = {
  params: { slug: string };
};

export const revalidate = 3600; // revalidate at most every hour

export async function generateStaticParams() {
  const query = groq`
*[_type == "post"]  {
  slug
  } [0...20]
  `;
  const posts = await client.fetch<Post[]>(query);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

const SinglePost = async ({ params: { slug } }: SinglePostProps) => {
  const query = groq`
*[_type == "post" && slug.current == $slug][0]  {
  ...,
categories[]->,
comments[]->,
author->
  } 
  `;
  const post = await client.fetch<Post>(query, {
    slug,
  });

  if (!post) return <div className="flex">loading</div>;

  return (
    <div>
      <Banner className="px-4 text-center">
        <h1 className="text-4xl font-bold">{post.title}</h1>

        <div className="flex gap-x-3 py-2 items-center">
          <p>Home </p>
          <Diamond fill="white" className="h-2 w-2" />

          <Link href="/blog">
            <p className="  transition-all duration-300  hover:text-primary">
              Blog
            </p>
          </Link>

          <Diamond fill="white" className="h-2 w-2" />
          <p className="text-sm">{post.title}</p>
        </div>
      </Banner>

      <div className=" flex justify-center px-4  ">
        <div className="md:w-[60vw] pt-16">
          <div className="    w-full h-[600px] mb-6  ">
            <Image
              className="object-cover h-[600px] w-full rounded-md"
              src={urlForImage(post.mainImage)}
              height={400}
              width={800}
              alt={post.title}
            />
          </div>

          <div className="flex gap-x-2 pb-6">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-white  py-2"
            >
              SEO
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-white  py-2"
            >
              Digital
            </Badge>
          </div>

          <div className="mb-3">
            <h1 className="text-4xl font-bold ">{post.title}</h1>
          </div>

          <div className="flex gap-x-3 py-2">
            <div className="flex gap-x-1">
              <User className="h-5 w-5" />
              <p>Mark Philip</p>
            </div>
            |
            <div className="flex items-center gap-x-1">
              <Calendar className="h-4 w-4" />
              <p>
                {new Date(post._createdAt).toLocaleDateString("us-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <MessageSquare className="h-5 w-5" />
              <p>10 comments</p>
            </div>
          </div>

          <div className="prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
            <PortableText
              value={post.body}
              components={RichTextComponents} //instead of adding this styles here manually, can also use tailwind typography plugin
            />
          </div>

          <div className="my-6 pt-6 ">
            <div>
              <Separator />
            </div>
            <div className="flex  py-4 gap-x-4">
              <p className="font-medium">Tags:</p>
              <div className="flex gap-x-3 ">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-white  py-2"
                >
                  Lettuce
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-white  py-2"
                >
                  Fruits
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-white  py-2"
                >
                  Organic
                </Badge>
              </div>
            </div>
            <div>
              <Separator />
            </div>
          </div>

          <div className="flex gap-x-4 p-4 my-14">
            <div className="">
              <Avatar className="h-14 w-14">
                {/* <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                /> */}
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col ">
              <p className="font-semibold">Mark Philip</p>

              <p>
                Phasellus non ultrices orci, quis aliquam elit. In vehicula
                consequat odio et finibus. Nulla a neque eu mi consequat varius.
                Duis porta luctus libero, at pharetra erat volutpat at
              </p>
            </div>
          </div>

          <div>
            <h5>4 Comments</h5>

            <div className="flex gap-x-4   my-8">
              <div className="">
                <Avatar className="h-14 w-14">
                  {/* <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                /> */}
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-semibold">Mark Philip</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(post._createdAt).toLocaleDateString("us-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>
                  Phasellus non ultrices orci, quis aliquam elit. In vehicula
                  consequat odio et finibus. Nulla a neque eu mi consequat
                  varius. Duis porta luctus libero, at pharetra erat volutpat at
                </p>
                <div className="py-3">
                  <Separator />
                </div>
              </div>
            </div>

            <div className="flex gap-x-4   my-8">
              <div className="">
                <Avatar className="h-14 w-14">
                  {/* <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                /> */}
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-semibold">Mark Philip</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(post._createdAt).toLocaleDateString("us-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>
                  Phasellus non ultrices orci, quis aliquam elit. In vehicula
                  consequat odio et finibus. Nulla a neque eu mi consequat
                  varius. Duis porta luctus libero, at pharetra erat volutpat at
                </p>
                <div className="py-3">
                  <Separator />
                </div>
              </div>
            </div>
          </div>

          <div>
            <CommentForm postId={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
