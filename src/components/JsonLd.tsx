interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://jason-chapman.vercel.app/#business",
  name: "Jason Chapman Tiling, Painting & Decorating",
  description:
    "Professional painter, decorator and tiler based in Wellington, Somerset. Interior and exterior painting, decorating, and wall & floor tiling for homes across Wellington, Taunton, Tiverton and surrounding areas.",
  url: "https://jason-chapman.vercel.app",
  telephone: "07473 124611",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wellington",
    addressRegion: "Somerset",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.9736,
    longitude: -3.2248,
  },
  areaServed: [
    { "@type": "City", name: "Wellington, Somerset" },
    { "@type": "City", name: "Taunton, Somerset" },
    { "@type": "City", name: "Tiverton, Devon" },
    { "@type": "City", name: "Bridgwater, Somerset" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  priceRange: "££",
  image: "https://jason-chapman.vercel.app/logo.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    ratingCount: "59",
    reviewCount: "59",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Painting, Decorating & Tiling Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Interior Painting & Decorating",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Interior Painting & Decorating",
              description:
                "Walls, ceilings, woodwork, wallpapering and full room refreshes with careful preparation and a professional finish.",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Exterior Painting",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Exterior Painting",
              description:
                "House walls, fascias, soffits, window frames, doors, garden walls and fences with weatherproof finishes.",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Wall & Floor Tiling",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Wall & Floor Tiling",
              description:
                "Kitchen tiling, bathroom tiling, splashbacks and floor tiling with clean lines and tidy finishing.",
            },
          },
        ],
      },
    ],
  },
};

export function serviceSchema(
  name: string,
  description: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://jason-chapman.vercel.app/#business",
      name: "Jason Chapman Tiling, Painting & Decorating",
    },
    areaServed: [
      { "@type": "City", name: "Wellington, Somerset" },
      { "@type": "City", name: "Taunton, Somerset" },
      { "@type": "City", name: "Tiverton, Devon" },
      { "@type": "City", name: "Bridgwater, Somerset" },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
      },
    },
  };
}
