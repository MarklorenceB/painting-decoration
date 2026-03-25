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
        whyChooseImage {
          node {
            sourceUrl
            altText
          }
        }
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

const IMG_FRAGMENT = `
  node {
    sourceUrl
    altText
  }
`;

export const AREA_PAGES_QUERY = `
  query AreaPages {
    page(id: 11, idType: DATABASE_ID) {
      areaPages {
        areaWellingtonHero { ${IMG_FRAGMENT} }
        areaWellingtonWhyChoose { ${IMG_FRAGMENT} }
        areaWellingtonImg1 { ${IMG_FRAGMENT} }
        areaWellingtonImg2 { ${IMG_FRAGMENT} }
        areaWellingtonImg3 { ${IMG_FRAGMENT} }
        areaWellingtonImg4 { ${IMG_FRAGMENT} }
        areaTauntonHero { ${IMG_FRAGMENT} }
        areaTauntonWhyChoose { ${IMG_FRAGMENT} }
        areaTauntonImg1 { ${IMG_FRAGMENT} }
        areaTauntonImg2 { ${IMG_FRAGMENT} }
        areaTauntonImg3 { ${IMG_FRAGMENT} }
        areaTauntonImg4 { ${IMG_FRAGMENT} }
        areaTivertonHero { ${IMG_FRAGMENT} }
        areaTivertonWhyChoose { ${IMG_FRAGMENT} }
        areaTivertonImg1 { ${IMG_FRAGMENT} }
        areaTivertonImg2 { ${IMG_FRAGMENT} }
        areaTivertonImg3 { ${IMG_FRAGMENT} }
        areaTivertonImg4 { ${IMG_FRAGMENT} }
        areaBridgwaterHero { ${IMG_FRAGMENT} }
        areaBridgwaterWhyChoose { ${IMG_FRAGMENT} }
        areaBridgwaterImg1 { ${IMG_FRAGMENT} }
        areaBridgwaterImg2 { ${IMG_FRAGMENT} }
        areaBridgwaterImg3 { ${IMG_FRAGMENT} }
        areaBridgwaterImg4 { ${IMG_FRAGMENT} }
        areaNorthPethertonHero { ${IMG_FRAGMENT} }
        areaNorthPethertonWhyChoose { ${IMG_FRAGMENT} }
        areaNorthPethertonImg1 { ${IMG_FRAGMENT} }
        areaNorthPethertonImg2 { ${IMG_FRAGMENT} }
        areaNorthPethertonImg3 { ${IMG_FRAGMENT} }
        areaNorthPethertonImg4 { ${IMG_FRAGMENT} }
        areaBurnhamOnSeaHero { ${IMG_FRAGMENT} }
        areaBurnhamOnSeaWhyChoose { ${IMG_FRAGMENT} }
        areaBurnhamOnSeaImg1 { ${IMG_FRAGMENT} }
        areaBurnhamOnSeaImg2 { ${IMG_FRAGMENT} }
        areaBurnhamOnSeaImg3 { ${IMG_FRAGMENT} }
        areaBurnhamOnSeaImg4 { ${IMG_FRAGMENT} }
        areaHighbridgeHero { ${IMG_FRAGMENT} }
        areaHighbridgeWhyChoose { ${IMG_FRAGMENT} }
        areaHighbridgeImg1 { ${IMG_FRAGMENT} }
        areaHighbridgeImg2 { ${IMG_FRAGMENT} }
        areaHighbridgeImg3 { ${IMG_FRAGMENT} }
        areaHighbridgeImg4 { ${IMG_FRAGMENT} }
        areaServiceInteriorImg { ${IMG_FRAGMENT} }
        areaServiceExteriorImg { ${IMG_FRAGMENT} }
        areaServiceTilingImg { ${IMG_FRAGMENT} }
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
        contactHeroImage {
          node {
            sourceUrl
            altText
          }
        }
      }
      homePage {
        phoneNumber
        mybuilderReviewCount
        mybuilderUrl
      }
    }
  }
`;
