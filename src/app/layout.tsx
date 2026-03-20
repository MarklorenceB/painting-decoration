import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewsFloatingTab from "@/components/ReviewsFloatingTab";
import JsonLd, { localBusinessSchema } from "@/components/JsonLd";
import { fetchGraphQL } from "@/lib/wordpress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Jason Chapman | Painter & Decorator Wellington, Somerset",
    template: "%s | Jason Chapman Decorating",
  },
  description:
    "Professional painter, decorator and tiler based in Wellington, Somerset. Interior & exterior painting, decorating and tiling across Wellington, Taunton, Tiverton and surrounding areas. ~20 years' experience. Free quotes.",
  keywords: [
    "painter and decorator Wellington",
    "painter and decorator Taunton",
    "painter and decorator Tiverton",
    "tiler Wellington Somerset",
    "interior painting Wellington",
    "exterior painting Somerset",
    "tiling services Wellington",
    "Jason Chapman decorator",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Jason Chapman Tiling, Painting & Decorating",
  },
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
        <JsonLd data={localBusinessSchema} />
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
