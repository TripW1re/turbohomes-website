import type { Metadata } from "next";
import Link from 'next/link'; // Import Link
import localFont from "next/font/local";
// Import config separately
import { supportedLocales, Locale, defaultLocale } from '../../lib/i18n-config'; // Added defaultLocale
// Import dictionary function (server-only)
import { getDictionary } from '../../lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import "../globals.css";
import { services } from "@/lib/services"; // Import services to link to the first one

// --- Fonts ---
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// --- Base Metadata ---
// Note: Page-specific metadata (title, description, keywords, alternates)
// should be generated in each page.tsx using generateMetadata
export const metadata: Metadata = {
  // General fallback metadata
  title: "TurboHomes - Sell Your Home Fast", // Updated title
  description: "We help homeowners sell their properties quickly and efficiently.",
  // TODO: Add metadataBase for absolute URLs in page metadata
  // metadataBase: new URL('https://www.example.com'),
};

// --- Static Params ---
export async function generateStaticParams() {
  return supportedLocales.map((locale: Locale) => ({ lang: locale }));
}

// --- Props Interface ---
interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

// --- Root Layout Component ---
export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const dictionary = await getDictionary(params.lang);
  const lang = params.lang;
  const contactSlug = dictionary.contact_page.slug;
  const firstServiceSlug = services[0]?.slug[lang as keyof typeof services[0]['slug']] ?? '#';

  // Placeholder Base URL - REPLACE WITH YOUR ACTUAL DOMAIN
  const BASE_URL = 'https://www.example.com';

  return (
    <html lang={lang}>
      <head>
        {/* Basic Hreflang tags for root layout - points to language roots */}
        {/* More specific hreflang tags should be added in page-level generateMetadata */}
        {supportedLocales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`${BASE_URL}/${locale}/`}
          />
        ))}
        {/* x-default pointing to the default language root */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${BASE_URL}/${defaultLocale}/`}
        />
        {/* Add other head elements like favicons, verification tags etc. here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        {/* Header */}
        <header className="bg-primary text-white p-4 sticky top-0 z-50 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
             <Link href={`/${lang}`} className="text-xl font-bold hover:text-accent transition-colors">
               TurboHomes {/* Updated Site Name */}
             </Link>
            <nav className="flex items-center space-x-4">
              <Link href={`/${lang}`} className="hover:text-accent transition-colors">
                {dictionary.navigation.home}
              </Link>
              <Link href={`/${lang}/${firstServiceSlug}`} className="hover:text-accent transition-colors">
                 {dictionary.navigation.services}
              </Link>
              {/* Added Blog Link */}
              <Link href={`/${lang}/blog`} className="hover:text-accent transition-colors">
                 {dictionary.navigation.blog}
              </Link>
              <Link href={`/${lang}/${contactSlug}`} className="hover:text-accent transition-colors">
                {dictionary.navigation.contact}
              </Link>
              <LanguageSwitcher />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-muted text-muted-foreground p-4 mt-auto text-center text-sm">
          {/* Removed "Footer Placeholder - " */}
          {dictionary.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          <br />
          {dictionary.footer.realtor_info}
        </footer>
      </body>
    </html>
  );
}