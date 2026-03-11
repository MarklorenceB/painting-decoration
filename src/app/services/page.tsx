import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Brush, PaintBucket, Grid3X3, ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Services | Jason Chapman Tiling, Painting & Decorating",
  description:
    "Interior painting & decorating, exterior painting, and wall & floor tiling for homes in Wellington, Taunton, Tiverton and surrounding areas.",
};

const services = [
  {
    icon: Brush,
    title: "Interior Painting & Decorating",
    description:
      "Walls, ceilings, woodwork, wallpapering and full room refreshes with careful preparation and a neat, professional finish.",
    href: "/services/interior-painting-decorating",
  },
  {
    icon: PaintBucket,
    title: "Exterior Painting",
    description:
      "House walls, fascias, soffits, window frames, doors, garden walls and fences with weatherproof finishes.",
    href: "/services/exterior-painting",
  },
  {
    icon: Grid3X3,
    title: "Wall & Floor Tiling",
    description:
      "Kitchen tiling, bathroom tiling, splashbacks and floor tiling with clean lines and tidy finishing.",
    href: "/services/wall-floor-tiling",
  },
];

export default function ServicesOverviewPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&q=80"
          alt="Professional painting and decorating services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-section">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Services
          </h1>
          <p className="text-lg text-white/85 leading-relaxed mb-8">
            Jason Chapman provides painting, decorating and tiling for
            homeowners across Wellington, Taunton, Tiverton and the surrounding
            areas. All work is completed with care, attention to detail and
            respect for your home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5">
                <service.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-content">
            Need painting, decorating or tiling?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Get in touch to discuss your project and request a quote.
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
