import { Locale } from './i18n-config'; // Import Locale type from config

export interface Service {
  id: string;
  name: Record<Locale, string>;
  slug: Record<Locale, string>;
  description: Record<Locale, string>; // Short description for cards/listings
  keywords: Record<Locale, string[]>;
  // icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Optional: Link to an icon component later
}

export const services: Service[] = [
  {
    id: 'foreclosure-assistance',
    name: { en: 'Foreclosure Assistance', es: 'Asistencia de Ejecución Hipotecaria' },
    slug: { en: 'foreclosure-assistance', es: 'asistencia-ejecucion-hipotecaria' },
    description: {
      en: 'Sell your home before foreclosure impacts your credit. We offer fast solutions.',
      es: 'Vende tu casa antes de que la ejecución hipotecaria afecte tu crédito. Ofrecemos soluciones rápidas.',
    },
    keywords: {
      en: ['foreclosure assistance', 'stop foreclosure', 'sell before foreclosure', 'avoid foreclosure'],
      es: ['asistencia ejecución hipotecaria', 'detener ejecución hipotecaria', 'vender antes de ejecución', 'evitar ejecución hipotecaria'],
    },
  },
  {
    id: 'short-sales',
    name: { en: 'Short Sales', es: 'Ventas Cortas (Short Sales)' },
    slug: { en: 'short-sales', es: 'ventas-cortas' },
    description: {
      en: 'Navigate the short sale process smoothly and avoid foreclosure on your property.',
      es: 'Navega el proceso de venta corta sin problemas y evita la ejecución hipotecaria de tu propiedad.',
    },
    keywords: {
      en: ['short sale help', 'short sale process', 'avoid foreclosure short sale', 'sell house short sale'],
      es: ['ayuda venta corta', 'proceso venta corta', 'evitar ejecución venta corta', 'vender casa venta corta'],
    },
  },
  {
    id: 'cash-home-sales',
    name: { en: 'Cash Home Sales', es: 'Ventas de Casas en Efectivo' },
    slug: { en: 'cash-home-sales', es: 'ventas-casas-efectivo' },
    description: {
      en: 'Get a competitive cash offer for your home within 24 hours. Fast, simple, no hassle.',
      es: 'Obtén una oferta competitiva en efectivo por tu casa en 24 horas. Rápido, simple, sin complicaciones.',
    },
    keywords: {
      en: ['cash home sales', 'cash offer home', 'sell house cash', 'get cash for house'],
      es: ['ventas casas efectivo', 'oferta efectivo casa', 'vender casa efectivo', 'obtener efectivo por casa'],
    },
  },
  {
    id: 'probate-sales',
    name: { en: 'Probate Sales', es: 'Ventas Testamentarias (Probate)' },
    slug: { en: 'probate-sales', es: 'ventas-testamentarias' },
    description: {
      en: 'Simplify the process of selling a property in probate with our hassle-free estate liquidation services.',
      es: 'Simplifica el proceso de vender una propiedad en sucesión testamentaria con nuestros servicios de liquidación de bienes sin complicaciones.',
    },
    keywords: {
      en: ['probate sales', 'sell probate property', 'estate liquidation', 'sell house in probate'],
      es: ['ventas testamentarias', 'vender propiedad testamentaria', 'liquidación de bienes', 'vender casa en sucesión'],
    },
  },
  {
    id: 'divorce-property-sales',
    name: { en: 'Divorce Property Sales', es: 'Ventas de Propiedades por Divorcio' },
    slug: { en: 'divorce-property-sales', es: 'ventas-propiedades-divorcio' },
    description: {
      en: 'Confidential and fast property sales solutions for couples going through a divorce.',
      es: 'Soluciones confidenciales y rápidas de venta de propiedades para parejas en proceso de divorcio.',
    },
    keywords: {
      en: ['divorce property sale', 'sell house during divorce', 'fast divorce sale', 'confidential property sale'],
      es: ['venta propiedad divorcio', 'vender casa durante divorcio', 'venta rápida divorcio', 'venta confidencial propiedad'],
    },
  },
  {
    id: 'inherited-homes',
    name: { en: 'Inherited Homes', es: 'Casas Heredadas' },
    slug: { en: 'inherited-homes', es: 'casas-heredadas' },
    description: {
      en: 'Easily sell inherited properties, even from out of state. We handle everything.',
      es: 'Vende fácilmente propiedades heredadas, incluso desde fuera del estado. Nos encargamos de todo.',
    },
    keywords: {
      en: ['sell inherited home', 'inherited property sale', 'sell house inheritance', 'estate sale home'],
      es: ['vender casa heredada', 'venta propiedad heredada', 'vender casa herencia', 'venta de bienes raíces herencia'],
    },
  },
  {
    id: 'distressed-homeowners',
    name: { en: 'Distressed Homeowners Solutions', es: 'Soluciones para Propietarios en Dificultades' },
    slug: { en: 'distressed-homeowners-solutions', es: 'soluciones-propietarios-dificultades' },
    description: {
      en: 'Customized options to help distressed homeowners sell their property quickly and move forward.',
      es: 'Opciones personalizadas para ayudar a propietarios en dificultades a vender su propiedad rápidamente y seguir adelante.',
    },
    keywords: {
      en: ['distressed homeowner', 'sell distressed property', 'help selling house', 'fast property solutions'],
      es: ['propietario dificultades', 'vender propiedad dificultades', 'ayuda vender casa', 'soluciones rápidas propiedad'],
    },
  },
];

// Helper function to get a service by slug and locale
export const getServiceBySlug = (slug: string, locale: Locale): Service | undefined => {
  // Ensure locale is a valid key before accessing
  if (locale !== 'en' && locale !== 'es') return undefined;
  return services.find(service => service.slug[locale as keyof typeof service.slug] === slug);
};