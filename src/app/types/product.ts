import { Image } from "sanity";
import { Block, Slug } from "./post";

export interface IProduct {
  id: string;
  slug: Slug;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: Block[];
  tags: string[];
  productImages: Image[];
  images: string[];
  price: number;
  discountedPrice: number;
  rating: number;
  quantity: number; //initial units
  sold: number; //units sold
  weight: { extra: number; grams: string }[];
  sizes: string[];
  colors: string[];
  brand: string;
  category: { name: string; slug: Slug; parent: { name: string; slug: Slug } };
  //reviews: { id: string; review: string; rating: number; user: IUser }[];
  qty?: number; //number of units to buy
}
