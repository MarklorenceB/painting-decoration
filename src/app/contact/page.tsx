import { fetchGraphQL } from "@/lib/wordpress";
import { CONTACT_PAGE_QUERY } from "@/lib/queries";
import ContactPageClient from "./ContactPageClient";

interface ContactPageData {
  page: {
    contactPage: {
      contactHeading: string | null;
      contactSubtext: string | null;
      contactPhone: string | null;
      contactAreas: string | null;
      contactHeroImage: { node: { sourceUrl: string; altText: string } } | null;
    };
    homePage: {
      phoneNumber: string | null;
      mybuilderReviewCount: number | null;
      mybuilderUrl: string | null;
    };
  };
}

export default async function ContactPage() {
  const data = await fetchGraphQL<ContactPageData>(CONTACT_PAGE_QUERY);
  const cp = data?.page?.contactPage;
  const hp = data?.page?.homePage;

  const heading = cp?.contactHeading || "Get in touch with Jason";
  const subtext = cp?.contactSubtext || "Looking for an interior painter, decorator or tiler in Wellington, Taunton, Tiverton or the surrounding area? Get in touch to discuss your project and request a quote.";
  const phone = cp?.contactPhone || hp?.phoneNumber || "07903 197937";
  const areas = cp?.contactAreas || "Wellington, Taunton, Tiverton and surrounding areas.";
  const reviewCount = hp?.mybuilderReviewCount ?? 91;
  const mybuilderUrl = hp?.mybuilderUrl || "https://www.mybuilder.com/profile/jason_chapman_tiling_painting_decorating/reviews";
  const heroImage = cp?.contactHeroImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80";
  const heroImageAlt = cp?.contactHeroImage?.node?.altText || "Professional painting and decorating";

  return (
    <ContactPageClient
      heading={heading}
      subtext={subtext}
      phone={phone}
      areas={areas}
      reviewCount={reviewCount}
      mybuilderUrl={mybuilderUrl}
      heroImage={heroImage}
      heroImageAlt={heroImageAlt}
    />
  );
}
