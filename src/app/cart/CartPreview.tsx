import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { IItem } from "../types/cart";
import { useRouter } from "next/navigation";
import { useContextValue } from "../hooks/useContextValue";
import Image from "next/image";
import calculateDiscount from "@/lib/calculateDiscount";
import { Minus, Plus, RotateCw, Trash, Trash2, TrashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { urlForImage } from "../../../sanity/lib/image";

type CartPreviewProps = {
  children: React.JSX.Element;
};

const CartPreview = ({ children }: CartPreviewProps) => {
  const [isPending, startTransition] = useTransition();

  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const { toast } = useToast();

  const [cartList, setCartList] = useState<IItem[]>([]);

  const router = useRouter();

  const {
    state: { cart },
    dispatch,
  } = useContextValue();

  //cal sub total
  const subTotal = useMemo(() => {
    const total = cartList.reduce(
      (acc, item) => acc + item.product.discountedPrice * item.units,
      0
    );
    setTotal(total); //without coupon discount, total = subtotal
    return total;
  }, [cartList]);

  const handleUpdateQty = (item: IItem, count: number) => {
    //if decrement and current qty is 1, exit
    if (count < 1 && item.units === 1) return;

    dispatch({ type: "UPDATE_QTY", payload: { id: item.id, count } });
  };

  const handleRemoveFromCart = (id: string) => {
    //dispatch to cart
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  //apply coupon discount
  const handleSubmit = async () => {
    //get coupon discount
    try {
      //dummy promise->get coupon//
      const coupon: number = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (true) {
            return resolve(5);
          }
          reject("Coupon invalid");
        }, 1000);
      });
      //coupon.discount
      setDiscount(coupon);
      setTotal(subTotal - coupon);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        // description: "There was a problem with your request.",
        //  action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      /// toast.error(error.message as string);
    }
  };

  //on checkout update order state
  const handleCheckout = () => {
    //update order state
    dispatch({
      type: "UPDATE_ORDER",
      payload: { items: cart, subTotal, total, discount },
    });

    //then redirect to check out
    router.push("/checkout");
  };

  useEffect(() => {
    setCartList(cart);
  }, [cart]);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          className="border-none "
          side="right" //["top", "right", "bottom", "left"] as const
        >
          <SheetHeader>
            {/* <SheetClose asChild> //comes with an inbuilt close btn
              <Button type="submit">close</Button>
            </SheetClose> */}
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              {!cart.length && (
                <p className="my-3 text-muted-foreground">Your cart is empty</p>
              )}
            </SheetDescription>
          </SheetHeader>

          <div>
            {cartList.map((item) => (
              <div key={item.id} className="mb-2">
                <div className="flex gap-x-3 mb-3">
                  <Image
                    // src={urlForImage(item.product.productImages[0])}
                    src={item.product.images[0]}
                    alt={item.product.title}
                    width={100}
                    height={150}
                    style={{ objectFit: "cover" }}
                  />

                  <div className="grow ">
                    <p className="font-medium">{item.product.title}</p>

                    <p className="  text-primary-foreground">
                      $ {item.product.discountedPrice}
                    </p>
                    <div className="flex gap-x-2">
                      <p className="line-through">$ {item.product.price}</p>

                      <p className="  text-muted-foreground">
                        (
                        {calculateDiscount(
                          item.product.price,
                          item.product.discountedPrice
                        )}
                        % off)
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div className="flex">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-none rounded-s-3xl hover:bg-white "
                          onClick={() => handleUpdateQty(item, -1)}
                        >
                          <Minus className="h-4 w-4 " />
                        </Button>
                        <Input
                          className="max-w-10 rounded-none   "
                          value={item.units}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-none rounded-e-3xl hover:bg-white  "
                          onClick={() => handleUpdateQty(item, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <Trash2 className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>

          <SheetFooter className="absolute bottom-0">
            <div className="p-4 ">
              <div className="flex gap-x-4 mb-6">
                <Input placeholder="Coupon code" className="col-span-3" />
                <Button
                  className="text-white"
                  onClick={() => startTransition(handleSubmit)}
                >
                  Apply coupon
                  {isPending && (
                    <RotateCw className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </div>

              <div className="mb-4 flex flex-col gap-y-4">
                <p className="">Subtotal: ${subTotal}</p>

                <p className="">Discount: ${discount}</p>

                <Separator />
                <p className="font-bold">Total: ${total}</p>
              </div>

              <Button
                className="w-full text-white"
                onClick={() => handleCheckout()}
              >
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartPreview;
