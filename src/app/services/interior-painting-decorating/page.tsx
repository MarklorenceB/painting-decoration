import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Brush,
  CheckCircle,
  ArrowRight,
  Star,
  ShieldCheck,
  Layers,
  Heart,
  MapPin,
} from "lucide-react";
import { fetchGraphQL } from "@/lib/wordpress";
import { SERVICE_PAGE_QUERY } from "@/lib/queries";

interface ServicePageData {
  page: {
    title: string;
    servicePage: {
      serviceHeading: string | null;
      serviceSubtext: string | null;
      serviceHeroImage: { node: { sourceUrl: string; altText: string } } | null;
      serviceDescription: string | null;
      serviceContentHeading: string | null;
      serviceContentText: string | null;
      serviceContentImage: { node: { sourceUrl: string; altText: string } } | null;
      serviceFeatures: string | null;
      serviceCtaHeading: string | null;
      serviceCtaText: string | null;
    };
  };
}

export const metadata: Metadata = {
  title: "Interior Painting & Decorating in Wellington | Jason Chapman",
  description:
    "Professional interior painting and decorating for homes in Wellington, Taunton, Tiverton and surrounding areas. Walls, ceilings, woodwork and wallpapering.",
};

export default async function InteriorPaintingDecoratingPage() {
  const data = await fetchGraphQL<ServicePageData>(SERVICE_PAGE_QUERY, { id: 12 });
  const sp = data?.page?.servicePage;

  const heading = sp?.serviceHeading || "Interior painting & decorating";
  const subtext = sp?.serviceSubtext || "Whether you are refreshing one room or updating several areas of your home, Jason provides careful interior decorating with a neat, professional finish. From walls and ceilings to woodwork and wallpapering, the focus is always on good preparation and a result that looks right.";
  const contentHeading = sp?.serviceContentHeading || "Refreshing rooms with care and attention";
  const contentText = sp?.serviceContentText || "Every decorating job is approached with careful preparation and close attention to detail. Jason works neatly and tidily in your home, delivering a professional finish that lifts tired rooms and refreshes your living space.";
  const heroImage = sp?.serviceHeroImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80";
  const heroImageAlt = sp?.serviceHeroImage?.node?.altText || "Interior room with freshly painted walls";
  const contentImage = sp?.serviceContentImage?.node?.sourceUrl || heroImage;
  const contentImageAlt = sp?.serviceContentImage?.node?.altText || heroImageAlt;
  const features = sp?.serviceFeatures ? sp.serviceFeatures.split("\n").filter(Boolean) : ["Walls & ceilings", "Woodwork painting", "Wallpapering", "Feature walls", "Full room refreshes", "Careful preparation"];
  const ctaHeading = sp?.serviceCtaHeading || "Looking for interior decorating done properly?";
  const ctaText = sp?.serviceCtaText || "Get in touch to discuss your project and request a quote.";

  const half = Math.ceil(features.length / 2);
  const featuresLeft = features.slice(0, half);
  const featuresRight = features.slice(half);

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Brush className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-widest">
              Painting &amp; Decorating
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            {heading}
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {subtext}
          </p>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Star className="h-4 w-4" /> 5/5 on MyBuilder
            </span>
            <span className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> ~20 years&apos; experience
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-4">
              {contentHeading}
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {contentText}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <ul className="space-y-2">
                {featuresLeft.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {featuresRight.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/gallery"
              className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              View decorating work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src={contentImage}
                alt={contentImageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose Jason */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(254,126,4,0.08)] hover:border-primary/20 transition-all duration-300">
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Preparation matters</h3>
              <p className="text-slate-500 leading-relaxed">
                A good finish starts with proper preparation. Surfaces are
                prepared carefully, the work area is kept neat, and every stage
                is completed with attention to detail.
              </p>
            </div>

            <div className="group relative bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(254,126,4,0.08)] hover:border-primary/20 transition-all duration-300">
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Work carried out with care
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Jason takes pride in being reliable, clean and tidy while
                working, and in treating every home with respect. You deal
                directly with the person doing the job, from first contact
                through to completion.
              </p>
            </div>

            <div className="group relative bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(254,126,4,0.08)] hover:border-primary/20 transition-all duration-300">
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Areas covered</h3>
              <p className="text-slate-500 leading-relaxed">
                Based in Wellington, Jason covers Wellington, Taunton, Tiverton
                and surrounding areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {ctaHeading}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {ctaText}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
