import type { Metadata } from "next";
import Link from "next/link";
import { Brush, PaintBucket, Grid3X3, ArrowRight } from "lucide-react";

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
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Services
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Jason Chapman provides painting, decorating and tiling for
            homeowners across Wellington, Taunton, Tiverton and the surrounding
            areas. All work is completed with care, attention to detail and
            respect for your home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need painting, decorating or tiling?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Get in touch to discuss your project and request a quote.
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
