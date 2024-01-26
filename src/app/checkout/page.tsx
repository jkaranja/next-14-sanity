"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { useContextValue } from "@/app/hooks/useContextValue";
import { IItem } from "@/app/types/cart";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { urlForImage } from "../../../sanity/lib/image";
import Banner from "../components/Banner";
import { Diamond } from "lucide-react";
import Link from "next/link";

const Checkout = () => {
  // const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    state: { cart, order },
    dispatch,
  } = useContextValue();

  const [selectedValue, setSelectedValue] = React.useState("economy");

  const [charges, setCharges] = React.useState({
    economy: 500,
    standard: 700,
    express: 900,
  });

  const [itemList, setItemList] = useState<IItem[]>([]);

  //  type CouponForm = {
  //    coupon: string;
  //  };

  //  const {
  //    register,
  //    handleSubmit,
  //    formState: { errors, isValid, submitCount },
  //    reset: resetForm,
  //    control,
  //    watch,
  //    getValues,
  //    setValue,
  //  } = useForm<CouponForm>();

  //dispatch shipping amount on shipping mtd change
  useEffect(() => {
    dispatch({
      type: "UPDATE_ORDER",
      payload: {
        shipping: charges[selectedValue as keyof typeof charges],
        total:
          order.subTotal -
          (order.discount || 0) +
          charges[selectedValue as keyof typeof charges],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useEffect(() => {
    setItemList(order.items);
  }, [order]);

  //prevent loading any content if navigating to checkout if no order in state
  //This will cause error since order is null hence order.items = typeError if no optional chaining used
  //shouldn't accessing this page anyway if no orders
  if (!order?.items)
    return (
      <div>
        <Banner>
          <h1 className="text-4xl font-bold">Checkout</h1>

          <div className="flex gap-x-3 py-2 items-center">
            <p>
              <Link href="/">Home</Link>{" "}
            </p>
            <Diamond fill="white" className="h-2 w-2" />
            <p>Checkout</p>
          </div>
        </Banner>
        <div className="flex justify-center text-muted-foreground py-10">
          <p>Order not found</p>
        </div>
      </div>
    );

  return (
    <div className="">
      <Banner>
        <h1 className="text-4xl font-bold">Checkout</h1>

        <div className="flex gap-x-3 py-2 items-center">
          <p>
            <Link href="/">Home</Link>{" "}
          </p>
          <Diamond fill="white" className="h-2 w-2" />
          <p>Checkout</p>
        </div>
      </Banner>

      <div className=" flex justify-center px-4  ">
        <div className="md:w-[80vw] flex gap-x-10">
          <div className="p-6 basis-3/6">
            <form action="">
              <div className="mb-8">
                <h4 className="mb-3">Contact</h4>
                <div className="flex justify-between gap-x-4">
                  <div className="grow">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" required />
                  </div>
                  <div className="grow">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" placeholder="Phone number" required />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="mb-3">Delivery</h4>

                <div className="flex justify-between gap-x-4 mb-3">
                  <div className="grow">
                    <Label htmlFor="fname">First name</Label>
                    <Input id="fname" placeholder="First name" required />
                  </div>
                  <div className="grow">
                    <Label htmlFor="lname">Last name</Label>
                    <Input id="lname" placeholder="Last name" required />
                  </div>
                </div>
                <div className="mb-3 ">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Shipping address" required />
                </div>

                <div className="flex justify-between gap-x-4 mb-3">
                  <div className="grow">
                    <Label htmlFor="">Country/region</Label>{" "}
                    <Select>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">US</SelectItem>
                        <SelectItem value="dark">England</SelectItem>
                        <SelectItem value="system">Spain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grow">
                    <Label>City</Label>
                    <Select>
                      <SelectTrigger className=" ">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Michigan</SelectItem>
                        <SelectItem value="dark">Texas</SelectItem>
                        <SelectItem value="system">New york</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-3 ">
                  <Label htmlFor="notes">Order notes (optional)</Label>
                  <Textarea
                    placeholder="Notes about your order. eg. Special notes for delivery"
                    id="notes"
                  />
                </div>
              </div>

              <div className="mb-3">
                <h4 className="mb-3">Shipping method</h4>

                <RadioGroup defaultValue="option-one">
                  {Object.entries(charges).map(([mtd, amount], index) => (
                    <div
                      onClick={() => setSelectedValue(mtd)}
                      key={index}
                      className={clsx(
                        "flex items-center justify-between space-x-2 p-3 rounded-md cursor-pointer",
                        {
                          "bg-muted":
                            charges[selectedValue as keyof typeof charges] ===
                            amount,
                        }
                      )}
                    >
                      <div className="grow flex items-center gap-x-3 ">
                        <RadioGroupItem
                          value={mtd}
                          checked={
                            charges[selectedValue as keyof typeof charges] ===
                            amount
                          }
                        />
                        <div>
                          <Label
                            htmlFor="option-one"
                            className="capitalize text-base"
                          >
                            {mtd}
                          </Label>
                          <p>
                            {mtd === "standard" && "5 to 8 business days"}
                            {mtd === "economy" && "3 to 4 business days"}
                            {mtd === "express" &&
                              "Same day delivery(within 24 hours)"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold">${amount}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="mb-3">
                <h4 className="mb-3">Payment</h4>
                <p className="mb-3">
                  All transactions are secure and encrypted.
                </p>

                <div className="bg-muted border rounded-md">
                  <div className="p-2 bg-black rounded-t-sm">
                    <p className="  text-white">Credit card</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 ">
                      <Input placeholder="Card number" required />
                    </div>
                    <div className="flex justify-between gap-x-4 mb-3">
                      <div className="grow">
                        <Input
                          placeholder="Expiration date(MM / YY)"
                          required
                        />
                      </div>
                      <div className="grow">
                        <Input placeholder="Security code" required />
                      </div>
                    </div>
                    <div className="mb-3 ">
                      <Input placeholder="Name on card" required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox className="text-white " />
                      <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Use shipping address as billing address
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="py-3 text-right">
                  <Button
                    className="text-white"
                    size="lg"
                    onClick={(e) => e.preventDefault()}
                  >
                    Pay now
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="py-6 px-10 grow bg-muted    min-h-[70vh]   ">
            <div className="  mb-6">
              <h4 className="">Your Order</h4>
            </div>
            <div>
              {itemList.map((item) => (
                <div key={item.id} className="mb-2">
                  <div className="flex gap-x-1 mb-1">
                    <Image
                      src={urlForImage(item.product.productImages[0])}
                      //src={item.images[0].url}
                      alt={item.product.title}
                      width={100}
                      height={150}
                      style={{ objectFit: "cover" }}
                    />

                    <div className="grow px-2">
                      <p className="font-medium mb-2">{item.product.title}</p>

                      <p className="text-muted-foreground">Qty {item.units}</p>

                      <p className="text-right">
                        $ {item.units * item.product.discountedPrice}
                      </p>
                    </div>
                  </div>

                  <Separator />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-y-3 py-4 w-full">
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>{`$${order.shipping}`}</p>
              </div>

              <div className="flex justify-between">
                <p className="">Subtotal: </p>
                <p>{`$${order.subTotal}`}</p>
              </div>
              <div className="flex justify-between">
                <p className="">Discount: </p>
                <p>{`$${order.discount}`}</p>
              </div>

              <Separator />
              <div className="flex justify-between">
                <p className="font-bold">Total: </p>
                <p className="font-bold">{`$${order.total}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
