import { IProduct } from "@/app/types/product";
import { groq } from "next-sanity";

import { client } from "../../../../sanity/lib/client";
import SingleProduct from "./components/SingleProduct";

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
