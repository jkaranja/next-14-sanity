import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Filters from "./Filters";

const MobileFilters = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          className="border-none "
          side="left" //["top", "right", "bottom", "left"] as const
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="flex justify-start">Filters</SheetTitle>
          </SheetHeader>

          <Filters />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;
