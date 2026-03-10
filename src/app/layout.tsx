import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewsFloatingTab from "@/components/ReviewsFloatingTab";
import { fetchGraphQL } from "@/lib/wordpress";

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

const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    page(id: 11, idType: DATABASE_ID) {
      homePage {
        phoneNumber
      }
    }
  }
`;

interface SiteSettingsData {
  page: {
    homePage: {
      phoneNumber: string | null;
    };
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchGraphQL<SiteSettingsData>(SITE_SETTINGS_QUERY);
  const phone = data?.page?.homePage?.phoneNumber || "07903 197937";

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer phone={phone} />
          <ReviewsFloatingTab />
        </div>
      </body>
    </html>
  );
}
