import { Locale } from './i18n-config'; // Import Locale type from config

export interface Location {
  id: string;
  name: Record<Locale, string>;
  slug: Record<Locale, string>;
  county?: Record<Locale, string>; // Optional county info
  keywords: Record<Locale, string[]>;
}

// Helper function to generate keywords (slug parameter removed)
const generateKeywords = (name: string): Record<Locale, string[]> => {
  const nameEs = name; // Assuming Spanish name is the same for these locations
  return {
    en: [`sell house ${name}`, `cash offer ${name}`, `buy my house ${name}`, `fast sale ${name}`],
    es: [`vender casa ${nameEs}`, `oferta efectivo ${nameEs}`, `comprar mi casa ${nameEs}`, `venta rápida ${nameEs}`],
  };
};

export const locations: Location[] = [
  {
    id: 'elk-grove',
    name: { en: 'Elk Grove, CA', es: 'Elk Grove, CA' },
    slug: { en: 'elk-grove-ca', es: 'elk-grove-ca' },
    county: { en: 'Sacramento County', es: 'Condado de Sacramento' },
    keywords: generateKeywords('Elk Grove'), // Removed slug argument
  },
  {
    id: 'sacramento',
    name: { en: 'Sacramento, CA', es: 'Sacramento, CA' },
    slug: { en: 'sacramento-ca', es: 'sacramento-ca' },
    county: { en: 'Sacramento County', es: 'Condado de Sacramento' },
    keywords: generateKeywords('Sacramento'), // Removed slug argument
  },
  {
    id: 'rancho-cordova',
    name: { en: 'Rancho Cordova, CA', es: 'Rancho Cordova, CA' },
    slug: { en: 'rancho-cordova-ca', es: 'rancho-cordova-ca' },
    county: { en: 'Sacramento County', es: 'Condado de Sacramento' },
    keywords: generateKeywords('Rancho Cordova'), // Removed slug argument
  },
  {
    id: 'folsom',
    name: { en: 'Folsom, CA', es: 'Folsom, CA' },
    slug: { en: 'folsom-ca', es: 'folsom-ca' },
    county: { en: 'Sacramento County', es: 'Condado de Sacramento' },
    keywords: generateKeywords('Folsom'), // Removed slug argument
  },
  {
    id: 'roseville',
    name: { en: 'Roseville, CA', es: 'Roseville, CA' },
    slug: { en: 'roseville-ca', es: 'roseville-ca' },
    county: { en: 'Placer County', es: 'Condado de Placer' }, // Note: Different county
    keywords: generateKeywords('Roseville'), // Removed slug argument
  },
  {
    id: 'citrus-heights',
    name: { en: 'Citrus Heights, CA', es: 'Citrus Heights, CA' },
    slug: { en: 'citrus-heights-ca', es: 'citrus-heights-ca' },
    county: { en: 'Sacramento County', es: 'Condado de Sacramento' },
    keywords: generateKeywords('Citrus Heights'), // Removed slug argument
  },
  {
    id: 'galt',
    name: { en: 'Galt, CA', es: 'Galt, CA' },
    slug: { en: 'galt-ca', es: 'galt-ca' },
    county: { en: 'Sacramento County', es: 'Condado de Sacramento' },
    keywords: generateKeywords('Galt'), // Removed slug argument
  },
  {
    id: 'lodi',
    name: { en: 'Lodi, CA', es: 'Lodi, CA' },
    slug: { en: 'lodi-ca', es: 'lodi-ca' },
    county: { en: 'San Joaquin County', es: 'Condado de San Joaquin' }, // Note: Different county
    keywords: generateKeywords('Lodi'), // Removed slug argument
  },
  {
    id: 'stockton',
    name: { en: 'Stockton, CA', es: 'Stockton, CA' },
    slug: { en: 'stockton-ca', es: 'stockton-ca' },
    county: { en: 'San Joaquin County', es: 'Condado de San Joaquin' },
    keywords: generateKeywords('Stockton'), // Removed slug argument
  },
];

// Helper function to get a location by slug and locale
export const getLocationBySlug = (slug: string, locale: Locale): Location | undefined => {
  // Ensure locale is a valid key before accessing
  if (locale !== 'en' && locale !== 'es') return undefined;
  return locations.find(location => location.slug[locale as keyof typeof location.slug] === slug);
};