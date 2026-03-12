"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type Category = "all" | "decorating" | "tiling";

interface Project {
  title: string;
  description: string;
  category: string;
  image: string;
}

interface BeforeAfterProject {
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
}

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Decorating", value: "decorating" },
  { label: "Tiling", value: "tiling" },
];

export default function GalleryPageClient({
  projects,
  beforeAfterProjects = [],
}: {
  projects: Project[];
  beforeAfterProjects?: BeforeAfterProject[];
}) {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="py-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-content">
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
      <section className="pb-section-lg px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
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
                  className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-md uppercase"
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

      {/* Before & After */}
      {beforeAfterProjects.length > 0 && (
        <section className="pb-section-lg px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Before &amp; after
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Drag the slider to see the difference.
          </p>
          <div className="grid sm:grid-cols-2 gap-gutter">
            {beforeAfterProjects.map((project) => (
              <BeforeAfterSlider
                key={project.title}
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                beforeAlt={`${project.title} — before`}
                afterAlt={`${project.title} — after`}
                title={project.title}
                description={project.description}
                category={project.category}
              />
            ))}
          </div>
        </section>
      )}

      {/* MyBuilder Review Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-section-lg">
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
              Rated 5/5 on MyBuilder.
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
      <section className="pb-section-lg px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-content">Like what you see?</h2>
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
