"use client";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { IProduct } from "../types/product";
import ProductItem from "./ProductItem";

type OurProductsProps = {
  products: IProduct[];
};

const OurProducts = ({ products }: OurProductsProps) => {
  const router = useRouter();
  if (!products) return <p>Loading</p>;
  return (
    <div className=" flex justify-center px-4 py-20 mb-20">
      <div className="md:w-[80vw] ">
        <div className=" pb-12 text-center" data-aos="fade-up">
          <div className="flex justify-center">
            <h2 className="mb-4  text-primary">Our </h2>{" "}
            <h2 className="mb-4 px-3 ">Products</h2>
          </div>

          <p className="text-muted-foreground">
            From fresh produce to premium meats, discover a healthier,
            sustainable way to nourish yourself
          </p>
        </div>

        <div
          className="flex justify-center mb-16  "
          //data-aos="zoom-in"
          data-aos-delay="100"
        >
          <Tabs defaultValue="fruits" className="flex flex-col items-center">
            <TabsList className=" lg:gap-x-8  overflow-x-auto max-w-[95vw] md:max-w-none mb-14  ">
              <TabsTrigger value="fruits">Organic fruits</TabsTrigger>
              <TabsTrigger value="veggies">Vegetables</TabsTrigger>
              <TabsTrigger value="meat">Meat & Poultry</TabsTrigger>
              <TabsTrigger value="milk">Milk & Drinks </TabsTrigger>
              <TabsTrigger value="fish">Fish & Seafood </TabsTrigger>
              <TabsTrigger value="all">All </TabsTrigger>
            </TabsList>

            <TabsContent value="fruits">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8     ">
                {products
                  .filter(
                    (prod) => prod.category?.parent?.slug?.current === "fruits"
                  )
                  .slice(0, 8)
                  .map((product, i) => (
                    <ProductItem key={i} product={product} i={i} />
                  ))}
              </div>
              <div className="pt-16 text-center ">
                <Button
                  className="text-white bg-primary hover:bg-accent"
                  size="lg"
                  onClick={() => router.push("/category/fruits")}
                >
                  View more products
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="veggies">
              <div className="grid grid-cols-4 gap-x-5 gap-y-8     ">
                {products
                  .filter(
                    (prod) =>
                      prod.category?.parent?.slug?.current === "vegetables"
                  )
                  .slice(0, 8)
                  .map((product, i) => (
                    <ProductItem key={i} product={product} i={i} />
                  ))}
              </div>
              <div className="pt-16 text-center ">
                <Button
                  className="text-white bg-primary hover:bg-accent"
                  size="lg"
                  onClick={() => router.push("/category/vegetables")}
                >
                  View more products
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="meat">
              <div className="grid grid-cols-4 gap-x-5 gap-y-8     ">
                {products
                  .filter(
                    (prod) =>
                      prod.category?.parent?.slug?.current === "meat-poultry"
                  )
                  .slice(0, 8)
                  .map((product, i) => (
                    <ProductItem key={i} product={product} i={i} />
                  ))}
              </div>
              <div className="pt-16 text-center ">
                <Button
                  className="text-white bg-primary hover:bg-accent"
                  size="lg"
                  onClick={() => router.push("/category/meat-poultry")}
                >
                  View more products
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="milk">
              <div className="grid grid-cols-4 gap-x-5 gap-y-8     ">
                {products
                  .filter(
                    (prod) =>
                      prod.category?.parent?.slug?.current === "milk-drinks"
                  )
                  .slice(0, 8)
                  .map((product, i) => (
                    <ProductItem key={i} product={product} i={i} />
                  ))}
              </div>

              <div className="pt-16 text-center ">
                <Button
                  className="text-white bg-primary hover:bg-accent"
                  size="lg"
                  onClick={() => router.push("/category/milk-drinks")}
                >
                  View more products
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="fish">
              <div className="grid grid-cols-4 gap-x-5 gap-y-8     ">
                {products.slice(0, 8).map((product, i) => (
                  <ProductItem key={i} product={product} i={i} />
                ))}
              </div>

              <div className="pt-16 text-center ">
                <Button
                  className="text-white bg-primary hover:bg-accent"
                  size="lg"
                  onClick={() => router.push("/category/all")}
                >
                  View more products
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="all">
              <div className="grid grid-cols-4 gap-x-5 gap-y-8     ">
                {products.slice(0, 8).map((product, i) => (
                  <ProductItem key={i} product={product} i={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
