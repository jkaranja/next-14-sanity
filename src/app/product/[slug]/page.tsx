import { groq } from "next-sanity";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import fetcher from "../../../../sanity/lib/fetcher";
import { IProduct } from "@/app/types/product";
import Image from "next/image";
import {
  CheckSquare,
  Minus,
  Plus,
  ShoppingCart,
  StarIcon,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useContextValue } from "@/app/hooks/useContextValue";
import { IItem } from "@/app/types/cart";
import { urlForImage } from "../../../../sanity/lib/image";
import SingleProduct from "./components/SingleProduct";
import { client } from "../../../../sanity/lib/client";

type ProductProps = {
  params: { slug: string };
};

export const revalidate = 3600; //in secs// revalidate at most every hour

export async function generateStaticParams() {
  const query = groq`
*[_type == "product"]  {
  slug
  } [0...20]
  `;
  const products = await client.fetch<IProduct[]>(query);

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

const Product = async ({ params: { slug } }: ProductProps) => {
  const query = groq`
*[_type == "product" && slug.current == $slug][0]  {
  ...,
"id": _id,
reviews[]->,
tags[],
weight[],
productImages[],
vendor->
  } 
  `;

  const product = await client.fetch<IProduct>(query, {
    slug,
  });

  if (!product) return <div className="flex py-4">Loading</div>;

  return (
    <div className="">
      <SingleProduct product={product} />
    </div>
  );
};

export default Product;
