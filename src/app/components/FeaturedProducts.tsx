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
import ProductOptions from "./ProductOptions";
import { useToast } from "@/components/ui/use-toast";
import { IProduct } from "../types/product";
import ProductItem from "./ProductItem";

type FeaturedProductsProps = {
  products: IProduct[];
};

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <div className=" flex flex-col md:flex-row gap-y-8   justify-between px-10   py-20 gap-x-4 ">
      <div className="basis-3/6">
        <div className="pb-10 text-center" data-aos="zoom-in">
          <div className="flex justify-center flex-col lg:flex-row">
            <h3 className="mb-4   text-primary">Recommended</h3>
            <h3 className="mb-4 px-2 ">for you</h3>
          </div>

          <p className="text-muted-foreground">
            Free Shipping On All Orders Over $99. #organicly20
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8 border dark:border-border-light p-6 rounded-md ">
          {products
            .filter((prod) => prod.tags.includes("Recommended"))
            .slice(0, 3)
            .map((product, i) => (
              <ProductItem key={i} product={product} i={i} />
            ))}
        </div>
      </div>
      <div className="basis-3/6">
        <div className="pb-10 text-center">
          <div
            className="flex justify-center flex-col lg:flex-row"
            data-aos="zoom-in"
          >
            <h3 className="mb-4  ">Best</h3>{" "}
            <h3 className="mb-4 px-3 text-primary">sellers</h3>
          </div>

          <p className="text-muted-foreground">
            Free Shipping On All Orders Over $99. #organicly20
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8 border dark:border-border-light p-6 rounded-md">
          {products
            .filter((prod) => prod.tags.includes("Best sellers"))
            .slice(0, 3)
            .map((product, i) => (
              <ProductItem key={i} product={product} i={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
