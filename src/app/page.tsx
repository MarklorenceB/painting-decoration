import Link from "next/link";
import Image from "next/image";
import {
  Brush,
  Grid3X3,
  Layers,
  Home,
  ShieldCheck,
  CheckCircle,
  Star,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Brush,
    title: "Painting & Decorating",
    description:
      "High-quality interior and exterior finishes using only the finest premium paint brands.",
  },
  {
    icon: Grid3X3,
    title: "Tiling Services",
    description:
      "Precision wall and floor tiling for luxury kitchens, bathrooms, and utility areas.",
  },
  {
    icon: Layers,
    title: "Wooden Flooring",
    description:
      "Expert installation and restoration of solid wood, engineered, and laminate flooring.",
  },
  {
    icon: Home,
    title: "Exterior Painting",
    description:
      "Weather-resistant coatings and masonry painting to protect and beautify your exterior.",
  },
];

const testimonials = [
  {
    text: "The attention to detail was exceptional. Our living room looks better than when we first moved in. Professional, clean, and highly recommended.",
    name: "Sarah Thompson",
    role: "Interior Design Project",
    stars: 5,
  },
  {
    text: "Sorted out our exterior masonry and the finish is flawless. Very impressed with the speed and tidiness of the work.",
    name: "James Wilson",
    role: "Exterior Renovation",
    stars: 5,
  },
  {
    text: "Excellent tiling work in our kitchen. Perfectly aligned and finished with great care. A true craftsman.",
    name: "Emma Richards",
    role: "Kitchen Tiling",
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
              Local Master Decorator
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Professional
              <br />
              Painting &amp;{" "}
              <span className="text-primary">Decorating</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Elevating homes with meticulous attention to detail. Experience the
              premium touch of a dedicated, multi-skilled professional
              specializing in high-end finishes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/gallery"
                className="border border-slate-300 hover:border-primary hover:text-primary px-6 py-3 rounded-lg text-sm font-bold transition-all"
              >
                View Our Gallery
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                alt="Modern interior with freshly painted walls"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-3 shadow-lg flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-bold">Fully Insured</p>
                <p className="text-xs text-slate-500">Professional Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Meticulous Craftsmanship
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">
            Whether it&apos;s a single room or a full property renovation, we bring
            the same level of precision and care to every project.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Touch Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden aspect-[3/4] relative">
                <Image
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80"
                  alt="Painter working on wall"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-square relative">
                <Image
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80"
                  alt="Freshly painted bedroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80"
                  alt="Paint brushes close up"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[3/4] relative">
                <Image
                  src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&q=80"
                  alt="Modern decorated room"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Personal Touch
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              As a dedicated &apos;one-man band&apos;, I take immense pride in every
              stroke of the brush. Unlike larger firms, you&apos;ll deal directly
              with me from the initial quote to the final cleanup.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Consistency across the entire project",
                "Clean, tidy, and respectful of your home",
                "Professional advice on colors and finishes",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="border-l-4 border-primary pl-4 italic text-slate-700">
              <p className="mb-2">
                &ldquo;Quality isn&apos;t just a goal; it&apos;s my signature.&rdquo;
              </p>
              <cite className="text-sm text-slate-500 not-italic">
                &mdash; Founder, Signature Finishes
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Local Homeowners
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-background rounded-xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic mb-6 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your home?
            </h2>
            <p className="text-white/80 mb-6">
              Get in touch today for a free, no-obligation consultation. I
              provide detailed quotes and professional advice for any scale of
              project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 01234 567 890
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@signaturefinishes.com
              </span>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg flex items-center gap-2"
          >
            Request Your Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
