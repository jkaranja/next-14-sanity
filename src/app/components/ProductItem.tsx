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
import { IProduct } from "../types/product";
import ProductOptions from "./ProductOptions";
import { urlForImage } from "../../../sanity/lib/image";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type ProductItemProps = {
  product: IProduct;
  i: number;
};

export default function ProductItem({ product, i }: ProductItemProps) {
  const { toast } = useToast();
  const router = useRouter()
  return (
    <div
      // data-aos="fade-up"
      data-aos-delay={i * 100}
      className=" py-4 group hover:shadow-md rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <div className="mb-3 px-2 flex flex-col items-center ">
        <Image
          src={product.images[0]}
          className="object-contain cursor-pointer  rounded-t-md h-[300px]  "
          alt="Organic"
          height={400}
          width={400}
          onClick={() => router.push(`/product/${product.slug.current}`)}
        />
      </div>
      <div className="flex flex-col items-center gap-y-3 px-4">
        <h6 className="text-foreground font-semibold text-center">
          {product.title}
        </h6>

        <div className="flex">
          {[...Array(5)].map((_, i) =>
            i + 1 <= product.rating ? (
              <StarIcon
                fill="hsl(24.6 95% 53.1%)"
                strokeWidth={0}
                key={i}
                className="text-accent-foreground h-4 w-4"
              />
            ) : (
              // <StarHalf
              //   fill="hsl(24.6 95% 53.1%)"
              //   strokeWidth={0}
              //   key={i}
              //   className="text-accent-foreground h-4 w-4 "
              // />
              <StarIcon key={i} className="text-accent-foreground h-4 w-4" />
            )
          )}
        </div>
        <div className="flex gap-x-2 group-hover:hidden transition-all duration-300 ">
          <p className="line-through text-muted-foreground font-medium text-lg">
            ${product.price}
          </p>
          <p className="text-primary font-medium text-lg">
            ${product.discountedPrice}
          </p>
        </div>

        <div className="flex pt-2">
          <div className="flex gap-x-4 invisible group-hover:visible">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ProductOptions product={product}>
                    <Button
                      variant="outline"
                      size="icon"
                      className=" rounded-full  bg-muted group-hover:bg-primary border-none transition-all duration-500 "
                    >
                      <ShoppingCart className="  h-6 w-6 text-white " />
                    </Button>
                  </ProductOptions>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Add to cart</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full  bg-muted group-hover:bg-primary border-none transition-all duration-700"
                    onClick={() => {
                      toast({
                        description: "Added to Wishlist",
                      });
                    }}
                  >
                    <Heart className="  h-4 w-4 text-white " />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Wishlist</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ProductOptions product={product}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full  bg-muted group-hover:bg-primary border-none transition-all duration-1000"
                    >
                      <Eye className="  h-4 w-4 text-white " />
                    </Button>
                  </ProductOptions>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
