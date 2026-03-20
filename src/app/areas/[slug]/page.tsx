import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  CheckCircle,
  ArrowRight,
  Phone,
  Star,
  ShieldCheck,
  Brush,
  PaintBucket,
  Grid3X3,
} from "lucide-react";
import JsonLd, { serviceSchema } from "@/components/JsonLd";

interface AreaData {
  slug: string;
  name: string;
  county: string;
  description: string;
  intro: string;
  services: string;
  whyLocal: string;
  nearby: string[];
  heroImage: string;
}

const areas: Record<string, AreaData> = {
  wellington: {
    slug: "wellington",
    name: "Wellington",
    county: "Somerset",
    description:
      "Professional painter, decorator and tiler based in Wellington, Somerset. Interior and exterior painting, decorating and wall & floor tiling. Free quotes available.",
    intro:
      "Based right here in Wellington, Jason Chapman provides painting, decorating and tiling services to homeowners across the town and surrounding villages. As a local tradesman, you get a direct, personal service from someone who knows the area and takes pride in their work.",
    services:
      "Whether you need a full interior repaint, exterior maintenance on your house walls and woodwork, wallpapering, or kitchen and bathroom tiling, Jason delivers a neat, professional finish every time. All work is carried out with careful preparation, attention to detail and respect for your home.",
    whyLocal:
      "Being based in Wellington means less travel time and more flexibility for your project. Jason has worked on homes throughout Wellington — from Victorian terraces in the town centre to modern estates on the outskirts. He understands the local architecture and the specific needs of Somerset properties.",
    nearby: ["Taunton", "Tiverton", "Bridgwater", "Milverton", "Wiveliscombe"],
    heroImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
  },
  taunton: {
    slug: "taunton",
    name: "Taunton",
    county: "Somerset",
    description:
      "Painter, decorator and tiler serving Taunton, Somerset. Interior & exterior painting, decorating and tiling. Based in nearby Wellington. Free quotes.",
    intro:
      "Jason Chapman provides painting, decorating and tiling services to homeowners in Taunton and the surrounding area. Based in nearby Wellington, Taunton is one of the main areas Jason works in — just a short drive away, meaning competitive rates and reliable availability.",
    services:
      "From refreshing living rooms and bedrooms with a professional paint job, to exterior house painting, wallpapering, and bathroom or kitchen tiling, Jason covers all aspects of decorating and tiling for Taunton homes. Every job is completed with proper preparation and a clean, tidy finish.",
    whyLocal:
      "Taunton homeowners benefit from working with a nearby, independent tradesman rather than a large firm. You deal directly with the person doing the work, from the initial quote through to completion. Jason has completed numerous projects across Taunton, including period properties in the town centre and family homes in Priorswood, Bishops Hull and Norton Fitzwarren.",
    nearby: ["Wellington", "Bridgwater", "North Petherton", "Bishops Lydeard", "Wiveliscombe"],
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
  },
  tiverton: {
    slug: "tiverton",
    name: "Tiverton",
    county: "Devon",
    description:
      "Painter, decorator and tiler serving Tiverton, Devon. Interior & exterior painting, decorating and tiling. Based in nearby Wellington. Free quotes.",
    intro:
      "Jason Chapman offers painting, decorating and tiling services to homeowners in Tiverton and the surrounding Devon area. Based in Wellington — just over the Somerset border — Tiverton is well within Jason's regular working area.",
    services:
      "Interior painting and decorating, exterior house painting, wallpapering, and wall and floor tiling for kitchens and bathrooms. Whether it's a single room refresh or a complete property makeover, Jason works neatly and carefully to deliver a result you'll be happy with.",
    whyLocal:
      "Tiverton's mix of period townhouses, stone cottages and modern developments each require a different approach. Jason brings nearly 20 years of experience to every project, with the flexibility and personal attention that larger firms can't match. You get one dedicated tradesman who takes responsibility for the whole job.",
    nearby: ["Wellington", "Cullompton", "Bampton", "Crediton", "Honiton"],
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  },
  bridgwater: {
    slug: "bridgwater",
    name: "Bridgwater",
    county: "Somerset",
    description:
      "Painter, decorator and tiler serving Bridgwater, Somerset. Interior & exterior painting, decorating and tiling. Based in nearby Wellington. Free quotes.",
    intro:
      "Jason Chapman provides painting, decorating and tiling services to homeowners in Bridgwater and the surrounding Somerset area. Based in Wellington, Bridgwater is easily accessible and a regular part of Jason's working area.",
    services:
      "Full interior and exterior painting and decorating, wallpapering, and kitchen and bathroom tiling. Jason covers all types of residential decorating work in Bridgwater, delivering a professional finish backed by nearly 20 years of experience.",
    whyLocal:
      "Bridgwater homeowners get the benefit of a reliable, experienced tradesman who works independently. There's no sales team or subcontractors — just Jason, doing the work himself to a high standard. He has completed projects across Bridgwater including properties in the town centre, Sydenham and Westonzoyland.",
    nearby: ["Taunton", "Wellington", "North Petherton", "Burnham-on-Sea", "Highbridge"],
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
  },
};

const serviceCards = [
  {
    icon: Brush,
    title: "Interior Painting & Decorating",
    description:
      "Walls, ceilings, woodwork, wallpapering and full room refreshes.",
    href: "/services/interior-painting-decorating",
  },
  {
    icon: PaintBucket,
    title: "Exterior Painting",
    description:
      "House walls, fascias, soffits, window frames, doors and fences.",
    href: "/services/exterior-painting",
  },
  {
    icon: Grid3X3,
    title: "Wall & Floor Tiling",
    description:
      "Kitchen tiling, bathroom tiling, splashbacks and floor tiling.",
    href: "/services/wall-floor-tiling",
  },
];

export function generateStaticParams() {
  return Object.keys(areas).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = areas[slug];
  if (!area) return {};
  return {
    title: `Painter & Decorator in ${area.name}, ${area.county}`,
    description: area.description,
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = areas[slug];
  if (!area) notFound();

  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Painter & Decorator in ${area.name}`,
    description: area.description,
    url: `https://jason-chapman.vercel.app/areas/${area.slug}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://jason-chapman.vercel.app/#business",
      name: "Jason Chapman Tiling, Painting & Decorating",
    },
    areaServed: {
      "@type": "City",
      name: `${area.name}, ${area.county}`,
    },
  };

  return (
    <>
      <JsonLd data={areaSchema} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <Image
          src={area.heroImage}
          alt={`Painting and decorating services in ${area.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-section">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-widest">
              {area.name}, {area.county}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Painter & Decorator in {area.name}
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-8">
            Professional painting, decorating and tiling services for
            homeowners in {area.name} and the surrounding area.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link
              href="/contact#contact-form"
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

      {/* Intro */}
      <section className="py-section px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-content">
          Painting, decorating &amp; tiling in {area.name}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">{area.intro}</p>
        <p className="text-slate-600 leading-relaxed">{area.services}</p>
      </section>

      {/* Services */}
      <section className="py-section px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-content text-center">
            Services available in {area.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {serviceCards.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why local */}
      <section className="py-section px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-content">
          Why choose a local decorator in {area.name}?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-8">{area.whyLocal}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Direct, one-to-one service",
            "Clean, tidy and respectful",
            "Reliable and punctual",
            "~20 years' experience",
            "Free, no-obligation quotes",
            "5/5 rated on MyBuilder",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby areas */}
      <section className="py-section px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-content">
            Also covering nearby areas
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {area.nearby.map((town) => {
              const townSlug = town.toLowerCase().replace(/\s+/g, "-");
              const hasPage = townSlug in areas;
              return hasPage ? (
                <Link
                  key={town}
                  href={`/areas/${townSlug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  {town}
                </Link>
              ) : (
                <span
                  key={town}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-500"
                >
                  <MapPin className="h-3 w-3" />
                  {town}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-content">
            Looking for a painter & decorator in {area.name}?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Get in touch for a free, no-obligation quote on your project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact#contact-form"
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
