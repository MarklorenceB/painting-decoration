import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  Brush,
  Grid3X3,
  PaintBucket,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  ClipboardCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* 1. Full-bleed Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
          alt="Beautifully decorated interior living space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4">
            Jason Chapman Tiling, Painting &amp; Decorating
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Painting, decorating and tiling in Wellington, Taunton, Tiverton and
            surrounding areas
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
            Reliable, tidy work and a professional finish for homeowners across
            the local area. Jason Chapman provides interior and exterior
            painting, decorating and tiling completed with care, attention to
            detail, and respect for your home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Request a quote
            </Link>
            <Link
              href="tel:07473124611"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call 07473 124611
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-700 font-medium">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              5/5 on MyBuilder
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>91 reviews</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>~20 years&apos; experience</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              Wellington, Somerset
            </span>
          </div>
        </div>
      </section>

      {/* 3. A local tradesman who takes pride in the finish */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A local tradesman who takes pride in the finish
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              When you choose Jason Chapman, you deal directly with the person
              carrying out the work from the first conversation to the final
              tidy-up. Every job is approached with care and completed to a high
              standard, whether you need a room redecorated, exterior paintwork
              refreshed, or tiling for a kitchen or bathroom.
            </p>
          </div>
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
        </div>
      </section>

      {/* 4. Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brush,
                title: "Interior Painting & Decorating",
                description:
                  "Fresh, clean finishes for walls, ceilings and woodwork. Careful preparation and neat, professional results.",
                href: "/services/interior-painting-decorating",
              },
              {
                icon: PaintBucket,
                title: "Exterior Painting",
                description:
                  "Professional exterior painting for house walls, fascias, window frames, doors and fences.",
                href: "/services/exterior-painting",
              },
              {
                icon: Grid3X3,
                title: "Wall & Floor Tiling",
                description:
                  "Clean, accurate tiling for kitchens, bathrooms, splashbacks and floors.",
                href: "/services/wall-floor-tiling",
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group text-center bg-background rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-bold group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why homeowners choose Jason */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why homeowners choose Jason
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Jason is known for reliable service, tidy working and close
              attention to detail. You get direct communication, honest advice
              and a professional finish from start to finish.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              "Direct, one-to-one service",
              "Clean and tidy while working",
              "Attention to detail",
              "Quality finish",
            ].map((point) => (
              <div key={point} className="text-center">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-semibold">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trusted by local homeowners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by local homeowners
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Jason is rated 5/5 on MyBuilder, with 91 reviews currently
              showing. Recent customers highlight quick and reliable quoting,
              tidy working methods, and finished work they are really pleased
              with.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {[
              {
                title: "Reliable from the start",
                description:
                  "Clear communication and dependable service from quote to finish.",
              },
              {
                title: "Clean and tidy in your home",
                description:
                  "Respectful working methods and a neat approach throughout the job.",
              },
              {
                title: "A finish you'll be happy with",
                description:
                  "Care and attention to the details that make the finished result look right.",
              },
            ].map((theme) => (
              <div
                key={theme.title}
                className="bg-background rounded-xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <h3 className="font-bold mb-2">{theme.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="https://www.mybuilder.com/profile/jason_chapman_tiling_painting_decorating/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Read reviews on MyBuilder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Recent Work preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Recent work
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
                alt="Recently decorated interior room"
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80"
                alt="Tiled bathroom wall"
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80"
                alt="Freshly tiled kitchen"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              View gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Areas Covered */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Areas covered
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Based in Wellington, Somerset, Jason covers Wellington, Taunton,
            Tiverton and surrounding areas. If you are nearby and not sure
            whether your location is covered, get in touch.
          </p>
        </div>
      </section>

      {/* 9. How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                icon: MessageCircle,
                title: "Get in touch",
                description:
                  "Call or send a message with a few details about the work you need done.",
              },
              {
                step: 2,
                icon: ClipboardCheck,
                title: "Receive your quote",
                description:
                  "Jason will discuss the job and provide a clear quote.",
              },
              {
                step: 3,
                icon: Sparkles,
                title: "Enjoy the finished result",
                description:
                  "Your painting, decorating or tiling work is completed neatly, professionally and with care.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">
                  <span className="text-primary mr-1">{item.step}.</span>
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "What kind of work do you take on?",
                answer:
                  "Interior and exterior painting, decorating and tiling for homes, from single rooms to larger projects.",
              },
              {
                question: "Which areas do you cover?",
                answer:
                  "Wellington, Taunton, Tiverton and surrounding areas.",
              },
              {
                question: "Do you do exterior painting?",
                answer:
                  "Yes. Jason provides exterior painting for homes in the local area, including house walls, fascias, soffits, window frames and fences. See the exterior painting page for more details.",
              },
              {
                question: "How do I get a quote?",
                answer:
                  "Call 07473 124611 or use the contact form with a few details about the job.",
              },
            ].map((faq) => (
              <details
                key={faq.question}
                className="group border border-slate-200 rounded-lg"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a painter, decorator or tiler?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Get in touch today to discuss your project and request a quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors"
          >
            Contact Jason
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
