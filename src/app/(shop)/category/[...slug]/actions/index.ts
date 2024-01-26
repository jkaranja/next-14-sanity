"use server";

import { IProduct } from "@/app/types/product";
import { client } from "../../../../../../sanity/lib/client";

interface IQuery {
  query: string;
  slug: string;
}

//fetch coupon
export const getProducts = async ({ query, slug }: IQuery) => {
  try {
    const products = await client.fetch<IProduct[]>(query, {
      slug,
    });

    return products;
  } catch (error: any) {
    throw new Error(
      error.stack && error.message ? error.message : "Request failed"
    );
  }
};
