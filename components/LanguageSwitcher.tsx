'use client' // This component needs client-side interactivity (hooks)

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Locale, supportedLocales } from '@/lib/i18n-config' // Import from config file

// Enhanced function to handle root path and language switching
const getTranslatedPath = (currentPath: string, targetLocale: Locale): string => {
  const pathSegments = currentPath.split('/').filter(Boolean); // Remove empty segments

  // If we're at the root path (/) or the root English page
  if (pathSegments.length === 0) {
    // If target is English and we're at root, stay at root for better SEO
    if (targetLocale === 'en') {
      return '/';
    }
    // Otherwise, go to the specific language path
    return `/${targetLocale}`;
  }

  // If the first segment is a locale, replace it
  if (pathSegments[0] === 'en' || pathSegments[0] === 'es') {
    // If target is English and we're switching from another language
    if (targetLocale === 'en') {
      // If there are no other segments, go to root for better SEO
      if (pathSegments.length === 1) {
        return '/';
      }
      // Otherwise, keep the path structure with English
      pathSegments[0] = targetLocale;
    } else {
      // For non-English targets, just replace the locale
      pathSegments[0] = targetLocale;
    }
  } else {
    // If the first segment is not a locale, prepend the target locale
    pathSegments.unshift(targetLocale);
  }

  // Reconstruct the path
  return `/${pathSegments.join('/')}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname()

  // Determine the current locale from the pathname
  // For root path or paths without locale prefix, default to English
  let currentLocale: Locale = 'en';

  // Extract the first path segment
  const firstSegment = pathname.split('/')[1];

  // Check if it's a valid locale
  if (firstSegment && supportedLocales.includes(firstSegment as Locale)) {
    currentLocale = firstSegment as Locale;
  }

  return (
    <div className="flex space-x-2 items-center">
      {supportedLocales.map((locale) => {
        const isActive = locale === currentLocale;
        const translatedPath = getTranslatedPath(pathname, locale);

        return (
          <Link
            key={locale}
            href={translatedPath}
            locale={locale} // Important for Next.js routing
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${isActive
                ? 'bg-accent text-white cursor-default'
                : 'text-white hover:bg-white hover:text-primary'
              }
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}