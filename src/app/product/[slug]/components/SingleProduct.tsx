"use client";

import { useMemo, useState, useTransition } from "react";

import { IProduct } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckSquare,
  Diamond,
  Minus,
  Plus,
  ShoppingCart,
  StarIcon,
  Trash,
} from "lucide-react";
import Image from "next/image";

import Banner from "@/app/components/Banner";
import RichTextComponents from "@/app/components/RichTextComponents";
import { useContextValue } from "@/app/hooks/useContextValue";
import { IItem } from "@/app/types/cart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import calculateDiscount from "@/lib/calculateDiscount";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

type SingleProductProps = {
  product: IProduct;
};

const SingleProduct = ({ product }: SingleProductProps) => {
  const [isPending, startTransition] = useTransition();

  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    state: { cart },
    dispatch,
  } = useContextValue();

  const [options, setOptions] = useState({
    units: 1,
    weight: product.weight[0],
  });

  const handleUpdateOptions = (
    key: keyof typeof options,
    value: string | number
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    //dispatch to cart
    dispatch({
      type: "ADD_TO_CART",
      payload: { id: product.id, product, ...options },
    });
    //open cart
  };

  const handleRemoveFromCart = () => {
    //dispatch to cart
    dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
  };

  //if already in cart
  const isInCart = useMemo(() => {
    return cart.map((item: IItem) => item.id).includes(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div className="">
      <Banner className="px-4 text-center">
        <h3 className="uppercase">{product.title}</h3>

        <div className="flex gap-x-3 py-2 items-center">
          <p>Home </p>
          <Diamond fill="white" className="h-2 w-2" />
          <p>
            <Link href="/">Fruits</Link>
          </p>
          <Diamond fill="white" className="h-2 w-2" />
          <p>{product.title}</p>
        </div>
      </Banner>

      <div className=" flex justify-center px-4  py-20  ">
        <div className="md:w-[80vw] ">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="">
              <div className="h-[300px] mb-4 relative">
                <Image
                  //src={urlForImage(product.productImages[currentIndex])}
                  src={product.images[currentIndex]}
                  className="object-contain rounded-md  h-[300px] w-[100%]"
                  alt="Organic"
                  height={300}
                  width={600}
                />
                <div className="absolute top-4 left-3 h-12 w-12 text-white bg-accent rounded-full flex items-center justify-center">
                  <p>
                    -{calculateDiscount(product.price, product.discountedPrice)}
                    %
                  </p>
                </div>
              </div>

              <div className="flex gap-x-3 basis-5/12 ">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="cursor-pointer group "
                    onClick={() => setCurrentIndex(i)}
                  >
                    <Image
                      src={img}
                      className="object-contain rounded-md    h-[100px] w-[100px]"
                      alt="Organic"
                      height={400}
                      width={400}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex flex-col gap-y-6">
              <h3>{product.title}</h3>

              <div>
                <h3 className="text-primary">${product.discountedPrice}</h3>
                <div className="flex gap-x-1">
                  <p className="line-through text-muted-foreground ">
                    ${product.price}
                  </p>
                  <p className="text-muted-foreground">
                    ({calculateDiscount(product.price, product.discountedPrice)}
                    % off)
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    fill="hsl(24.6 95% 53.1%)"
                    strokeWidth={0}
                    key={i}
                    className="text-accent-foreground h-4 w-4"
                  />
                ))}
                <p className="text-primary pl-2"> (3 reviews)</p>
              </div>

              <div className="flex items-center gap-x-2">
                <p>Weight: </p>
                {product.weight.map((weight, i) => (
                  <Button
                    size="sm"
                    variant="default"
                    key={i}
                    className="text-accent-foreground "
                    onClick={() => handleUpdateOptions("weight", weight.grams)}
                  >
                    {weight.grams}g
                  </Button>
                ))}
              </div>

              <div className="flex gap-x-1">
                <p>Availability:</p>
                <div className="flex items-center gap-x-1">
                  <p className="text-primary">In stock!</p>
                  <CheckSquare className="text-primary h-3 w-3" />
                </div>
              </div>

              <div>
                <p>Category: Fruits | Bananas</p>
              </div>

              <div>
                <p>Vendor: Aurelia</p>
              </div>

              <div className="flex justify-between bg-muted  font-medium p-3 border-t border-border-light">
                <h5 className="text-muted-foreground">Total</h5>
                <h5 className="text-muted-foreground">
                  ${options.units * product.discountedPrice}
                </h5>
              </div>

              <div className="flex   gap-x-3  ">
                <div className="flex">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none rounded-s-3xl hover:bg-white h-12"
                    disabled={isInCart}
                    onClick={() =>
                      handleUpdateOptions(
                        "units",
                        options.units !== 1 ? options.units - 1 : options.units
                      )
                    }
                  >
                    <Minus className="h-4 w-4 " />
                  </Button>
                  <Input
                    disabled={isInCart}
                    type="number"
                    value={options.units}
                    className="max-w-20 rounded-none h-12  "
                    onChange={(e) =>
                      handleUpdateOptions(
                        "units",
                        parseInt(e.target.value) === 0
                          ? options.units
                          : parseInt(e.target.value)
                      )
                    }
                  />
                  <Button
                    disabled={isInCart}
                    variant="outline"
                    size="icon"
                    className="rounded-none rounded-e-3xl hover:bg-white h-12 "
                    onClick={() =>
                      handleUpdateOptions("units", options.units + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grow ">
                  {isInCart ? (
                    <Button
                      variant="default"
                      className="w-full text-white bg-red-500 h-12 rounded-3xl"
                      onClick={handleRemoveFromCart}
                    >
                      <Trash className="mr-3 h-6 w-6" /> Remove from cart
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full text-white h-12 rounded-3xl"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-3 h-6 w-6" /> Add to cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-5 ">
              <h4 className="">Related products</h4>
              {[
                "https://cdn.pixabay.com/photo/2021/04/14/17/45/avocado-6179050_640.jpg",
                "https://cdn.pixabay.com/photo/2015/09/09/20/17/avocado-933060_640.jpg",
                "https://cdn.pixabay.com/photo/2015/08/07/03/38/avocado-878958_1280.jpg",
                "https://cdn.pixabay.com/photo/2017/03/04/12/10/avocado-2115922_640.jpg",
              ].map((img, i) => (
                <div key={i} className="flex gap-x-5  ">
                  <div>
                    <Image
                      src={img}
                      className="object-cover rounded-md    h-[90px] w-[90px]"
                      alt="Organic"
                      height={400}
                      width={400}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Organic Hass Avocado</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          fill="hsl(24.6 95% 53.1%)"
                          strokeWidth={0}
                          key={i}
                          className="text-accent-foreground h-4 w-4"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-x-3">
                      <p className="text-primary">$20</p>
                      <div className="flex gap-x-1">
                        <p className="line-through text-muted-foreground ">
                          $35
                        </p>
                        <p className="text-muted-foreground">(10% off)</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-20">
            <Tabs defaultValue="description">
              <TabsList className="w-full lg:gap-x-8  overflow-x-auto max-w-[95vw] md:max-w-none mb-14  ">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="information">
                  Additional information
                </TabsTrigger>
                <TabsTrigger value="reviews">Customer reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <PortableText
                  value={product.description}
                  components={RichTextComponents} //instead of adding this styles here manually, can also use tailwind typography plugin
                />
              </TabsContent>
              <TabsContent value="information">
                <h3>Returns Policy </h3>
                <p>
                  You may return most new, unopened items within 30 days of
                  delivery for a full refund. We&apos;ll also pay the return
                  shipping costs if the return is a result of our error (you
                  received an incorrect or defective item, etc.). You should
                  expect to receive your refund within four weeks of giving your
                  package to the return shipper, however, in many cases you will
                  receive a refund more quickly.
                </p>
                <h3>Shipping</h3>
                <p>
                  We can ship to virtually any address in the world. Note that
                  there are restrictions on some products, and some products
                  cannot be shipped to international destinations. When you
                  place an order, we will estimate shipping and delivery dates
                  for you based on the availability of your items and the
                  shipping options you choose. Depending on the shipping
                  provider you choose, shipping date estimates may appear on the
                  shipping quotes page.
                </p>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="flex justify-between gap-x-5 mb-10 border-b py-3">
                  <div>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>

                  <div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="text-accent-foreground h-4 w-4"
                        />
                      ))}
                    </div>
                    <p className="font-bold">AMANDA </p>
                    <p className="text-muted-foreground text-sm">
                      November 8, 2019
                    </p>
                    <p className="py-2">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&apos;s standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-4 border-t">
                  <p className="mb-4 font-bold">Write A Review</p>
                  <div className="pb-2">
                    <Label>Your rating</Label>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="text-muted-foreground h-4 w-4"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid w-full gap-1.5 pb-2">
                    <Label htmlFor="message">You review</Label>
                    <Textarea
                      // placeholder="Type your message here."
                      id="message"
                    />
                  </div>

                  <div className="flex justify-between pb-2 gap-6">
                    <div className="grow   ">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grow  ">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="john.smith@eample.com" />
                    </div>
                  </div>

                  <div className="text-right py-4">
                    <Button className="text-white">Submit</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
