export const HOME_PAGE_QUERY = `
  query HomePage {
    page(id: 11, idType: DATABASE_ID) {
      homePage {
        heroHeading
        heroSubtext
        heroImage {
          node {
            sourceUrl
            altText
          }
        }
        aboutHeading
        aboutText
        aboutImage1 {
          node {
            sourceUrl
            altText
          }
        }
        aboutImage2 {
          node {
            sourceUrl
            altText
          }
        }
        aboutImage3 {
          node {
            sourceUrl
            altText
          }
        }
        aboutImage4 {
          node {
            sourceUrl
            altText
          }
        }
        phoneNumber
        mybuilderReviewCount
        mybuilderUrl
        yearsExperience
        recentWorkImage1 {
          node {
            sourceUrl
            altText
          }
        }
        recentWorkImage2 {
          node {
            sourceUrl
            altText
          }
        }
        recentWorkImage3 {
          node {
            sourceUrl
            altText
          }
        }
      }
      contactPage {
        contactPhone
        contactAreas
      }
    }
  }
`;

export const SERVICE_PAGE_QUERY = `
  query ServicePage($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      servicePage {
        serviceHeading
        serviceSubtext
        serviceHeroImage {
          node {
            sourceUrl
            altText
          }
        }
        serviceDescription
        serviceContentHeading
        serviceContentText
        serviceContentImage {
          node {
            sourceUrl
            altText
          }
        }
        serviceFeatures
        serviceCtaHeading
        serviceCtaText
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
          galleryImage {
            node {
              sourceUrl
              altText
            }
          }
          galleryCategory
          galleryDescription
        }
      }
    }
  }
`;

export const CONTACT_PAGE_QUERY = `
  query ContactPage {
    page(id: 11, idType: DATABASE_ID) {
      contactPage {
        contactHeading
        contactSubtext
        contactPhone
        contactAreas
      }
      homePage {
        phoneNumber
        mybuilderReviewCount
        mybuilderUrl
      }
    }
  }
`;
