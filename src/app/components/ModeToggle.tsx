"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [hydrated, setHydrated] = React.useState(false);

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  //will run after first render->by then hydration has already taken place.
  //This fixes mismatch in what is rendered on server and client hence solving the error
  //only show element on client after render
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return;
  return (
    <div>
      {theme === "light" ? (
        <Button variant="ghost" onClick={toggleTheme}>
          <Sun className="text-white  h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
      ) : (
        <Button variant="ghost" onClick={toggleTheme}>
          <Moon className="  absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      )}
    </div>
  );
}
