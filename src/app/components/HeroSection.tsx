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
import { useTheme } from "next-themes";

const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(to bottom, hsla(20, 14.3%, 4.1%, 1) 10%, hsla(20, 14.3%, 4.1%, 0.9) 50%, hsla(20, 14.3%, 4.1%, 0.6)), url('/hero.webp')"
            : "linear-gradient(to bottom, hsla(150, 80%, 47%, 0.8), hsla(150, 80%, 47%, 0.1), hsla(150, 80%, 47%, 0.2), url('/hero.webp')",
      }}
      className="bg-primary  bg-fixed bg-top bg-no-repeat bg-cover  h-[90vh] flex flex-col justify-center"
    >
      <div className="md:max-w-[30vw]   flex flex-col gap-y-8 items-start  ml-6 lg:ml-40 xl:ml-60 bg-primary/55 ">
        <h2 className="text-secondary-foreground line-clamp-3">
          Shop fresh fruits and vegetables
        </h2>

        <p className="text-secondary-foreground">
          Organic milk-cheese is the best nutritious cheese that you will love
          and carve for it. Get the best of it now!
        </p>

        <Button
          // variant="default"
          className="shadow-md bg-accent text-accent-foreground  text-md hover:bg-accent/90 transition-all duration-300"
          size="lg"
        >
          <ShoppingCart className="mr-3 h-6 w-6" /> Shop now
        </Button>
      </div>

      {/* <div className="py-6   ">
        <Image
          src="https://cdn.pixabay.com/photo/2013/07/13/01/22/vegetables-155616_1280.png"
          className="object-contain object-top rounded-md  h-[600px] w-[100%]"
          alt="Organic"
          height={300}
          width={600}
        />
      </div> */}
    </div>
  );
};

export default HeroSection;
