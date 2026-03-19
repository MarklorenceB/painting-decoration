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
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ParallaxHero from "@/components/ParallaxHero";
import { fetchGraphQL } from "@/lib/wordpress";
import { HOME_PAGE_QUERY } from "@/lib/queries";

type WpImage = { node: { sourceUrl: string; altText: string } } | null;

interface HomePageData {
  page: {
    homePage: {
      heroHeading: string | null;
      heroSubtext: string | null;
      heroImage: WpImage;
      aboutHeading: string | null;
      aboutText: string | null;
      aboutImage1: WpImage;
      aboutImage2: WpImage;
      aboutImage3: WpImage;
      aboutImage4: WpImage;
      phoneNumber: string | null;
      mybuilderReviewCount: number | null;
      mybuilderUrl: string | null;
      yearsExperience: number | null;
      whyChooseImage: WpImage;
      recentWorkImage1: WpImage;
      recentWorkImage2: WpImage;
      recentWorkImage3: WpImage;
    };
  };
}

export default async function HomePage() {
  const data = await fetchGraphQL<HomePageData>(HOME_PAGE_QUERY);
  const hp = data?.page?.homePage;

  const heroHeading =
    hp?.heroHeading ||
    "Painting, decorating and tiling in Wellington, Taunton, Tiverton and surrounding areas";
  const heroSubtext =
    hp?.heroSubtext ||
    "Reliable, tidy work and a professional finish for homeowners across the local area. Jason Chapman provides interior and exterior painting, decorating and tiling completed with care, attention to detail, and respect for your home.";
  const aboutHeading =
    hp?.aboutHeading || "A local tradesman who takes pride in the finish";
  const aboutText =
    hp?.aboutText ||
    "When you choose Jason Chapman, you deal directly with the person carrying out the work from the first conversation to the final tidy-up. Every job is approached with care and completed to a high standard, whether you need a room redecorated, exterior paintwork refreshed, or tiling for a kitchen or bathroom.";
  const phoneNumber = hp?.phoneNumber || "07903 197937";
  const reviewCount = hp?.mybuilderReviewCount ?? 91;
  const yearsExperience = hp?.yearsExperience ?? 20;
  const heroImageUrl =
    hp?.heroImage?.node?.sourceUrl ||
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80";
  const heroImageAlt =
    hp?.heroImage?.node?.altText || "Beautifully decorated interior living space";

  const aboutImg1 = hp?.aboutImage1?.node?.sourceUrl || "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80";
  const aboutImg1Alt = hp?.aboutImage1?.node?.altText || "Painter working on wall";
  const aboutImg2 = hp?.aboutImage2?.node?.sourceUrl || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80";
  const aboutImg2Alt = hp?.aboutImage2?.node?.altText || "Freshly painted bedroom";

  const whyChooseImg = hp?.whyChooseImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1600&q=80";
  const whyChooseImgAlt = hp?.whyChooseImage?.node?.altText || "Beautifully finished interior";

  const recentImg1 = hp?.recentWorkImage1?.node?.sourceUrl || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80";
  const recentImg1Alt = hp?.recentWorkImage1?.node?.altText || "Recently decorated interior room";
  const recentImg2 = hp?.recentWorkImage2?.node?.sourceUrl || "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80";
  const recentImg2Alt = hp?.recentWorkImage2?.node?.altText || "Tiled bathroom wall";
  const recentImg3 = hp?.recentWorkImage3?.node?.sourceUrl || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80";
  const recentImg3Alt = hp?.recentWorkImage3?.node?.altText || "Freshly tiled kitchen";

  return (
    <>
      {/* 1. Full-bleed Hero with Parallax */}
      <ParallaxHero src={heroImageUrl} alt={heroImageAlt}>
        <p className="text-sm font-semibold tracking-widest uppercase mb-4">
          Jason Chapman Tiling, Painting &amp; Decorating
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {heroHeading}
        </h1>
        <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
          {heroSubtext}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Request a quote
          </Link>
          <Link
            href={`tel:${phoneNumber.replace(/\s/g, "")}`}
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Call {phoneNumber}
          </Link>
        </div>
      </ParallaxHero>

      {/* 2. Trust Strip */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-700 font-medium">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              5/5 on MyBuilder
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>{reviewCount} reviews</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>~{yearsExperience} years&apos; experience</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              Wellington, Somerset
            </span>
          </div>
        </div>
      </section>

      {/* 3. A local tradesman who takes pride in the finish */}
      <section className="py-section-lg px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-content-lg items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {aboutHeading}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {aboutText}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden aspect-[3/4] relative">
              <Image
                src={aboutImg1}
                alt={aboutImg1Alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[3/4] relative mt-8">
              <Image
                src={aboutImg2}
                alt={aboutImg2Alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <section className="py-section px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-content-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
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
      <section className="relative py-section-lg px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Image
          src={whyChooseImg}
          alt={whyChooseImgAlt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-content-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why homeowners choose Jason
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">
              Jason is known for reliable service, tidy working and close
              attention to detail. You get direct communication, honest advice
              and a professional finish from start to finish.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-4xl mx-auto">
            {[
              "Direct, one-to-one service",
              "Clean and tidy while working",
              "Attention to detail",
              "Quality finish",
            ].map((point) => (
              <div key={point} className="text-center">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-semibold text-white">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trusted by local homeowners */}
      <section className="py-section-lg px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-content-lg">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              5/5 rated on MyBuilder — {reviewCount} reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by local homeowners
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Recent customers highlight quick and reliable quoting,
              tidy working methods, and finished work they are really pleased
              with.
            </p>
          </div>

          <ReviewsCarousel />

          <div className="text-center mt-10">
            <Link
              href={hp?.mybuilderUrl || "https://www.mybuilder.com/profile/jason_chapman_tiling_painting_decorating/reviews"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
            >
              Read all reviews on MyBuilder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Recent Work preview */}
      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-content-lg">
            Recent work
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-content-lg">
            {[
              { src: recentImg1, alt: recentImg1Alt },
              { src: recentImg2, alt: recentImg2Alt },
              { src: recentImg3, alt: recentImg3Alt },
            ].map((img) => (
              <Link key={img.alt} href="/gallery" className="group rounded-xl overflow-hidden aspect-[4/3] relative block">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white font-bold text-sm bg-primary px-5 py-2.5 rounded-lg">
                    View Project
                  </span>
                </div>
              </Link>
            ))}
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
      <section className="py-section px-4 sm:px-6 lg:px-8 bg-white">
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
      <section className="py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-content-lg">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-gutter max-w-4xl mx-auto">
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
      <section className="py-section px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-content-lg">
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
                answer: `Call ${phoneNumber} or use the contact form with a few details about the job.`,
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
      <section className="bg-primary text-white py-section px-4 sm:px-6 lg:px-8">
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
