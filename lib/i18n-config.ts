// This file contains shared i18n configuration (types, locales)
// that can be safely imported by both Server and Client Components.

// Define and EXPORT supported locales type
export type Locale = 'en' | 'es';

// Export supported locales and default locale
export const supportedLocales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';

// You could add other shared config here, like locale labels if needed
// export const localeLabels: Record<Locale, string> = {
//   en: 'English',
//   es: 'Español',
// };