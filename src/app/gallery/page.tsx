import { fetchGraphQL } from "@/lib/wordpress";
import { GALLERY_QUERY } from "@/lib/queries";
import GalleryPageClient from "./GalleryPageClient";

interface GalleryData {
  galleryItems: {
    nodes: Array<{
      title: string;
      galleryFields: {
        galleryImage: { node: { sourceUrl: string; altText: string } } | null;
        galleryCategory: string | null;
        galleryDescription: string | null;
      };
    }>;
  };
}

const fallbackBeforeAfter = [
  {
    title: "Living room transformation",
    description: "Tired walls and dated woodwork brought back to life with fresh paint and careful prep.",
    category: "decorating",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    title: "Bathroom tiling overhaul",
    description: "Old tiles removed and replaced with clean, modern wall tiling throughout.",
    category: "tiling",
    beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
  },
  {
    title: "Bedroom repaint",
    description: "A full bedroom redecoration — walls, ceiling and woodwork finished to a high standard.",
    category: "decorating",
    beforeImage: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
  },
  {
    title: "Kitchen floor tiling",
    description: "Worn flooring replaced with durable, neatly laid tiles for a fresh kitchen finish.",
    category: "tiling",
    beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
];

const fallbackProjects = [
  {
    title: "Living room refresh",
    description: "A clean, bright decorating job to update a busy living space.",
    category: "decorating",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    title: "Hallway and landing repaint",
    description: "Careful preparation and a durable finish for a high-traffic area.",
    category: "decorating",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
  },
  {
    title: "Bedroom redecoration",
    description: "Freshly finished walls, ceilings and woodwork for a smarter, more comfortable room.",
    category: "decorating",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
  },
  {
    title: "Kitchen splashback tiling",
    description: "Neat wall tiling to finish the kitchen cleanly and professionally.",
    category: "tiling",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  },
  {
    title: "Bathroom wall tiling",
    description: "Careful fitting and a tidy final finish for a clean, modern look.",
    category: "tiling",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
  },
  {
    title: "Floor tiling project",
    description: "Well-laid floor tiles completed to a high standard.",
    category: "tiling",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
];

export default async function GalleryPage() {
  const data = await fetchGraphQL<GalleryData>(GALLERY_QUERY);
  const nodes = data?.galleryItems?.nodes;

  let projects: Array<{
    title: string;
    description: string;
    category: string;
    image: string;
  }>;

  if (nodes && nodes.length > 0) {
    projects = nodes.map((node) => ({
      title: node.title,
      description: node.galleryFields?.galleryDescription || "",
      category: (node.galleryFields?.galleryCategory || "decorating").toLowerCase(),
      image: node.galleryFields?.galleryImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    }));
  } else {
    projects = fallbackProjects;
  }

  return <GalleryPageClient projects={projects} beforeAfterProjects={fallbackBeforeAfter} />;
}
