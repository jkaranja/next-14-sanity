import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Trash
} from "lucide-react";

import { Label } from "@/components/ui/label";

import { DRINKS, FRUITS, MEAT, VEGETABLES } from "@/app/constants/menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

const Filters = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <div className="mb-3 gap-y-2 flex flex-col">
          <h5>Filter By</h5>
        </div>
        <div className="mb-4">
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4 mr-2" /> Clear all
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-3 gap-y-2 flex flex-col">
          <h5>Category</h5>
        </div>
        <div>
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
                className="border-border border-dashed "
              >
                <AccordionTrigger className="text-base hover:no-underline hover:text-primary  ">
                  {parent}
                </AccordionTrigger>
                <AccordionContent className=" divide-y divide-border divide-dotted px-5 ">
                  {items.map(({ cat, slug }, i) => (
                    <div
                      key={i}
                      className=" h-[45px] flex flex-col justify-center   cursor-pointer "
                      onClick={() => router.push(`/category/fruits/${slug}`)}
                    >
                      <p>{cat}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div>
        <div className="mb-3 gap-y-2 flex flex-col">
          <h5>Price</h5>
        </div>

        <div className="py-2">
          <Slider defaultValue={[33]} max={300} step={1} className="" />
          <div className="flex justify-between py-2">
            <p>$0</p>
            <p>$300</p>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-3 gap-y-2 flex flex-col">
          <h5>Weight</h5>
        </div>

        <div>
          <ScrollArea className="max-h-[300px] ">
            <RadioGroup defaultValue="option-one">
              {["200g", "300g", "400g", "500g", "600g"].map((grams, i) => (
                <div key={i} className="flex items-center py-2 space-x-2">
                  <RadioGroupItem value="option-two" />
                  <Label htmlFor="option-one">{grams}</Label>
                </div>
              ))}
            </RadioGroup>
          </ScrollArea>
        </div>
      </div>
      <div>
        <div className="mb-3 gap-y-2 flex flex-col">
          <h5>Color</h5>
        </div>

        <div className="mb-6">
          <div className="columns-2">
            {["red", "yellow", "green", "blue", "pink", "brown"].map(
              (color, i) => (
                <div key={i} className="flex items-center gap-x-2 mb-2">
                  <div className="h-4 w-4" style={{ backgroundColor: color }} />
                  <p className="capitalize">{color}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="mb-3 gap-y-2 flex flex-col">
          <h5>Vendor</h5>
        </div>

        <div>
          <ScrollArea className="max-h-[300px]     ">
            <div className="columns-2">
              {[
                "veganLife",
                "organicHub",
                "urbanTaste",
                "organic",
                "Vinova",
                "Vinova",
              ].map((vendor, i) => (
                <div key={i} className="  mb-2">
                  <Badge variant="outline" className="p-2">
                    {vendor}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div>
        <div className="mb-3 gap-y-2 flex flex-col">
          <h5>Product tags</h5>
        </div>

        <div>
          <ScrollArea className="max-h-[300px]     ">
            <div className="flex gap-4 flex-wrap">
              {["Hot deals", "Banana", "Limited", "Fresh", "Organic"].map(
                (tag, i) => (
                  <div key={i}>
                    <Badge variant="outline" className="p-2">
                      {tag}
                    </Badge>
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Filters;
