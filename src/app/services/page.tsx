import Link from "next/link";
import Image from "next/image";
import {
  Brush,
  Grid3X3,
  Layers,
  Home,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";

const services = [
  {
    icon: Brush,
    tag: "Interior Design",
    title: "Painting & Decorating",
    description:
      "Our core expertise lies in transforming interior spaces. We specialize in high-end finishes for residential living spaces and durable coatings for commercial offices. Our meticulous preparation ensures a flawless, long-lasting result.",
    features: [
      "Wallpapering",
      "Coving & Cornice",
      "Woodwork Painting",
      "Feature Walls",
      "Ceiling Restoration",
      "Spray Painting",
    ],
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    imageAlt: "Modern interior living room with freshly painted walls",
    linkText: "View Painting Projects",
  },
  {
    icon: Grid3X3,
    tag: "Kitchen & Bath",
    title: "Precision Tiling",
    description:
      "From backsplash mosaics to large-format floor tiles, we provide expert installation for kitchens, bathrooms, and commercial wet rooms. We handle everything from surface preparation to final grouting.",
    features: [
      "Wall & Floor Tiling",
      "Grout Repair",
      "Natural Stone",
      "Splashbacks",
      "Wet Room Prep",
      "Underfloor Heating",
    ],
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    imageAlt: "Expertly installed subway tiles in a modern kitchen",
    linkText: "View Tiling Projects",
  },
  {
    icon: Layers,
    tag: "Flooring Solutions",
    title: "Wooden Flooring",
    description:
      "Upgrade your property with high-quality wooden flooring. We offer professional installation of engineered wood, laminate, and restoration services for existing hardwood floors.",
    features: [
      "Hardwood Install",
      "Sanding & Refinishing",
      "Laminate Fitting",
      "Parquet Patterns",
      "Floor Leveling",
      "Sealing & Waxing",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    imageAlt: "Polished oak hardwood floor installation in a bright room",
    linkText: "View Flooring Projects",
  },
  {
    icon: Home,
    tag: "Exterior Protection",
    title: "Exterior Painting",
    description:
      "Protect your property from the elements with our professional exterior painting services. We use high-performance, weather-resistant coatings designed for longevity and curb appeal.",
    features: [
      "Masonry Painting",
      "Window Frames",
      "Fascias & Soffits",
      "Sanding & Prep",
      "Fence & Decking",
      "Protective Sealants",
    ],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    imageAlt: "Freshly painted exterior masonry of a residential home",
    linkText: "View Exterior Projects",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Expert Finishes for Every Surface
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            From contemporary residential interiors to high-traffic commercial
            spaces, we provide professional multi-skilled decorating services
            tailored to your exact requirements.
          </p>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> Fully Insured
            </span>
            <span className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Star className="h-4 w-4" /> 10+ Years Exp.
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 pb-24">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.title}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className={isEven ? "order-2 lg:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <service.icon className="h-5 w-5" />
                  <span className="font-bold text-sm uppercase tracking-widest">
                    {service.tag}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((f) => (
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
                    {service.features.slice(3).map((f) => (
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
                  {service.linkText}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className={isEven ? "order-1 lg:order-2" : ""}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your space?
            </h2>
            <p className="text-white/80">
              Get a free, no-obligation quote today. We offer flexible scheduling
              for both commercial and residential projects.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg"
            >
              Request Your Quote
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
