"use client";

import { Button } from "@/components/ui/button";
import {
  MoveDown,
  MoveRight
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

const MainCategories = () => {
  const router = useRouter();
  return (
    <div className=" flex justify-center px-4 py-20  ">
      <div className="md:w-[80vw]   ">
        <div>
          <div className="text-center pb-20">
            <div className="flex justify-center flex-col  lg:flex-row  mb-3">
              <h2 className="mb-4 ">100% organic</h2>{" "}
              <h2 className="mb-4 px-2 text-primary">
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    "vegetables",
                    5000, // wait 1s before replacing "Mice" with "Hamsters"
                    "fruits",
                    5000,
                    "Meat & poultry",
                    5000,
                  ]}
                  wrapper="span"
                  speed={10}
                  style={{ fontSize: "inherit", display: "inline-block" }}
                  repeat={Infinity}
                />
              </h2>
            </div>

            <p className="text-muted-foreground" data-aos="fade-up">
              Free Shipping On All Orders Over $99. #organicly20
            </p>
          </div>

          <div className="grid md:grid-cols-2    xl:grid-cols-3 justify-between gap-5     ">
            {[
              {
                cat: "Fresh fruits",
                slug: "fruits",
                description:
                  "Enjoy a burst of natural sweetness and goodness in every bite.  ",
                img: "https://img.freepik.com/premium-photo/large-group-fruits-including-one-that-says-fruit_832479-4765.jpg",
              },
              {
                cat: "Vegetables",
                slug: "vegetables",
                description:
                  "Explore our farm-fresh organic vegetables, bursting with flavor and nutrients. ",
                img: "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg",
              },
              {
                cat: "Meat & Poultry",
                slug: "meat-poultry",
                description:
                  "Premium organic meat and poultry, raised with care-superior quality and flavorful.",
                img: "https://img.freepik.com/premium-photo/raw-fresh-meat-with-rosemary_105495-275.jpg",
              },
            ].map(({ cat, slug, description, img }, i) => (
              <div
                onClick={() => router.push(`/category/${slug}`)}
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-card dark:border  dark:border-border-light dark:shadow-md rounded-md   min-h-[200px] min-w-80  p-4 group cursor-pointer flex flex-col items-center gap-y-2 text-center"
              >
                <div className="mb-4">
                  <Image
                    src={img}
                    className="object-cover  group-hover:drop-shadow-md rounded-full h-[300px] w-[300px] transition-transform duration-300 ease-in-out group-hover:scale-105"
                    alt="Organic"
                    height={400}
                    width={400}
                  />
                </div>
                <h4 className="font-semibold  ">{cat}</h4>

                <p className="mb-4 text-muted-foreground">{description}</p>

                <Button
                  variant="ghost"
                  //invisible transition-all duration-300 text-md group-hover:visible
                  // className=" hover:text-white text-primary text-lg "
                  asChild
                >
                  <Link href="/category/all">
                    View products
                    <MoveRight className="ml-3 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <ScrollLink
              to="categories"
              duration={1500}
              smooth="easeInOutQuart"
              offset={-100}
            >
              <Button
                //variant="default"
                size="lg"
                className=" bg-primary text-primary-foreground hover:bg-primary text-md transition-all duration-300 "
              >
                View more
                <MoveDown className="ml-3 h-4 w-4" />
              </Button>
            </ScrollLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
