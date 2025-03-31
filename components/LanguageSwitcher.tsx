'use client' // This component needs client-side interactivity (hooks)

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Locale, supportedLocales } from '@/lib/i18n-config' // Import from config file

// TODO: Enhance this later with actual slug mapping from data
const getTranslatedPath = (currentPath: string, targetLocale: Locale): string => {
  const pathSegments = currentPath.split('/').filter(Boolean); // Remove empty segments

  if (pathSegments.length === 0) {
    // Root path, just switch locale
    return `/${targetLocale}`;
  }

  // Simple replacement for now, assumes slugs are the same or handled by middleware redirect
  // Replace the first segment (current locale) with the target locale
  pathSegments[0] = targetLocale;

  // Reconstruct the path
  return `/${pathSegments.join('/')}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname()

  // Determine the current locale from the pathname
  const currentLocale = pathname.split('/')[1] as Locale || 'en'; // Default to 'en' if somehow missing

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