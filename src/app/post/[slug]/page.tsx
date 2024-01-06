import React from "react";

import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import { Post } from "../../types/post";
import { urlForImage } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import RichTextComponents from "@/app/components/RichTextComponents";

const query = groq`
*[_type == "post" && slug.current == $slug][0]  {
  ...,
categories[]->,
author->
  } 
  `;

type SinglePostProps = {
  params: { slug: string };
};

export const revalidate = 3600 // revalidate at most every hour

const SinglePost = async ({ params: { slug } }: SinglePostProps) => {
  const post = await client.fetch<Post>(query, {
    slug,
  });

  if (!post) return <div className="flex">loading</div>;

  return (
    <div>
      <div>
        <hr className="border-[#F7AB8A] mb-10" />
      </div>
      {/* Posts */}

      <h1>{post.title}</h1>
      <p>
        {new Date(post._createdAt).toLocaleDateString("us-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="flex flex-col group cursor-pointer">
        <div
          className="relative w-full h-80 drop-shadow-xl group-hover:scale-185 transition-transform duration-200
ease-out"
        >
          <Image
            className="object-cover object-left lg:object-center"
            src={urlForImage(post.mainImage)}
            alt={post.author.name}
            fill
          />
        </div>

        <div>
          <PortableText value={post.body} components={RichTextComponents} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
