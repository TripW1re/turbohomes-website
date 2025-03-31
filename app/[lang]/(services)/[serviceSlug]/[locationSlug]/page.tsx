import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Import config separately
import { supportedLocales, Locale } from '@/lib/i18n-config';
// Import dictionary function (server-only)
import { getDictionary } from '@/lib/i18n';
// Removed unused Service import
import { services, getServiceBySlug } from '@/lib/services';
// Removed unused Location import
import { locations, getLocationBySlug } from '@/lib/locations';
import Section from '@/components/Section';
import Button from '@/components/Button';
import { Card, CardContent, CardHeader } from '@/components/Card';
import { CheckCircle, MapPin, TrendingUp, HelpCircle, MessageSquare, Award } from 'lucide-react';

// Define params interface for the page
interface ServiceLocationPageProps {
  params: {
    lang: Locale;
    serviceSlug: string;
    locationSlug: string;
  };
}

// Generate static paths for all service/location combinations in all languages
export async function generateStaticParams() {
  const paths = services.flatMap((service) =>
    locations.flatMap((location) =>
      // Add explicit type Locale to the map parameter
      supportedLocales.map((locale: Locale) => ({
        lang: locale,
        // Use type assertion for indexing
        serviceSlug: service.slug[locale as keyof typeof service.slug],
        locationSlug: location.slug[locale as keyof typeof location.slug],
      }))
    )
  );
  return paths;
}

// Generate dynamic metadata based on service, location and locale
export async function generateMetadata({ params }: ServiceLocationPageProps): Promise<Metadata> {
  const { lang, serviceSlug, locationSlug } = params;
  const service = getServiceBySlug(serviceSlug, lang);
  const location = getLocationBySlug(locationSlug, lang);

  if (!service || !location) {
    return { title: 'Page Not Found' };
  }

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }
   const getLocaleStringArray = (record: Record<Locale, string[]> | undefined, locale: Locale): string[] => {
     return record?.[locale as keyof typeof record] ?? [];
  }

  const serviceName = getLocaleString(service.name, lang);
  const locationName = getLocaleString(location.name, lang);

  const title = `${serviceName} in ${locationName} | TurboHomes`;
  const description = `Need ${serviceName.toLowerCase()} services in ${locationName}? TurboHomes offers fast, fair solutions. Get your cash offer today for properties in ${locationName}.`; // Refined description

  const keywords = [
    // Add explicit type string to map parameter
    ...getLocaleStringArray(service.keywords, lang).map((kw: string) => `${kw} ${locationName}`),
    ...getLocaleStringArray(location.keywords, lang).map((kw: string) => `${serviceName} ${kw}`),
    serviceName,
    locationName,
    `TurboHomes ${locationName}`, // Added brand + location keyword
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),
  };
}

// Service + Location Page Component
export default async function ServiceLocationPage({ params }: ServiceLocationPageProps) {
  const { lang, serviceSlug, locationSlug } = params;
  const dictionary = await getDictionary(lang);
  const service = getServiceBySlug(serviceSlug, lang);
  const location = getLocationBySlug(locationSlug, lang);

  if (!service || !location) {
    notFound();
  }

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }

  const serviceName = getLocaleString(service.name, lang);
  const locationName = getLocaleString(location.name, lang);

  // --- Content Blocks ---

  const HeroBlock = () => (
    <Section className="bg-gradient-to-r from-primary to-teal-600 text-white text-center" container={false}>
      <div className="container mx-auto px-4 py-16 md:py-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {serviceName} in {locationName}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          {/* Refined Hero Subtitle */}
          Need expert help with {serviceName.toLowerCase()} for your property in {locationName}? TurboHomes provides fast, reliable solutions tailored to the {locationName} market.
        </p>
        <Button href={`/${lang}/${dictionary.contact_page.slug}?service=${serviceSlug}&location=${locationSlug}`} variant="accent" size="lg">
          Get My {locationName} {serviceName} Offer
        </Button>
      </div>
    </Section>
  );

  // *** Updated Benefits Block ***
  const BenefitsBlock = () => (
    <Section id="benefits-location">
      {/* Updated Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Key Benefits of Our {serviceName} Service in {locationName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader><h3 className="font-semibold text-lg flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary"/> Local {locationName} Expertise</h3></CardHeader>
          {/* Updated Content */}
          <CardContent><p className="text-muted-foreground">Our team has in-depth knowledge of the {locationName} real estate market. We provide fair, data-driven offers specific to {serviceName.toLowerCase()} situations in your area.</p></CardContent>
        </Card>
        <Card>
          <CardHeader><h3 className="font-semibold text-lg flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-green-600"/> Transparent Process</h3></CardHeader>
          {/* Updated Content */}
          <CardContent><p className="text-muted-foreground">Experience a clear and straightforward {serviceName.toLowerCase()} process in {locationName}. We pride ourselves on transparency with no hidden fees or commissions.</p></CardContent>
        </Card>
        <Card>
          <CardHeader><h3 className="font-semibold text-lg flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-accent"/> Fast, Guaranteed Closing</h3></CardHeader>
          {/* Updated Content */}
          <CardContent><p className="text-muted-foreground">We offer quick closings, often within 7-14 days, for {serviceName.toLowerCase()} needs in {locationName}. Sell on your timeline with certainty.</p></CardContent>
        </Card>
      </div>
    </Section>
  );

  const ProcessBlock = () => (
     <Section id="process-location" className="bg-muted">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Simple {serviceName} Process in {locationName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
             <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
             <h3 className="text-xl font-semibold mb-2">Contact Us About Your {locationName} Property</h3>
             <p className="text-muted-foreground">Fill out our quick online form or call us directly to discuss your {serviceName.toLowerCase()} situation.</p>
          </div>
           <div className="p-4">
             <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
             <h3 className="text-xl font-semibold mb-2">Receive Your Fair Cash Offer</h3>
             <p className="text-muted-foreground">We&apos;ll promptly assess your {locationName} home and present a fair, no-obligation cash offer.</p>
          </div>
           <div className="p-4">
             <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
             <h3 className="text-xl font-semibold mb-2">Close On Your Schedule</h3>
             <p className="text-muted-foreground">You choose the closing date. We handle the paperwork for your {locationName} {serviceName.toLowerCase()} sale.</p>
          </div>
        </div>
      </Section>
  );

  const ConcernsBlock = () => (
    <Section id="concerns-location">
       <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Do You Need {serviceName} Help in {locationName}? We Assist If...</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Refined placeholder concerns */}
            <li className="flex items-start space-x-3 p-4 bg-white rounded shadow">
              <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>You need to sell your {locationName} house quickly due to relocation, job change, or other life events.</span>
            </li>
             <li className="flex items-start space-x-3 p-4 bg-white rounded shadow">
              <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>Your {locationName} property requires significant repairs or updates you can&apos;t manage or afford.</span>
            </li>
             <li className="flex items-start space-x-3 p-4 bg-white rounded shadow">
              <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>You&apos;re facing potential foreclosure on your {locationName} home and need a fast solution.</span>
            </li>
             <li className="flex items-start space-x-3 p-4 bg-white rounded shadow">
              <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>You inherited a property in {locationName} and prefer a quick, hassle-free cash sale.</span>
            </li>
        </ul>
    </Section>
  );

  const TestimonialBlock = () => (
    <Section id="testimonial-location" className="bg-muted">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Hear From {locationName} Homeowners We&apos;ve Helped</h2>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center">
           <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4"/>
           <p className="text-lg italic text-muted-foreground mb-4">
             {/* Refined placeholder testimonial */}
             {`"Selling our ${locationName} house for ${serviceName.toLowerCase()} seemed daunting, but TurboHomes made it incredibly easy. They gave us a fair cash offer and closed faster than we thought possible. Highly recommend their services in ${locationName}!" (Placeholder)`}
           </p>
           <p className="font-semibold">- Satisfied Client, {locationName}</p>
        </CardContent>
      </Card>
    </Section>
  );

   const GuaranteeBlock = () => (
     <Section id="guarantee-location">
       <div className="text-center max-w-3xl mx-auto">
          <Award className="w-16 h-16 text-accent mx-auto mb-4"/>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Promise for {serviceName} in {locationName}</h2>
          <p className="text-lg text-muted-foreground mb-6">
            {/* Refined guarantee text */}
            TurboHomes is committed to providing {locationName} homeowners needing {serviceName.toLowerCase()} assistance with a fair, transparent, and stress-free selling experience. We handle the complexities, allowing you to move forward confidently.
          </p>
          <Button href={`/${lang}/${dictionary.contact_page.slug}?service=${serviceSlug}&location=${locationSlug}`} variant="primary">
            Request Your Free {locationName} Offer Today
          </Button>
       </div>
     </Section>
   );

  const FinalCTABlock = () => (
    <Section id="final-cta-location" className="bg-primary text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started with {serviceName} in {locationName} Now!</h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        {/* Refined final CTA text */}
        Don&apos;t wait! Contact TurboHomes now for your free, no-obligation cash offer for {serviceName.toLowerCase()} services for your {locationName} property.
      </p>
      <Button href={`/${lang}/${dictionary.contact_page.slug}?service=${serviceSlug}&location=${locationSlug}`} variant="accent" size="lg">
        Get My Free {locationName} Offer Now
      </Button>
    </Section>
  );

  // --- Page Render ---
  return (
    <div>
      <HeroBlock />
      <BenefitsBlock />
      <ProcessBlock />
      <ConcernsBlock />
      <TestimonialBlock />
      <GuaranteeBlock />
      <FinalCTABlock />
    </div>
  );
}