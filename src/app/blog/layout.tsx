import React from "react";
import Banner from "../components/Banner";
import { Calendar, Diamond, Search } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { groq } from "next-sanity";
import { Category, Post } from "../types/post";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import Sidebar from "./components/Sidebar";

type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = async ({ children }: BlogLayoutProps) => {
  return <div className=" ">{children}</div>;
};

export default BlogLayout;
