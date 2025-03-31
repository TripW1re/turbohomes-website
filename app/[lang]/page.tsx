import { Metadata } from 'next';
import { Locale } from '@/lib/i18n-config'; // Import Locale from config
import { getDictionary } from '@/lib/i18n'; // Import dictionary function
import Section from '@/components/Section';
import Button from '@/components/Button';
import { Card, CardContent, CardHeader } from '@/components/Card';
import { services } from '@/lib/services';
// Removed unused Link import
import HouseIcon from '@/components/icons/HouseIcon';

// Define params interface for the page
interface HomePageProps {
  params: { lang: Locale };
}

// Generate dynamic metadata based on locale
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.homepage.title,
    description: dictionary.homepage.description,
    // Add more metadata like OpenGraph, keywords etc. later
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const dictionary = await getDictionary(params.lang);
  const lang = params.lang; // For constructing links

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-r from-primary to-teal-600 text-white text-center" container={false}>
         <div className="container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {dictionary.homepage.hero_title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              {dictionary.homepage.hero_subtitle}
            </p>
            {/* Use contact slug from dictionary for the link */}
            <Button href={`/${lang}/${dictionary.contact_page.slug}`} variant="accent" size="lg">
              {dictionary.homepage.cta_button}
            </Button>
         </div>
      </Section>

      {/* Services Overview Section */}
      <Section id="services">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => ( // Show first 3 services for brevity
            <Card key={service.id}>
              <CardHeader>
                <h3 className="text-xl font-semibold text-primary flex items-center">
                  <HouseIcon className="w-6 h-6 mr-2 text-primary" /> {/* Example Icon */}
                  {getLocaleString(service.name, lang)}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{getLocaleString(service.description, lang)}</p>
                <Button href={`/${lang}/${getLocaleString(service.slug, lang)}`} variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* TODO: Add link to a dedicated services page if needed */}
      </Section>

      {/* How it Works Section (Placeholder) */}
      <Section id="how-it-works" className="bg-muted">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Placeholder Steps */}
          <div className="p-4">
             <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
             <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
             <p className="text-muted-foreground">Fill out our simple form or give us a call.</p>
          </div>
           <div className="p-4">
             <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
             <h3 className="text-xl font-semibold mb-2">Get Your Offer</h3>
             {/* Escaped single quote */}
             <p className="text-muted-foreground">We&apos;ll assess your property and provide a fair cash offer.</p>
          </div>
           <div className="p-4">
             <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
             <h3 className="text-xl font-semibold mb-2">Close Quickly</h3>
             <p className="text-muted-foreground">Choose your closing date and get your cash.</p>
          </div>
        </div>
      </Section>

       {/* Final CTA Section */}
       <Section id="cta" className="text-center">
         <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Sell Your Home?</h2>
         <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
           Get a no-obligation cash offer today and see how easy selling can be.
         </p>
         <Button href={`/${lang}/${dictionary.contact_page.slug}`} variant="accent" size="lg">
           {dictionary.homepage.cta_button}
         </Button>
       </Section>

    </div>
  );
}