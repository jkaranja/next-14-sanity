"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { useTheme } from "next-themes";

const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(to bottom, hsla(20, 14.3%, 4.1%, 1) 10%, hsla(20, 14.3%, 4.1%, 0.9) 50%, hsla(20, 14.3%, 4.1%, 0.6)), url('/hero.webp')"
            : "linear-gradient(to bottom, hsla(150, 80%, 47%, 0.6) 5%, hsla(150, 80%, 47%, 0.2), hsla(150, 80%, 47%, 0) 20%), url('/hero.webp')",
      }}
      className="bg-primary  bg-fixed bg-top bg-no-repeat bg-cover  min-h-[90vh] pt-36  pb-20 flex flex-col md:flex-row  justify-center md:justify-around items-center  px-4 "
    >
      <div className="md:basis-5/6 lg:basis-3/4    xl:basis-7/12  flex flex-col gap-y-8 items-start  bg-accent/55 rounded-sm p-10">
        <h2 className="text-secondary">
          Shop Fresh Fruits, Vegetables, and More
        </h2>

        <p className="text-secondary">
          Explore our selection of premium organic food items, carefully sourced
          and thoughtfully chosen to nourish your body and delight your taste
          buds.
        </p>

        <ScrollLink
          to="categories"
          duration={1500}
          smooth="easeInOutQuart"
          offset={-100}
        >
          <Button variant="default" className="shadow-md   text-md  " size="lg">
            <ShoppingCart className="mr-3 h-6 w-6" /> Shop now
          </Button>
        </ScrollLink>
      </div>

      <div className="p-6   basis-3/6  hidden lg:block ">
        {/* <Image
          src="https://cdn.pixabay.com/photo/2013/07/13/01/22/vegetables-155616_1280.png"
          className="object-contain object-top rounded-md  h-[600px] w-[100%]"
          alt="Organic"
          height={300}
          width={600}
        /> */}
      </div>
    </div>
  );
};

export default HeroSection;
