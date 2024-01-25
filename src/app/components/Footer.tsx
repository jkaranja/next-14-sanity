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
  ArrowUp,
  Diamond,
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
  animateScroll as scroll,
  Element,
  Link as ScrollLink,
  Button as ScrollBtn,
} from "react-scroll";

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
import useScrollTrigger from "../hooks/useScrollTrigger";
import CartPreview from "../cart/CartPreview";

const Footer = () => {
  const trigger = useScrollTrigger({ threshold: 200 });

  return (
    <div className=" flex justify-center px-4 py-16 border-t border-border mt-20 ">
      <div className="md:w-[80vw] ">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 ">
          <div className=" basis-1/4 flex flex-col gap-y-3 p-4">
            <div className="flex items-center gap-x-1 mb-3">
              <Diamond className="h-8 w-8 text-primary " />
              <h4 className="italic">Organicly</h4>
            </div>

            <div className="mb-3">
              <div className="flex gap-x-3 items-start mb-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Home className="h-6 w-6 text-secondary-foreground" />
                </div>
                <p className="">123 Suspendis, North American</p>
              </div>
              <div className="flex gap-x-3 items-start mb-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Phone className="h-6 w-6 text-secondary-foreground" />
                </div>
                <p>0987-654-32100</p>
              </div>
              <div className="flex gap-x-3 items-start mb-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Mail className="h-6 w-6 text-secondary-foreground" />
                </div>
                <p>support@domain.com</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-foreground font-semibold mb-3">Follow Us:</p>

              <div className="flex gap-x-4">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300  hover:bg-accent cursor-pointer">
                  <Twitter className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300  hover:bg-accent cursor-pointer">
                  <Facebook className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300  hover:bg-accent cursor-pointer">
                  <Instagram className="h-6 w-6 text-secondary-foreground " />
                </div>
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300  hover:bg-accent cursor-pointer">
                  <Linkedin className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className=" basis-1/4  flex flex-col gap-y-3 divide-dotted divide-y justify-center divide-border   p-4  ">
            <h4>Information</h4>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              Specials
            </p>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              New products
            </p>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              Best sellers
            </p>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              Terms and conditions
            </p>
          </div>

          <div className=" basis-1/4 flex flex-col gap-y-3 divide-dotted divide-y divide-border justify-center   p-4 ">
            <h4 className="">About us</h4>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              Who are we ?
            </p>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              Delivery and return
            </p>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              Size guide
            </p>
            <p className="transition-all duration-300  hover:text-primary cursor-pointer pt-3">
              Legal Mentions
            </p>
          </div>

          <div className=" basis-1/4 flex flex-col gap-y-4 p-4 ">
            <h4>Newsletter</h4>
            <p className="line-clamp-3">
              Sign up for our newsletter to receive special offers and exclusive
              news from us
            </p>
            <div className="flex py-4">
              <Input
                placeholder="Enter your email"
                className="rounded-e-none "
              />
              <Button className="text-secondary-foreground rounded-s-none">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="text-center border-dashed border-t border-border py-4">
          <p>Copyright © {new Date().getFullYear()} - All rights reserved.</p>
        </div>
      </div>

      {trigger && (
        <div className="fixed flex flex-col   gap-y-3 bottom-20 right-10 ">
          <CartPreview>
            <Button
              variant="ghost"
              size="icon"
              className="shadow-xl bg-secondary  hover:bg-primary hover:text-secondary-foreground"
            >
              <ShoppingCart className="h-6 w-6 dark:text-secondary-foreground" />
            </Button>
          </CartPreview>

          <Button
            variant="ghost"
            size="icon"
            className="shadow-xl bg-secondary hover:bg-primary hover:text-secondary-foreground"
          >
            <Heart className="h-6 w-6 dark:text-secondary-foreground" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="shadow-xl bg-secondary hover:bg-primary hover:text-secondary-foreground"
            onClick={() =>
              scroll.scrollToTop({
                duration: 1500,
                //delay: 100,
                smooth: "easeInOutQuart", // true | easeInQuad | easeInOutCubic | easeInOutQuint | easeInOutQuart
                //containerId: "ContainerElementID",
                //offset: 50, // Scrolls to element + 50 pixels down the page
                // ... other options
              })
            }
          >
            <ArrowUp className="h-6 w-6 dark:text-secondary-foreground" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Footer;
