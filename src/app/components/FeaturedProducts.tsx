"use client";


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
