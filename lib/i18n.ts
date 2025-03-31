import 'server-only' // Ensures this module runs only on the server
import type { Locale } from './i18n-config'; // Import Locale type from config

// Define the structure of our dictionaries (optional but good for type safety)
// You can expand this interface as you add more keys to your JSON files
interface Dictionary {
  navigation: {
    home: string;
    services: string;
    blog: string; // Added blog navigation item
    contact: string;
  };
  homepage: {
    title: string;
    description: string;
    hero_title: string;
    hero_subtitle: string;
    cta_button: string;
  };
  contact_page: {
    slug: string;
    title: string;
    description: string;
    heading: string;
  };
  footer: {
    copyright: string;
    realtor_info: string;
  };
  // Add other sections as needed (e.g., blog_page)
}

// Map locales to their dictionary import functions
// Use the Locale type imported from the config file
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
}

// Function to get the dictionary for a given locale
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Fallback to 'en' if the locale is not supported or invalid
  // We still need defaultLocale here for the fallback logic
  const { defaultLocale } = await import('./i18n-config');
  const load = dictionaries[locale] ?? dictionaries[defaultLocale];
  try {
    return await load();
  } catch (error) {
    console.error(`Failed to load dictionary for locale "${locale}":`, error);
    // Fallback to English dictionary in case of error
    const { defaultLocale: fallbackLocale } = await import('./i18n-config');
    return await dictionaries[fallbackLocale]();
  }
}

// Export the Dictionary type as well for potential use in components/pages
// Note: Locale and supportedLocales are no longer defined/exported here
export type { Dictionary };