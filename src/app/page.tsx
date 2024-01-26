import { client } from "../../sanity/lib/client";

import { groq } from "next-sanity";
import { Post } from "./types/post";


import BlogSection from "./components/BlogSection";
import CategoriesPreview from "./components/CategoriesPreview";
import FeaturedProducts from "./components/FeaturedProducts";
import HeroSection from "./components/HeroSection";
import MainCategories from "./components/MainCategories";
import OurProducts from "./components/OurProducts";
import WhyUs from "./components/WhyUs";

import Testimonials from "./components/Testimonials";
import { IProduct } from "./types/product";

export const revalidate = 2; // revalidate at most every hour//in secs

const blogQuery = groq`
*[_type == "post"] | order(_updatedAt desc) [0...9] {
  ...,
categories[]->,
author->
  } 
  `;

const query = groq`
*[_type == "product"][0...40]  {
  ...,
"id": _id,
category->{name, slug, parent->{name, slug}},
reviews[]->,
tags[],
weight[],
images[],
productImages[],
vendor->
  } 
  `;

const HomePage = async () => {
  const products = await client.fetch<IProduct[]>(query);

  const posts = await client.fetch<Post[]>(blogQuery);

  // console.log(products);

  return (
    <div className="">
      <HeroSection />

      <MainCategories />

      <OurProducts products={products} />

      <WhyUs />

      <FeaturedProducts products={products} />

      <CategoriesPreview />

      <BlogSection posts={posts} />

      <Testimonials />
    </div>
  );
};

export default HomePage;
