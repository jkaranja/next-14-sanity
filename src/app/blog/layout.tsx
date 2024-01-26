import React from "react";


type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = async ({ children }: BlogLayoutProps) => {
  return <div className=" ">{children}</div>;
};

export default BlogLayout;
