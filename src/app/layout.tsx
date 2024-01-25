import type { Metadata } from "next";
import { Inter, Lilita_One } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";

import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/Header";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const lilita_one = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lilita-one",
});

export const metadata: Metadata = {
  title: "Organicly - Fresh fruits, veggies, and more",
  description: "Shop fresh, healthy food items",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav>
            <Header />
          </nav>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
