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
  Clock,
  UserCheck,
  Sparkles,
  Quote,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { fetchGraphQL } from "@/lib/wordpress";
import { AREA_PAGES_QUERY } from "@/lib/queries";

type WpImg = { node: { sourceUrl: string; altText: string } } | null;

interface AreaPagesData {
  page: {
    areaPages: Record<string, WpImg>;
  };
}

function img(wp: WpImg, fallback: string): { src: string; alt: string } {
  if (wp?.node?.sourceUrl) return { src: wp.node.sourceUrl, alt: wp.node.altText || "" };
  return { src: fallback, alt: "" };
}

interface AreaData {
  slug: string;
  name: string;
  county: string;
  cmsPrefix: string;
  description: string;
  intro: string;
  services: string;
  whyLocal: string;
  nearby: string[];
  heroImage: string;
  whyChooseImage: string;
  introImages: [string, string, string, string];
  testimonial: { text: string; name: string; location: string };
}

const areas: Record<string, AreaData> = {
  wellington: {
    slug: "wellington",
    name: "Wellington",
    county: "Somerset",
    cmsPrefix: "areaWellington",
    description:
      "Professional painter, decorator and tiler based in Wellington, Somerset. Interior and exterior painting, decorating and wall & floor tiling. Free quotes available.",
    intro:
      "Based right here in Wellington, Jason Chapman provides painting, decorating and tiling services to homeowners across the town and surrounding villages. As a local tradesman, you get a direct, personal service from someone who knows the area and takes pride in their work.",
    services:
      "Whether you need a full interior repaint, exterior maintenance on your house walls and woodwork, wallpapering, or kitchen and bathroom tiling, Jason delivers a neat, professional finish every time. All work is carried out with careful preparation, attention to detail and respect for your home.",
    whyLocal:
      "Being based in Wellington means less travel time and more flexibility for your project. Jason has worked on homes throughout Wellington — from Victorian terraces in the town centre to modern estates on the outskirts. He understands the local architecture and the specific needs of Somerset properties.",
    nearby: ["Taunton", "Tiverton", "Bridgwater", "North Petherton", "Milverton"],
    heroImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
    whyChooseImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80",
    introImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    testimonial: {
      text: "Jason did a brilliant job on our living room and hallway. Very tidy, professional and the finish was excellent. Would highly recommend.",
      name: "Sarah T.",
      location: "Wellington",
    },
  },
  taunton: {
    slug: "taunton",
    name: "Taunton",
    county: "Somerset",
    cmsPrefix: "areaTaunton",
    description:
      "Painter, decorator and tiler serving Taunton, Somerset. Interior & exterior painting, decorating and tiling. Based in nearby Wellington. Free quotes.",
    intro:
      "Jason Chapman provides painting, decorating and tiling services to homeowners in Taunton and the surrounding area. Based in nearby Wellington, Taunton is one of the main areas Jason works in — just a short drive away, meaning competitive rates and reliable availability.",
    services:
      "From refreshing living rooms and bedrooms with a professional paint job, to exterior house painting, wallpapering, and bathroom or kitchen tiling, Jason covers all aspects of decorating and tiling for Taunton homes. Every job is completed with proper preparation and a clean, tidy finish.",
    whyLocal:
      "Taunton homeowners benefit from working with a nearby, independent tradesman rather than a large firm. You deal directly with the person doing the work, from the initial quote through to completion. Jason has completed numerous projects across Taunton, including period properties in the town centre and family homes in Priorswood, Bishops Hull and Norton Fitzwarren.",
    nearby: ["Wellington", "Bridgwater", "North Petherton", "Burnham-on-Sea", "Highbridge"],
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    whyChooseImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80",
    introImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    testimonial: {
      text: "Really pleased with the work Jason did on our bathroom tiling and kitchen repaint. Clean, on time and a great finish.",
      name: "Mark D.",
      location: "Taunton",
    },
  },
  tiverton: {
    slug: "tiverton",
    name: "Tiverton",
    county: "Devon",
    cmsPrefix: "areaTiverton",
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
    whyChooseImage: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1600&q=80",
    introImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    testimonial: {
      text: "Jason decorated three bedrooms and the landing for us. Excellent preparation, tidy throughout and a lovely finish. Definitely recommend.",
      name: "Jane P.",
      location: "Tiverton",
    },
  },
  bridgwater: {
    slug: "bridgwater",
    name: "Bridgwater",
    county: "Somerset",
    cmsPrefix: "areaBridgwater",
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
    whyChooseImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    introImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    testimonial: {
      text: "Fantastic exterior painting job on our house. Jason was reliable, clean and the result looks superb. Very happy with everything.",
      name: "Chris W.",
      location: "Bridgwater",
    },
  },
  "north-petherton": {
    slug: "north-petherton",
    name: "North Petherton",
    county: "Somerset",
    cmsPrefix: "areaNorthPetherton",
    description:
      "Painter, decorator and tiler serving North Petherton, Somerset. Interior & exterior painting, decorating and tiling. Based in nearby Wellington. Free quotes.",
    intro:
      "Jason Chapman provides painting, decorating and tiling services to homeowners in North Petherton and the surrounding Somerset villages. Based in Wellington, North Petherton is a short drive along the A38 and a regular part of Jason's working area.",
    services:
      "Interior and exterior painting, wallpapering, and wall and floor tiling for kitchens and bathrooms. Whether you need a single room freshened up or a full property makeover, Jason delivers a tidy, professional finish with nearly 20 years of experience behind every job.",
    whyLocal:
      "North Petherton's mix of older village properties and newer builds each need a different touch. Jason works independently — no salespeople, no subcontractors — so you deal directly with the person doing the work. He has completed projects across North Petherton and neighbouring villages, delivering reliable results and a clean finish every time.",
    nearby: ["Bridgwater", "Taunton", "Wellington", "Burnham-on-Sea", "Highbridge"],
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    whyChooseImage: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1600&q=80",
    introImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    testimonial: {
      text: "Jason repainted the outside of our house and it looks like new. Very thorough preparation, tidy worker and a really good finish. Highly recommended.",
      name: "Paul R.",
      location: "North Petherton",
    },
  },
  "burnham-on-sea": {
    slug: "burnham-on-sea",
    name: "Burnham-on-Sea",
    county: "Somerset",
    cmsPrefix: "areaBurnhamOnSea",
    description:
      "Painter, decorator and tiler serving Burnham-on-Sea, Somerset. Interior & exterior painting, decorating and tiling. Based in nearby Wellington. Free quotes.",
    intro:
      "Jason Chapman provides painting, decorating and tiling services to homeowners in Burnham-on-Sea and along the Somerset coast. Based in Wellington, Burnham-on-Sea is within easy reach and part of Jason's regular working area.",
    services:
      "Full interior and exterior painting and decorating, wallpapering, and kitchen and bathroom tiling. Coastal properties often need extra care with exterior finishes to withstand the salt air — Jason uses quality, durable paints and sealants suited to seaside conditions.",
    whyLocal:
      "Burnham-on-Sea's seafront properties, Victorian villas and modern estates all have different decorating needs. Jason brings nearly 20 years of experience and understands the importance of proper preparation — especially for exterior work exposed to coastal weather. You deal directly with Jason from quote to completion, with no middlemen or subcontractors.",
    nearby: ["Highbridge", "Bridgwater", "North Petherton", "Taunton", "Wedmore"],
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    whyChooseImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    introImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    testimonial: {
      text: "Jason painted the exterior of our seafront bungalow. He prepared everything properly and the finish has held up brilliantly. Very pleased with the result.",
      name: "Tony & Linda G.",
      location: "Burnham-on-Sea",
    },
  },
  highbridge: {
    slug: "highbridge",
    name: "Highbridge",
    county: "Somerset",
    cmsPrefix: "areaHighbridge",
    description:
      "Painter, decorator and tiler serving Highbridge, Somerset. Interior & exterior painting, decorating and tiling. Based in nearby Wellington. Free quotes.",
    intro:
      "Jason Chapman offers painting, decorating and tiling services to homeowners in Highbridge and the surrounding area. Based in Wellington, Highbridge is easily accessible via the M5 and forms part of Jason's regular working area across Somerset.",
    services:
      "Interior painting and decorating, exterior house painting, wallpapering, and wall and floor tiling for kitchens and bathrooms. From a quick room refresh to a full property redecoration, Jason delivers a clean, professional finish on every project.",
    whyLocal:
      "Highbridge homeowners benefit from working with an experienced, independent tradesman. Jason has nearly 20 years in the trade and works on his own — meaning you get consistent quality from start to finish. No sales team, no subcontractors, just reliable workmanship and a tidy finish every time.",
    nearby: ["Burnham-on-Sea", "Bridgwater", "North Petherton", "Taunton", "Wedmore"],
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    whyChooseImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80",
    introImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    ],
    testimonial: {
      text: "Jason decorated our kitchen and hallway. Excellent work — neat, tidy and finished to a really high standard. Would definitely recommend to anyone in the area.",
      name: "Karen S.",
      location: "Highbridge",
    },
  },
};

const serviceCards = [
  {
    icon: Brush,
    title: "Interior Painting & Decorating",
    description:
      "Walls, ceilings, woodwork, wallpapering and full room refreshes with careful preparation and a professional finish.",
    href: "/services/interior-painting-decorating",
    cmsField: "areaServiceInteriorImg",
    fallback: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
  },
  {
    icon: PaintBucket,
    title: "Exterior Painting",
    description:
      "House walls, fascias, soffits, window frames, doors, garden walls and fences with durable, weatherproof finishes.",
    href: "/services/exterior-painting",
    cmsField: "areaServiceExteriorImg",
    fallback: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80",
  },
  {
    icon: Grid3X3,
    title: "Wall & Floor Tiling",
    description:
      "Kitchen tiling, bathroom tiling, splashbacks and floor tiling with clean lines and tidy finishing.",
    href: "/services/wall-floor-tiling",
    cmsField: "areaServiceTilingImg",
    fallback: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  },
];

const benefits = [
  {
    icon: UserCheck,
    title: "Direct, one-to-one service",
    text: "You deal directly with Jason from quote to completion. No salespeople, no subcontractors.",
  },
  {
    icon: Sparkles,
    title: "Clean, tidy and respectful",
    text: "Your home is treated with care. Work areas are kept neat and left spotless.",
  },
  {
    icon: Clock,
    title: "Reliable and punctual",
    text: "Jason turns up when he says he will and keeps you informed throughout.",
  },
  {
    icon: ShieldCheck,
    title: "~20 years' experience",
    text: "Nearly two decades of painting, decorating and tiling across Somerset and Devon.",
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

  // Fetch CMS images
  const cmsData = await fetchGraphQL<AreaPagesData>(AREA_PAGES_QUERY);
  const cms = cmsData?.page?.areaPages ?? {};
  const prefix = area.cmsPrefix;

  // Resolve hero image
  const hero = img(cms[`${prefix}Hero`], area.heroImage);

  // Resolve "Why Choose" background image (separate from hero)
  const whyChoose = img(cms[`${prefix}WhyChoose`], area.whyChooseImage);

  // Resolve intro grid images (4)
  const introImgs = [
    img(cms[`${prefix}Img1`], area.introImages[0]),
    img(cms[`${prefix}Img2`], area.introImages[1]),
    img(cms[`${prefix}Img3`], area.introImages[2]),
    img(cms[`${prefix}Img4`], area.introImages[3]),
  ];

  // Resolve service card images (shared across all areas)
  const resolvedServiceCards = serviceCards.map((card) => ({
    ...card,
    image: img(cms[card.cmsField], card.fallback),
  }));

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
          src={hero.src}
          alt={hero.alt || `Painting and decorating services in ${area.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-section">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-wider uppercase bg-primary/80 text-white rounded-full">
            <MapPin className="h-3.5 w-3.5" />
            {area.name}, {area.county}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Painter & Decorator in{" "}
            <span className="text-primary">{area.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-8">
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
              href="tel:07473124611"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Link>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 5/5 on MyBuilder
            </span>
            <span className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-primary" /> ~20 years&apos; experience
            </span>
          </div>
        </div>
      </section>

      {/* Intro — two-column with offset image grid */}
      <section className="py-section-lg px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-content-lg items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                <MapPin className="h-3.5 w-3.5" />
                Serving {area.name}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Painting, decorating &amp; tiling in{" "}
                <span className="text-primary">{area.name}</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {area.intro}
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                {area.services}
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">5/5</p>
                    <p className="text-xs text-slate-500 font-medium">MyBuilder Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">20+</p>
                    <p className="text-xs text-slate-500 font-medium">Years Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">Free</p>
                    <p className="text-xs text-slate-500 font-medium">No-Obligation Quotes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] relative shadow-lg">
                  <Image
                    src={introImgs[0].src}
                    alt={introImgs[0].alt || `Interior painting project in ${area.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square relative shadow-lg">
                  <Image
                    src={introImgs[1].src}
                    alt={introImgs[1].alt || `Tiling project in ${area.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-square relative shadow-lg">
                  <Image
                    src={introImgs[2].src}
                    alt={introImgs[2].alt || `Decorating work in ${area.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] relative shadow-lg">
                  <Image
                    src={introImgs[3].src}
                    alt={introImgs[3].alt || `Bathroom tiling in ${area.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — image cards with overlay */}
      <section className="py-section-lg px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-content-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Services available in {area.name}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              From a single room refresh to a complete property makeover — Jason covers
              all painting, decorating and tiling needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {resolvedServiceCards.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] block shadow-lg"
              >
                <Image
                  src={service.image.src}
                  alt={service.image.alt || service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white mb-4 shadow-lg">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose local — dark section with background image */}
      <section className="relative py-section-lg px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Image
          src={whyChoose.src}
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-content-lg items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wider uppercase text-primary bg-primary/20 rounded-full">
                Why Choose Local
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Why choose a local decorator in{" "}
                <span className="text-primary">{area.name}?</span>
              </h2>
              <p className="text-white/70 leading-relaxed text-lg mb-8">
                {area.whyLocal}
              </p>
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors shadow-lg"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/20 text-primary mb-4">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-section-lg px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-bold leading-snug mb-8 text-foreground">
            &ldquo;{area.testimonial.text}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {area.testimonial.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">{area.testimonial.name}</p>
              <p className="text-xs text-slate-400">{area.testimonial.location}</p>
            </div>
          </div>
          <div className="flex gap-0.5 justify-center mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="py-section px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
            <MapPin className="h-3.5 w-3.5" />
            Coverage Area
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Also covering nearby areas
          </h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Jason works across Somerset and Devon. If your town isn&apos;t listed, get in
            touch — he may still cover your area.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {area.nearby.map((town) => {
              const townSlug = town.toLowerCase().replace(/\s+/g, "-");
              const hasPage = townSlug in areas;
              return hasPage ? (
                <Link
                  key={town}
                  href={`/areas/${townSlug}`}
                  className="group inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:border-primary hover:text-primary hover:shadow-md transition-all"
                >
                  <MapPin className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                  {town}
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-primary transition-colors" />
                </Link>
              ) : (
                <span
                  key={town}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-400"
                >
                  <MapPin className="h-4 w-4" />
                  {town}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-section-lg px-4 sm:px-6 lg:px-8 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Looking for a painter &amp; decorator in {area.name}?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
            Get in touch for a free, no-obligation quote on your project.
            Jason is happy to discuss your requirements.
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
              href="tel:07473124611"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 min-h-[44px] rounded-lg font-bold transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call 07473 124611
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
