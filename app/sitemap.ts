import { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { locations } from '@/lib/locations';
import { blogPosts } from '@/lib/blog-data';
import { supportedLocales, Locale } from '@/lib/i18n-config';

// !! IMPORTANT: Replace this with your actual website domain !!
const BASE_URL = 'https://www.turbohomes.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  // Helper to get locale-specific slug safely
  const getLocaleSlug = (record: Record<Locale, string> | undefined, locale: Locale): string | null => {
    return record?.[locale as keyof typeof record] ?? null;
  }

  // 1. Static Pages (Home, Contact, Blog Index)
  const staticRoutes = supportedLocales.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}`, lastModified }, // Homepage
    { url: `${BASE_URL}/${locale}/contact`, lastModified }, // Contact (assuming 'contact' slug for EN) - TODO: Use dictionary slug if needed
    { url: `${BASE_URL}/${locale}/blog`, lastModified }, // Blog Index
  ]);

  // 2. Service Landing Pages
  const serviceRoutes = supportedLocales.flatMap((locale) =>
    services.map((service) => {
      const slug = getLocaleSlug(service.slug, locale);
      return slug ? { url: `${BASE_URL}/${locale}/${slug}`, lastModified } : null;
    }).filter(Boolean) as MetadataRoute.Sitemap // Filter out nulls and assert type
  );

  // 3. Service + Location Pages
  const serviceLocationRoutes = supportedLocales.flatMap((locale) =>
    services.flatMap((service) => {
      const serviceSlug = getLocaleSlug(service.slug, locale);
      if (!serviceSlug) return []; // Skip if service slug is missing for locale

      return locations.map((location) => {
        const locationSlug = getLocaleSlug(location.slug, locale);
        return locationSlug ? { url: `${BASE_URL}/${locale}/${serviceSlug}/${locationSlug}`, lastModified } : null;
      });
    }).filter(Boolean) as MetadataRoute.Sitemap // Filter out nulls and assert type
  );

  // 4. Blog Post Pages
  const blogPostRoutes = supportedLocales.flatMap((locale) =>
    blogPosts.map((post) => {
      const slug = getLocaleSlug(post.slug, locale);
      return slug ? { url: `${BASE_URL}/${locale}/blog/${slug}`, lastModified } : null;
    }).filter(Boolean) as MetadataRoute.Sitemap // Filter out nulls and assert type
  );


  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...serviceLocationRoutes,
    ...blogPostRoutes,
  ];
}