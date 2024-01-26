"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";

type BannerProps = {
  children: React.ReactNode;
  className?: string;
  img?: string;
};

const Banner = ({
  children,
  className,
  img = "https://cdn.pixabay.com/photo/2022/02/23/03/42/organic-vegetables-7029975_1280.jpg",
}: BannerProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-y-4 text-white justify-center bg-muted py-40 bg-fixed bg-bottom bg-no-repeat bg-cover",
        className
      )}
      style={{
        backgroundImage:
          theme !== "dark"
            ? `linear-gradient(to bottom, hsla(150, 80%, 47%, 0.97) 10%, hsla(20, 14.3%, 4.1%, 0.4), hsla(150, 80%, 47%, 0.3)), url(${img})`
            : `linear-gradient(to bottom, hsla(20, 14.3%, 4.1%, 1) 10%, hsla(20, 14.3%, 4.1%, 0.8) 50%, hsla(20, 14.3%, 4.1%, 0.6)), url(${img})`,
      }}
    >
      {children}
    </div>
  );
};

export default Banner;
