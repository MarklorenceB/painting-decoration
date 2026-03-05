"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

type Category = "all" | "painting" | "flooring" | "tiling";

const projects = [
  {
    title: "Living Room Refresh",
    description: "Full interior emulsion with feature wall in deep navy.",
    category: "painting" as const,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    title: "Hardwood Installation",
    description: "Premium European Oak with satin protective finish.",
    category: "flooring" as const,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    title: "Modern Subway Tiling",
    description: "Full bathroom regrout and new ceramic installation.",
    category: "tiling" as const,
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  },
  {
    title: "Kitchen Cabinet Facelift",
    description: "Satin finish spray painting for a factory-new look.",
    category: "painting" as const,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    title: "Commercial Vinyl",
    description: "High-durability LVT flooring for boutique office.",
    category: "flooring" as const,
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
  },
  {
    title: "Victorian Hallway",
    description: "Restoration and new geometric tile layout.",
    category: "tiling" as const,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
  },
];

const testimonials = [
  {
    text: "DecorMaster Pro completely transformed our Victorian home. Their attention to detail on the intricate molding was second to none. Reliable, clean, and highly professional.",
    name: "Sarah Jenkins",
    role: "Residential Client",
  },
  {
    text: "We used them for our new office flooring and painting. They worked through the weekend to ensure we could open on Monday. Exceptional work ethic and finish.",
    name: "Marcus Reed",
    role: "Reed & Co. Legal",
  },
  {
    text: "The bathroom tiling is flawless. They helped us choose the right grout color to match our tiles and the result is stunning. Highly recommended for any home project.",
    name: "Emma Boyd",
    role: "Residential Client",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All Projects", value: "all" },
  { label: "Painting", value: "painting" },
  { label: "Flooring", value: "flooring" },
  { label: "Tiling", value: "tiling" },
];

const categoryColors: Record<string, string> = {
  painting: "bg-primary",
  flooring: "bg-primary",
  tiling: "bg-primary",
};

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Our Project Gallery
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          Excellence in every brushstroke. Explore our recent residential and
          commercial transformations across painting, flooring, and tiling.
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

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold mt-3">What Our Clients Say</h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-background rounded-xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
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
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
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
    </>
  );
}
