export const HOME_PAGE_QUERY = `
  query HomePage {
    page(id: "/", idType: URI) {
      homePage {
        heroImage {
          sourceUrl
          altText
        }
        heroHeading
        heroSubtext
      }
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    page(id: "site-settings", idType: URI) {
      siteSettings {
        phoneNumber
        mybuilderReviewCount
        mybuilderUrl
        yearsExperience
      }
    }
  }
`;

export const GALLERY_QUERY = `
  query GalleryItems {
    galleryItems(first: 20) {
      nodes {
        title
        galleryFields {
          projectImage {
            sourceUrl
            altText
          }
          projectCategory
        }
      }
    }
  }
`;
