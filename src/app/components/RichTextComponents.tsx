import React from "react";
import { urlForImage } from "../../../sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const RichTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="w-full h-96 mx-auto">
        <Image src={urlForImage(value)} alt="" fill />
      </div>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-5xl py-10 font-bold">{children}</h1>
    ),

    h2: ({ children }: any) => (
      <h2 className="text-4xl py-10 font-bold">{children}</h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="text-3xl py-10 font-bold">{children}</h3>
    ),

    h4: ({ children }: any) => (
      <h4 className="text-2xl py-18 font-bold">{children}</h4>
    ),

    Blockquote: ({ children }: any) => (
      <blockquote className="border-1-[#F7ABBA] border-1-4 pl-5 py-5 my-5">
        {" "}
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>,
    number: ({ children }: any) => <ol className="mt-lg list-decimal">{children}</ol>
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href} rel={rel} className="underline decoration-[red] hover:decoration-slate-600">
          {children}
        </Link>
      );
    },
  },
};

export default RichTextComponents;
