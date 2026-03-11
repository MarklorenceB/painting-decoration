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
  Phone,
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
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-section">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brush className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-widest">
              Painting &amp; Decorating
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            {heading}
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            {subtext}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors shadow-lg"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="tel:07903197937"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Link>
          </div>
          <div className="flex gap-4 justify-center">
            <span className="flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Star className="h-4 w-4" /> 5/5 on MyBuilder
            </span>
            <span className="flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> ~20 years&apos; experience
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-content-lg items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-content">
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
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 min-h-[44px] rounded-lg font-bold transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary px-6 py-3 min-h-[44px] rounded-lg font-bold transition-colors"
              >
                View Our Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
      <section className="py-section-lg px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-gutter">
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
      <section className="bg-primary text-white py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-content">
            {ctaHeading}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {ctaText}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 min-h-[44px] rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg"
            >
              Get Your Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="tel:07903197937"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call 07903 197937
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
