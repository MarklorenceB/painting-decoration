"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

type Category = "all" | "decorating" | "tiling";

const projects = [
  {
    title: "Living room refresh",
    description:
      "A clean, bright decorating job to update a busy living space.",
    category: "decorating" as const,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    title: "Hallway and landing repaint",
    description:
      "Careful preparation and a durable finish for a high-traffic area.",
    category: "decorating" as const,
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
  },
  {
    title: "Bedroom redecoration",
    description:
      "Freshly finished walls, ceilings and woodwork for a smarter, more comfortable room.",
    category: "decorating" as const,
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
  },
  {
    title: "Kitchen splashback tiling",
    description:
      "Neat wall tiling to finish the kitchen cleanly and professionally.",
    category: "tiling" as const,
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  },
  {
    title: "Bathroom wall tiling",
    description:
      "Careful fitting and a tidy final finish for a clean, modern look.",
    category: "tiling" as const,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
  },
  {
    title: "Floor tiling project",
    description: "Well-laid floor tiles completed to a high standard.",
    category: "tiling" as const,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Decorating", value: "decorating" },
  { label: "Tiling", value: "tiling" },
];

const categoryColors: Record<string, string> = {
  decorating: "bg-primary",
  tiling: "bg-primary",
};

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Recent decorating and tiling work
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          Take a look at recent interior decorating and tiling projects
          completed in Wellington, Taunton, Tiverton and surrounding areas.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                active === f.value
                  ? "bg-primary text-white"
                  : "border border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <span
                  className={`absolute top-3 left-3 ${
                    categoryColors[project.category]
                  } text-white text-xs font-bold px-3 py-1 rounded-md uppercase`}
                >
                  {project.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-1">{project.title}</h3>
                <p className="text-sm text-slate-500">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MyBuilder Review Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary/5 rounded-xl p-8 md:p-10 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-lg text-slate-700 font-medium mb-4">
              Rated 5/5 on MyBuilder, with 91 reviews currently showing.
            </p>
            <a
              href="https://www.mybuilder.com/profile/jason_chapman_tiling_painting_decorating/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Read all reviews on MyBuilder
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Like what you see?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Get in touch to talk through your project and request a quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all"
          >
            Contact Jason
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
