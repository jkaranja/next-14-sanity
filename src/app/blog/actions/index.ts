"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { client } from "../../../../sanity/lib/client";
import { Post } from "@/app/types/post";

interface IQuery {
  query: string;
  lastUpdatedAt: string | null;
}

//fetch coupon
export const getPosts = async ({ query, lastUpdatedAt }: IQuery) => {
  try {
    const posts = await client.fetch<Post[]>(query, { lastUpdatedAt });

    return posts;
  } catch (error: any) {
    throw new Error(
      error.stack && error.message ? error.message : "Request failed"
    );
  }
};
