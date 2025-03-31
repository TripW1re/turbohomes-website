import { Metadata } from 'next';
// Import config separately
import { supportedLocales, Locale } from '@/lib/i18n-config';
// Import dictionary function (server-only)
import { getDictionary } from '@/lib/i18n';
import Section from '@/components/Section';
import { Card, CardContent, CardHeader } from '@/components/Card';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react'; // Added Calendar icon
import Button from '@/components/Button'; // Import Button

// Define params interface for the page (only lang is needed now)
interface ContactPageProps {
  params: {
    lang: Locale;
  };
}

// Generate static paths for /en/contact and /es/contact
// No longer need contactSlug param as it's handled by the directory name
export async function generateStaticParams() {
  // Add explicit type Locale to the map parameter
  return supportedLocales.map((locale: Locale) => ({
    lang: locale,
  }));
}

// Generate dynamic metadata based on locale
export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.contact_page.title,
    description: dictionary.contact_page.description,
    // Add canonical URL etc. later
  };
}

// Contact Page Component
export default async function ContactPage({ params }: ContactPageProps) {
  const dictionary = await getDictionary(params.lang);

  // Contact details
  const contactDetails = {
    phone: '916-690-3334',
    email: 'ravneel_pratap@live.com',
    address: '2603 Camino Ramon, Suite 200, San Ramon, CA 94583',
    license: 'REALTOR® | DRE: 02156944 | eXp Realty of California Inc',
    calendarLink: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3KpegfmjkBxjxd4uh0ieqeODnYQhNAfBLY8gC_auvKZJ5o5pZQrhykBzLJV701dpDRSQw1hcsQ',
  };

  return (
    <Section>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {dictionary.contact_page.heading}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary">Our Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <a href={`tel:${contactDetails.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {contactDetails.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <a href={`mailto:${contactDetails.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {contactDetails.email}
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Office Address</p>
                <p className="text-muted-foreground">{contactDetails.address}</p>
                {/* TODO: Add Google Map Embed Here */}
              </div>
            </div>
             <div className="pt-4 border-t border-gray-200">
                 <p className="text-sm text-muted-foreground">{contactDetails.license}</p>
             </div>
          </CardContent>
        </Card>

        {/* Schedule Appointment Card */}
        <Card>
           <CardHeader>
             <h2 className="text-2xl font-semibold text-primary">Schedule an Appointment</h2>
           </CardHeader>
           <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
              <Calendar className="w-16 h-16 text-primary mb-4" />
              <p className="text-muted-foreground">
                Ready to discuss your property? Schedule a free, no-obligation consultation call at your convenience.
              </p>
              <Button
                href={contactDetails.calendarLink}
                target="_blank" // Open in new tab
                rel="noopener noreferrer"
                variant="accent"
                size="lg"
                className="inline-flex items-center"
              >
                 <Calendar className="w-5 h-5 mr-2" />
                 Book Your Call Now
              </Button>
           </CardContent>
        </Card>
      </div>
    </Section>
  );
}