"use client";
import React, { useEffect, useState } from "react";

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
import { Element, Link as ScrollLink, Button as ScrollBtn } from "react-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TypeAnimation } from "react-type-animation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoriesPreview = () => {

  const router = useRouter()
  return (
    <div className="   py-20 ">
      <Element name="categories" />
      <div className="pb-10 text-center" data-aos="zoom-in">
        <div className="flex justify-center flex-col lg:flex-row">
          <h2 className="mb-4 ">Shop by</h2>{" "}
          <h2 className="mb-4 px-2 text-primary">category</h2>
        </div>
        <p className="text-muted-foreground">
          Free Shipping On All Orders Over $99. #organicly20
        </p>
      </div>
      {/*use just: 'grid' to also implement default: auto-cols-auto(instead of eg grid-cols-2) and auto-rows-auto(instead of eg grid-rows-2)
          #use with grid item: row-span-1 or col-span-1 to control row and col span for that grid column
          #grid also accepts align-items,align-content, and justify-content
          
          */}

      <div className="grid md:grid-cols-4    ">
        <div
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2021/01/11/06/52/vegetables-5907330_1280.jpg')",
          }}
          className="group md:row-span-2 h-[300px] md:h-[600px]   bg-top bg-no-repeat bg-cover flex    "
        >
          <div className="transition-all duration-500   group-hover:bg-black/40 flex justify-center items-center grow">
            <div className=" p-2  space-y-4 text-white max-w-[400px] invisible group-hover:visible transition-all duration-500">
              <h3>Vegetables</h3>
              <p className="line-clamp-5">
                Explore our farm-fresh organic vegetables, bursting with flavor
                and nutrients.
              </p>
              <Button
                className="text-white bg-accent"
                onClick={() => router.push("/category/vegetables")}
              >
                <ShoppingCart className="mr-3 h-6 w-6" /> Shop now
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2023/10/27/19/51/fruits-8346138_1280.jpg')",
          }}
          className="md:col-span-2 h-[300px] group   bg-top bg-no-repeat bg-cover flex    "
        >
          <div className="transition-all duration-500   group-hover:bg-black/40 flex justify-center items-center grow">
            <div className="p-2 space-y-4 text-white max-w-[400px] invisible group-hover:visible transition-all duration-500">
              <h3>Fruits</h3>
              <p>
                Enjoy a burst of natural sweetness and goodness in every bite.
              </p>
              <Button
                className="text-white bg-accent"
                onClick={() => router.push("/category/fruits")}
              >
                <ShoppingCart className="mr-3 h-6 w-6" /> Shop now
              </Button>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2018/09/14/11/12/food-3676796_1280.jpg')",
          }}
          className="  h-[300px] group   bg-top bg-no-repeat bg-cover flex    "
        >
          <div className="transition-all duration-500   group-hover:bg-black/40 flex justify-center items-center grow">
            <div className="p-2 space-y-4 text-white max-w-[400px] invisible group-hover:visible transition-all duration-500">
              <h3>Meat & Poultry</h3>
              <p>
                Premium organic meat and poultry, raised with care-superior
                quality and flavorful.
              </p>
              <Button
                className="text-white bg-accent"
                onClick={() => router.push("/category/meat-poultry")}
              >
                <ShoppingCart className="mr-3 h-6 w-6" /> Shop now
              </Button>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2016/11/29/13/33/cocktails-1869868_1280.jpg')",
          }}
          className="  h-[300px] group   bg-top bg-no-repeat bg-cover flex    "
        >
          <div className="transition-all duration-500   group-hover:bg-black/40 flex justify-center items-center grow">
            <div className=" p-2 space-y-4 text-white max-w-[400px] invisible group-hover:visible transition-all duration-500">
              <h3>Milk & Drinks</h3>
              <p>
                Discover our diverse milk and drinks collection featuring
                organic juices and dairy products.
              </p>
              <Button
                className="text-white bg-accent"
                onClick={() => router.push("/category/milk-drinks")}
              >
                <ShoppingCart className="mr-3 h-6 w-6" /> Shop now
              </Button>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2018/02/23/13/28/eat-3175540_1280.jpg')",
          }}
          className="md:col-span-2 h-[300px] group   bg-top bg-no-repeat bg-cover flex    "
        >
          <div className="transition-all duration-500   group-hover:bg-black/40 flex justify-center items-center grow">
            <div className="p-2 space-y-4 text-white max-w-[400px] invisible group-hover:visible transition-all duration-500">
              <h3>Fish and Seafood</h3>
              <p>
                Explore ocean-fresh goodness in our Fish & Seafood category.
                From Wild-caught Salmon to Jumbo Shrimp, discover exquisite
                flavors for every palate.
              </p>
              <Button
                className="text-white bg-accent"
                onClick={() => router.push("/category/all")}
              >
                <ShoppingCart className="mr-3 h-6 w-6" /> Shop now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPreview;
