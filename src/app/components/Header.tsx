"use client";

import * as React from "react";
import Link from "next/link";
import { Element, Link as ScrollLink, Button as ScrollBtn } from "react-scroll";
import { cn } from "@/lib/utils";
import AOS from "aos";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import {
  AlignJustify,
  Heart,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import CartPreview from "../cart/CartPreview";
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
import { DRINKS, FRUITS, MEAT, VEGETABLES } from "../constants/menu";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Header() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollTrigger, setScrollTrigger] = React.useState(false);

  const router = useRouter();

  const pathname = usePathname();

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    scrollPosition > 100 ? setScrollTrigger(true) : setScrollTrigger(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //animation on scroll
  React.useEffect(() => {
    AOS.init({
      // Global settings:
      disable: "mobile", //disable AOS on mobile
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 100, //(in px)//default 120// Offset from the original trigger point//Change offset to trigger animations sooner or later (px)
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 800, //default:400// values from 0 to 3000, with step 50ms
      easing: "ease-in-sine", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
  }, []);

  return (
    <div
      className={clsx(
        " w-full  dark:bg-background  fixed z-10 ",
        scrollTrigger && "bg-primary"
      )}
    >
      <div
        className={clsx(
          " justify-center absolute z-20 w-full top-0 flex items-center transition-all duration-500 ease-in-out pb-4 pt-2 gap-x-3 bg-primary dark:bg-background",
          !isVisible && "hidden"
        )}
      >
        <Input
          placeholder="Search product "
          className="h-12 px-4 bg-primary-dark   dark:bg-accent  border-none placeholder:text-secondary rounded-3xl max-w-[60vw]"
        />
        <Button variant="ghost" size="icon" onClick={handleToggle}>
          <X className=" h-6 w-6 text-secondary transition-all duration-300 ease-in-out hover:rotate-180" />
        </Button>
      </div>

      <div className="flex  justify-evenly py-3">
        <NavigationMenu className="lg:hidden">
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <MobileMenu>
                <Button variant="ghost">
                  <AlignJustify className="h-6 w-6 text-secondary" />
                </Button>
              </MobileMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-secondary text-lg">
                Organic fruits
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-6">
                <h5 className="mb-4">Top Categories</h5>
                <ul className="grid w-[400px] gap-3  md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {/* {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))} */}

                  {FRUITS.map(({ img, cat, slug }, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundImage: `url(${img})`,
                      }}
                      className="group  bg-contain bg-no-repeat    h-[150px] flex  cursor-pointer "
                      onClick={() => router.push(`/category/fruits/${slug}`)}
                    >
                      <div className="rounded-md transition-all duration-300  group-hover:bg-black/50 flex justify-center items-center grow ">
                        <div className=" p-3 invisible group-hover:visible transition-all duration-300 ">
                          <h6 className="text-secondary text-center">{cat}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-secondary">
                Vegetables
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-6">
                <h5 className="mb-4">Top Categories</h5>
                <ul className="grid w-[400px] gap-3  md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {VEGETABLES.map(({ img, cat, slug }, i) => (
                    <div
                      onClick={() =>
                        router.push(`/category/vegetables/${slug}`)
                      }
                      key={i}
                      style={{
                        backgroundImage: `url(${img})`,
                      }}
                      className="group  bg-center bg-no-repeat bg-cover  h-[150px] flex  cursor-pointer "
                    >
                      <div className="rounded-md transition-all duration-300  group-hover:bg-black/50 flex justify-center items-center grow ">
                        <div className=" p-3 invisible group-hover:visible transition-all duration-300 ">
                          <h6 className="text-secondary text-center">{cat}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-secondary text-md">
                Meat & Poultry
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-6">
                <h5 className="mb-4">Top Categories</h5>
                <ul className="grid w-[400px] gap-3  md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {MEAT.map(({ img, cat, slug }, i) => (
                    <div
                      onClick={() =>
                        router.push(`/category/meat-poultry/${slug}`)
                      }
                      key={i}
                      style={{
                        backgroundImage: `url(${img})`,
                      }}
                      className="group  bg-center bg-no-repeat bg-cover  h-[150px] flex  cursor-pointer "
                    >
                      <div className="rounded-md transition-all duration-300  group-hover:bg-black/50 flex justify-center items-center grow ">
                        <div className=" p-3 invisible group-hover:visible transition-all duration-300 ">
                          <h6 className="text-secondary text-center">{cat}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-secondary text-md ">
                Milk & Drinks
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-6">
                <h5 className="mb-4">Top Categories</h5>
                <ul className="grid w-[400px] gap-3  md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {DRINKS.map(({ img, cat, slug }, i) => (
                    <div
                      onClick={() =>
                        router.push(`/category/milk-drinks/${slug}`)
                      }
                      key={i}
                      style={{
                        backgroundImage: `url(${img})`,
                      }}
                      className="group  bg-center bg-no-repeat bg-cover  h-[150px] flex  cursor-pointer "
                    >
                      <div className="rounded-md transition-all duration-300  group-hover:bg-black/50 flex justify-center items-center grow ">
                        <div className=" p-3 invisible group-hover:visible transition-all duration-300 ">
                          <h6 className="text-secondary text-center">{cat}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className="text-secondary hover:bg-accent/50 px-3 py-2 rounded-md">
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <Link href="/">
                <h4 className="text-secondary italic -rotate-2 drop-shadow-2xl font-serif   ">
                  Organicly
                </h4>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <Button
                variant="ghost"
                className="hover:bg-accent/50"
                size="icon"
                onClick={handleToggle}
              >
                <Search className=" h-6 w-6 text-secondary" />
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem className="">
              <CartPreview>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/50"
                >
                  <ShoppingCart className=" h-6 w-6 text-secondary" />
                </Button>
              </CartPreview>
            </NavigationMenuItem>

            <NavigationMenuItem className="">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50"
              >
                <Heart className="h-6 w-6 text-secondary" />
              </Button>
            </NavigationMenuItem>

            <NavigationMenuItem className="">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50"
              >
                <User className=" h-6 w-6 text-secondary" />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          className="border-none "
          side="left" //["top", "right", "bottom", "left"] as const
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="flex justify-start">
              <Link href="/">
                <h4 className="text-primary italic  drop-shadow-2xl font-serif   ">
                  Organicly
                </h4>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <Accordion type="single" collapsible>
            {[
              { parent: "Organic fruits", items: FRUITS },
              { parent: "Vegetables", items: VEGETABLES },
              { parent: "Meat & Poultry", items: MEAT },
              { parent: "Milk & Drinks", items: DRINKS },
              {
                parent: "Blog",
                items: [{ cat: "Our blog", slug: "blog" }],
              },
            ].map(({ parent, items }, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border "
              >
                <AccordionTrigger className="text-base hover:no-underline hover:text-primary  ">
                  {parent}
                </AccordionTrigger>
                <AccordionContent className=" divide-y divide-border divide-dotted px-5 ">
                  {items.map(({ cat, slug }, i) => (
                    <div
                      key={i}
                      className=" h-[45px] flex flex-col justify-center   cursor-pointer "
                      onClick={() =>
                        slug === "blog"
                          ? router.push(`/${slug}`)
                          : router.push(`/category/fruits/${slug}`)
                      }
                    >
                      <p>{cat}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
