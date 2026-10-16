import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Inline year utilities to avoid import issues during build
const CURRENT_YEAR = new Date().getFullYear();
const YEARS_ACTIVE = CURRENT_YEAR - 2023;

const meta = {
  year: CURRENT_YEAR,
  yearsActive: YEARS_ACTIVE,
  title: `Sania Machal ${CURRENT_YEAR} - Digital Marketer, Content Creator & Shayari Poet`,
  description: `Sania Machal - Professional digital marketer, content creator ${CURRENT_YEAR}. ${YEARS_ACTIVE} years of experience in digital marketing, social media, and creative content.`,
  keywords: `Sania Machal ${CURRENT_YEAR}, digital marketing ${CURRENT_YEAR}, content creator, sania machal portfolio, kaithal, haryana`,
  ogTitle: `Sania Machal ${CURRENT_YEAR} - Digital Marketer & Creator`,
  ogDescription: `Updated Portfolio ${CURRENT_YEAR} - Digital Marketer, Content Creator & Shayari Poet`,
  dateModified: `${CURRENT_YEAR}-01-01`,
};

const SITE_URL = 'https://sania-portfolio-eta.vercel.app';
const PHOTO_PATH = '/sania-machal.jpg';
const PHOTO_URL = `${SITE_URL}${PHOTO_PATH}`;

const schema = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Sania Machal',
      alternateName: 'Sania',
      url: `${SITE_URL}/`,
      image: {
        '@type': 'ImageObject',
        '@id': `${PHOTO_URL}#imageobject`,
        url: PHOTO_URL,
        contentUrl: PHOTO_URL,
        width: 720,
        height: 720,
        encodingFormat: 'image/jpeg',
        caption: 'Sania Machal - Digital Marketer, Content Creator and Shayari Poet',
        creditText: 'Sania Machal',
        copyrightNotice: 'Sania Machal',
        license: `${SITE_URL}/`,
        acquireLicensePage: `${SITE_URL}/`,
      },
      jobTitle: 'Digital Marketer, Content Creator and Shayari Poet',
      description: `Professional digital marketer, content creator, and Hindi/Urdu shayari poet. ${YEARS_ACTIVE} years active. ${15 + (CURRENT_YEAR - 2024) * 5}+ projects completed.`,
      email: 'mailto:saniamachal9@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pundri',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      knowsAbout: [
        `Digital Marketing ${CURRENT_YEAR}`,
        'Content Creation',
        'Social Media Management',
        'Video Editing',
        'Hindi Poetry',
        'Urdu Shayari',
        'SEO',
        'Meta Ads',
        'Google Ads',
      ],
      sameAs: [
        'https://github.com/saniamachal9-code',
        'https://www.linkedin.com/in/sania-machal-608b71439',
        'https://www.youtube.com/@SaniaMachal',
        'https://www.instagram.com/saniamachal',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Sania Machal Digital Marketing',
        url: `${SITE_URL}/`,
      },
      dateModified: `${CURRENT_YEAR}-01-01`,
      datePublished: '2023-01-01',
    },
    {
      '@type': 'ImageObject',
      '@id': `${PHOTO_URL}#standalone`,
      contentUrl: PHOTO_URL,
      url: PHOTO_URL,
      encodingFormat: 'image/jpeg',
      width: 720,
      height: 720,
      name: 'Sania Machal',
      caption: 'Sania Machal - Digital Marketer, Content Creator and Shayari Poet',
      description:
        'Sania Machal - Digital Marketer, Content Creator and Shayari Poet from Pundri, Kaithal, Haryana.',
      creditText: 'Sania Machal',
      copyrightNotice: 'Sania Machal',
      license: `${SITE_URL}/`,
      acquireLicensePage: `${SITE_URL}/`,
      representativeOfPage: true,
      creator: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Sania Machal',
      },
    },
  ],
};

const schemaHtml = JSON.stringify(schema, null, 2)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026');

/** Vite plugin to inject dynamic year into index.html at build time. */
function injectYearPlugin() {
  return {
    name: 'inject-year',
    transformIndexHtml(html: string) {
      return html
        .replace(/SANIA_YEAR/g, String(meta.year))
        .replace(/SANIA_YEARS_ACTIVE/g, String(meta.yearsActive))
        .replace(/SANIA_TITLE/g, meta.title)
        .replace(/SANIA_DESCRIPTION/g, meta.description)
        .replace(/SANIA_KEYWORDS/g, meta.keywords)
        .replace(/SANIA_OG_TITLE/g, meta.ogTitle)
        .replace(/SANIA_OG_DESCRIPTION/g, meta.ogDescription)
        .replace(/SANIA_OG_IMAGE/g, PHOTO_URL)
        .replace(/SANIA_SCHEMA/g, schemaHtml)
        .replace(/SANIA_DATE_MODIFIED/g, meta.dateModified);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), injectYearPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});