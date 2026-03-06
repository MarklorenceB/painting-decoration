import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewsFloatingTab from "@/components/ReviewsFloatingTab";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Interior Decorating & Tiling in Wellington | Jason Chapman",
  description:
    "Interior painter, decorator and tiler based in Wellington, Somerset, covering Wellington, Taunton, Tiverton and surrounding areas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ReviewsFloatingTab />
        </div>
      </body>
    </html>
  );
}
