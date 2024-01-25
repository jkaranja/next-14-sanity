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
  HeartHandshake,
  Home,
  Instagram,
  LeafyGreen,
  Linkedin,
  Mail,
  MessageSquare,
  MoveDown,
  MoveRight,
  Phone,
  ShoppingCart,
  StarHalf,
  StarIcon,
  Tractor,
  Truck,
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
const WhyUs = () => {
  return (
    <div className="flex justify-center  bg-primary py-20  ">
      <div className="md:w-[80vw] flex flex-col items-center text-secondary-foreground">
        <div className="pb-20 text-center">
          <h2 className="font-semibold  mb">Why choose us</h2>
        </div>

        <div className="  lg:w-[70%] md:w-[80%]">
          <div className="grid md:grid-cols-2 gap-4 text-center  ">
            {[
              {
                content: [
                  {
                    icon: <LeafyGreen className="mr-3 h-10 w-10 " />,
                    heading: "Organic Certificated",
                    content:
                      "Our products are organically certified products. Every item is meticulously verified, guaranteeing you pure, sustainable, and genuinely organic choices.",
                  },
                  {
                    icon: <Tractor className="mr-3 h-10 w-10 " />,
                    heading: "Top Rank Farms",
                    content:
                      "Indulge in excellence with Top Rank Farms. Our organic products are cultivated with passion, ensuring the highest quality and purity.",
                  },
                ],
              },
              {
                content: [
                  {
                    icon: <Truck className="mr-3 h-10 w-10 " />,
                    heading: "Fast Delivery",
                    content:
                      "Your organic essentials reach you promptly, ensuring freshness and convenience. Shop hassle-free today!                                           Experience swift satisfaction with our express delivery.",
                  },
                  {
                    icon: <HeartHandshake className="mr-3 h-10 w-10 " />,
                    heading: "Trusted Products",
                    content:
                      "Choose us for premium organic goods. Our commitment to quality ensures you get trustworthy, sustainable, and delightful products every time.",
                  },
                ],
              },
            ].map((item, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                {item.content.map(({ icon, heading, content }, i) => (
                  <div
                    className={clsx(
                      "p-4     gap-y-3 w-[100%]  flex flex-col items-center "
                      // index === 0 &&
                      //   i === 0 &&
                      //   "border-dashed border-b border-r  ",
                      // index === 1 &&
                      //   i === 1 &&
                      //   "border-dashed border-t border-l "
                    )}
                    key={i}
                  >
                    {icon}
                    <h4>{heading}</h4>
                    <p>{content}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
