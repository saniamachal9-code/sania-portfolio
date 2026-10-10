/**
 * Year utilities for dynamic year injection at build time.
 * These values are baked into the HTML at build via Vite's transformIndexHtml.
 * Re-deploy on 1 Jan (or via Vercel cron) to update the year.
 */

export const getCurrentYear = (): number => new Date().getFullYear();

export const getYearlyMetadata = () => {
  const year = getCurrentYear();
  const yearsActive = year - 2023; // started 2023

  return {
    year,
    yearsActive,
    title: `Sania Machal ${year} - Digital Marketer, Content Creator & Shayari Poet`,
    description: `Sania Machal - Professional digital marketer, content creator ${year}. ${yearsActive} years of experience in digital marketing, social media, and creative content.`,
    keywords: `Sania Machal ${year}, digital marketing ${year}, content creator, sania machal portfolio, kaithal, haryana`,
    ogTitle: `Sania Machal ${year} - Digital Marketer & Creator`,
    ogDescription: `Updated Portfolio ${year} - Digital Marketer, Content Creator & Shayari Poet`,
    schemaDescription: `Digital Marketer & Content Creator | Updated ${year}`,
    dateModified: `${year}-01-01`,
  };
};

export const getYearlyStatistics = () => {
  const year = getCurrentYear();

  return {
    year,
    yearsActive: year - 2023,
    projectsCompleted: 15 + (year - 2024) * 5, // +5 projects/year from 2024
    clientsSatisfied: 50 + (year - 2024) * 10, // +10 clients/year from 2024
    contentCreated: 200 + (year - 2024) * 100, // +100 content pieces/year from 2024
  };
};

/**
 * Schema markup with dynamic year - injected at build time.
 */
export const getPersonSchema = () => {
  const { year, dateModified, title, description, ogTitle, ogDescription } = getYearlyMetadata();
  const { yearsActive, projectsCompleted, clientsSatisfied, contentCreated } = getYearlyStatistics();

  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: 'Sania Machal',
    alternateName: 'Sania',
    url: 'https://sania-portfolio.vercel.app/',
    image: `https://sania-portfolio.vercel.app/og-image-${year}.png`,
    jobTitle: 'Digital Marketer & Content Creator',
    description: `Professional digital marketer, content creator, and Hindi/Urdu shayari poet. ${yearsActive} years active. ${projectsCompleted}+ projects completed.`,
    email: 'mailto:saniamachal9@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pundri',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    knowsAbout: [
      `Digital Marketing ${year}`,
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
      'https://www.youtube.com/@SaniaMachal',
      'https://www.linkedin.com/in/saniamachal',
      'https://www.instagram.com/saniamachal',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Sania Machal Digital Marketing',
      url: 'https://sania-portfolio.vercel.app/',
    },
    dateModified,
    datePublished: '2023-01-01',
  };
};