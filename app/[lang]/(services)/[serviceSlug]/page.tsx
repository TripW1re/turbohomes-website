import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Import config separately
import { supportedLocales, Locale } from '@/lib/i18n-config';
// Import dictionary function (server-only)
import { getDictionary } from '@/lib/i18n';
import { services, getServiceBySlug, Service } from '@/lib/services';
import Section from '@/components/Section';
import Button from '@/components/Button';
// Removed unused Card imports
import { CheckCircle } from 'lucide-react'; // Example icon

// Define params interface for the page
interface ServicePageProps {
  params: {
    lang: Locale;
    serviceSlug: string;
  };
}

// Generate static paths for all services in all languages
export async function generateStaticParams() {
  const paths = services.flatMap((service) =>
    // Add explicit type Locale to the map parameter
    supportedLocales.map((locale: Locale) => ({
      lang: locale,
      // Use type assertion for indexing
      serviceSlug: service.slug[locale as keyof typeof service.slug],
    }))
  );
  return paths;
}

// Generate dynamic metadata based on service and locale
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.serviceSlug, params.lang);
  // Removed unused dictionary fetch from here

  if (!service) {
    return { title: 'Service Not Found' };
  }

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }
  const getLocaleStringArray = (record: Record<Locale, string[]> | undefined, locale: Locale): string[] => {
     return record?.[locale as keyof typeof record] ?? [];
  }

  return {
    title: `${getLocaleString(service.name, params.lang)} | TurboHomes`, // Updated company name
    description: getLocaleString(service.description, params.lang),
    keywords: getLocaleStringArray(service.keywords, params.lang),
  };
}

// Service Page Component
export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, serviceSlug } = params;
  // Fetch dictionary here as it's needed for the button link
  const dictionary = await getDictionary(lang);
  const service = getServiceBySlug(serviceSlug, lang);

  if (!service) {
    notFound();
  }

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }

  const renderServiceContent = (service: Service) => {
    const serviceName = getLocaleString(service.name, lang);
    return (
      <>
        <Section id="benefits" className="bg-muted">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Key Benefits</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <span>Benefit 1 specific to {serviceName} (e.g., Speed, Convenience).</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <span>Benefit 2 specific to {serviceName} (e.g., No Repairs, No Fees).</span>
            </li>
             <li className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <span>Benefit 3 specific to {serviceName} (e.g., Certainty, As-Is Sale).</span>
            </li>
             <li className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <span>Benefit 4 specific to {serviceName} (e.g., Flexible Timeline).</span>
            </li>
          </ul>
        </Section>

        <Section id="process">
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Process for {serviceName}</h2>
           <p className="text-center max-w-2xl mx-auto mb-8 text-muted-foreground">
             {/* Escaped single quote */}
             Our process is designed to be simple and stress-free. Here&apos;s how we help you with {serviceName.toLowerCase()}.
             (Add more detailed steps here).
           </p>
        </Section>

         <Section id="locations" className="bg-muted">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Service Areas</h2>
             <p className="text-center max-w-2xl mx-auto mb-8 text-muted-foreground">
                We offer {serviceName} services in the following areas. Click on a location to learn more.
             </p>
             <p className="text-center text-muted-foreground">(Location links coming soon)</p>
         </Section>
      </>
    );
  };


  return (
    <div>
      {/* Hero Section for the Service */}
      <Section className="bg-gradient-to-r from-primary to-teal-600 text-white text-center" container={false}>
         <div className="container mx-auto px-4 py-16 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {getLocaleString(service.name, lang)}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              {getLocaleString(service.description, lang)}
            </p>
            {/* Use contact slug from dictionary */}
            <Button href={`/${lang}/${dictionary.contact_page.slug}`} variant="accent" size="lg">
              {dictionary.homepage.cta_button}
            </Button>
         </div>
      </Section>

      {renderServiceContent(service)}

       <Section id="cta" className="text-center border-t border-gray-200">
         <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
         <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
           Contact us today for a free, no-obligation consultation about {getLocaleString(service.name, lang).toLowerCase()}.
         </p>
         {/* Use contact slug from dictionary */}
         <Button href={`/${lang}/${dictionary.contact_page.slug}`} variant="accent" size="lg">
           {dictionary.homepage.cta_button}
         </Button>
       </Section>
    </div>
  );
}