import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckSquare, Minus, Plus, ShoppingCart, StarIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useContextValue } from "../hooks/useContextValue";
import { IItem } from "../types/cart";
import { IProduct } from "../types/product";
import { urlForImage } from "../../../sanity/lib/image";
import calculateDiscount from "@/lib/calculateDiscount";
import { PortableText } from "@portabletext/react";
import RichTextComponents from "./RichTextComponents";

type ProductOptionsProps = {
  children: React.JSX.Element;
  product: IProduct;
};

export default function ProductOptions({
  children,
  product,
}: ProductOptionsProps) {
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-y-2">
              <h4 className="text-primary">${product.discountedPrice}</h4>
              <div className="flex gap-x-1">
                <p className="line-through text-muted-foreground ">
                  ${product.price}
                </p>
                <p className="text-muted-foreground">
                  <p>
                    ({calculateDiscount(product.price, product.discountedPrice)}
                    % off)
                  </p>
                </p>
              </div>
            </div>
            <div className="flex py-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  fill="hsl(24.6 95% 53.1%)"
                  key={i}
                  className="text-accent-foreground h-4 w-4"
                />
              ))}
              <p className="text-primary pl-2"> (3 customer reviews)</p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2   gap-6">
          <div className="">
            <div className="h-[200px] mb-4 relative">
              <Image
                //src={urlForImage(product.productImages[currentIndex])}
                src={product.images[currentIndex]}
                className="object-contain rounded-md  h-[200px] "
                alt="Organic"
                height={200}
                width={600}
              />
              <div className="absolute top-4 left-3 h-12 w-12 text-white bg-accent rounded-full flex items-center justify-center">
                <p>
                  -{calculateDiscount(product.price, product.discountedPrice)}%
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
                    className="object-cover rounded-md group-hover:scale-105  h-[100px] w-[100px]"
                    alt="Organic"
                    height={400}
                    width={400}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className=" flex flex-col gap-y-6">
            <div className="flex gap-x-1">
              <p>Availability:</p>
              <div className="flex items-center gap-x-1">
                <p className="text-primary">In stock!</p>
                <CheckSquare className="text-primary h-3 w-3" />
              </div>
            </div>
            <div className=" line-clamp-4">
              <PortableText
                value={product.description}
                components={RichTextComponents} //instead of adding this styles here manually, can also use tailwind typography plugin
              />
            </div>

            <div className="flex items-center gap-x-2">
              <p>Weight: </p>
              {product.weight.map((weight, i) => (
                <Button
                  variant="default"
                  key={i}
                  className="text-accent-foreground "
                  onClick={() => handleUpdateOptions("weight", weight.grams)}
                >
                  {weight.grams}g
                </Button>
              ))}
            </div>

            <div className="flex flex-col   gap-y-3  ">
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
        </div>

        <DialogFooter>
          {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose> */}

          {/* <Button type="submit">Add to cart</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
