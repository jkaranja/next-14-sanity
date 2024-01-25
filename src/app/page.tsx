import React, { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";

import { Post } from "./types/post";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import { groq } from "next-sanity";
import ClientSideRoute from "./components/ClientSideRoute";
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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductOptions from "./components/ProductOptions";
import HeroSection from "./components/HeroSection";
import MainCategories from "./components/MainCategories";
import OurProducts from "./components/OurProducts";
import WhyUs from "./components/WhyUs";
import FeaturedProducts from "./components/FeaturedProducts";
import CategoryPreview from "./components/CategoriesPreview";
import BlogSection from "./components/BlogSection";
import CategoriesPreview from "./components/CategoriesPreview";

import { IProduct } from "./types/product";
import Testimonials from "./components/Testimonials";

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
