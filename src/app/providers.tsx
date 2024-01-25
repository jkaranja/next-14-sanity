"use client";

import React from "react";
import { ContextProvider } from "./context/Provider";
import { ThemeProvider } from "./components/theme-provider";

//next-auth conf
// https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
//https://next-auth.js.org/getting-started/client#sessionprovider
//https://next-auth.js.org/getting-started/example

//To be able to use useSession first you'll need to expose the session context, <SessionProvider />, at the top level of your application

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <ContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ContextProvider>
    </>
  );
};

export default Providers;
