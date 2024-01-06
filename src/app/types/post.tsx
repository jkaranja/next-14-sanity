import { Image } from "sanity";
import { Base } from "./base";

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

 

interface Category extends Base {
  description: string;
  title: string;
}

interface MainImage {
  _type: "image";
  alt: string
  asset: Reference;
}

export interface Post extends Base {
  title: string;
  slug: Slug;
  categories: Array<Category>;
  body: Block[];
  publishedAt: string;
  mainImage: Image;
  author: Author
}

interface Author extends Base {
  bio: Block[];
  name: string;
  slug: Slug;
  image: Image;
}

interface Reference {
  _ref: string;
  _type: "reference";
}
