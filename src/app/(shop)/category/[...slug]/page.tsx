"use client";
import { groq } from "next-sanity";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState, useTransition } from "react";

import { IProduct } from "@/app/types/product";
import Image from "next/image";
import {
  CheckSquare,
  Diamond,
  LayoutGrid,
  List,
  Minus,
  Plus,
  RotateCw,
  ShoppingCart,
  SlidersHorizontal,
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
import { client } from "../../../../../sanity/lib/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductItem from "@/app/components/ProductItem";
import Banner from "@/app/components/Banner";
import Link from "next/link";
import { DRINKS, FRUITS, MEAT, VEGETABLES } from "@/app/constants/menu";
import Filters from "./components/Filters";
import MobileFilters from "./components/MobileFilters";
import { Skeleton } from "@/components/ui/skeleton";

type ShopProps = {
  params: { slug: string };
};

const query = groq`
*[_type == "product" ][0...6]  {
  ...,
reviews[]->,
tags[],
weight[],
productImages[],
vendor->
  } 
  `;

const Shop = ({ params: { slug } }: ShopProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const allProducts = await client.fetch<IProduct[]>(query, {
          slug: slug[0],
        });
        setProducts(allProducts);
      } catch (error) {
        console.log;
      }
    });
  }, []);

  return (
    <div className="">
      <Banner className="px-4 text-center">
        <h3 className="uppercase">Vegetables</h3>

        <div className="flex gap-x-3 py-2 items-center">
          <p>
            <Link href="/">Home</Link>{" "}
          </p>
          <Diamond fill="white" className="h-2 w-2" />
          <p>
            <Link href="/">Vegetables</Link>
          </p>
          <Diamond fill="white" className="h-2 w-2" />
          <p>Carrots & root</p>
        </div>
      </Banner>

      <div className=" flex justify-center px-4 py-20  ">
        <div className="md:w-[70vw] flex gap-x-10">
          <div className="md:basis-1/4  ">
            <div className="hidden  md:block">
              <Filters />
            </div>
          </div>

          <div className="grow">
            <div className="py-5 flex justify-between md:items-center mb-4 gap-5  flex-col md:flex-row">
              <div className="flex gap-x-3">
                <div className="md:hidden">
                  <MobileFilters>
                    <Button variant="outline">
                      <SlidersHorizontal className=" h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </MobileFilters>
                </div>

                <Button variant="outline" size="icon">
                  <LayoutGrid />
                </Button>
                <Button variant="outline" size="icon">
                  <List />
                </Button>
              </div>

              <div className="flex items-center gap-x-3">
                <p>Sort By</p>
                <div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Default sorting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Price: low to high</SelectItem>
                      <SelectItem value="desc">Price: high to low</SelectItem>
                      <SelectItem value="dark">Popularity</SelectItem>
                      <SelectItem value="dark">Latest</SelectItem>
                      <SelectItem value="dark">Average rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="py-4">
              {isPending && (
                <RotateCw className="ml-2 h-6 w-6 text-muted-foreground animate-spin" />
              )}
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3    ">
              {products?.map((product, i) => (
                <ProductItem key={i} product={product} i={i} />
              ))}

              {isPending &&
                [...Array(3)].map((_, i) => (
                  <Skeleton key={i} className=" h-[400px] w-full rounded-md" />
                ))}
            </div>

            <div className="py-5 flex justify-between items-center">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
