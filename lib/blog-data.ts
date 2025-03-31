import { Locale } from './i18n-config';

export interface BlogPost {
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  date: string;
  excerpt: Record<Locale, string>;
  content: Record<Locale, string>; // Store as simple HTML string for now
}

export const blogPosts: BlogPost[] = [
  {
    slug: { en: 'how-to-sell-inherited-property-fast', es: 'como-vender-propiedad-heredada-rapido' },
    title: { en: 'How to Sell Inherited Property Fast', es: 'Cómo Vender una Propiedad Heredada Rápidamente' },
    date: '2025-03-31', // Use current date as placeholder
    excerpt: {
      en: 'Inheriting property involves legal steps like probate. Selling fast often means selling "as-is" to cash buyers to avoid repairs and delays. Understand the process and tax implications.',
      es: 'Heredar una propiedad implica pasos legales como la sucesión. Vender rápido a menudo significa vender "tal como está" a compradores en efectivo para evitar reparaciones y demoras. Comprenda el proceso y las implicaciones fiscales.',
    },
    content: {
      en: `<p>Selling an inherited property quickly requires understanding the process. First, determine ownership through probate court or trust documents. Agree with any other heirs on the decision to sell.</p><p>To expedite the sale, consider selling the property "as-is" to a cash buyer like TurboHomes. This avoids costly repairs and lengthy listing processes. Be aware of tax implications, such as capital gains tax (though the "step-up in basis" often minimizes this) and potential inheritance taxes.</p><p>Working with professionals experienced in inherited property sales can streamline the process significantly.</p>`,
      es: `<p>Vender una propiedad heredada rápidamente requiere comprender el proceso. Primero, determine la propiedad a través del tribunal de sucesiones o documentos de fideicomiso. Póngase de acuerdo con otros herederos sobre la decisión de vender.</p><p>Para acelerar la venta, considere vender la propiedad "tal como está" a un comprador en efectivo como TurboHomes. Esto evita reparaciones costosas y largos procesos de listado. Tenga en cuenta las implicaciones fiscales, como el impuesto sobre las ganancias de capital (aunque el "step-up in basis" a menudo lo minimiza) y los posibles impuestos sobre la herencia.</p><p>Trabajar con profesionales con experiencia en ventas de propiedades heredadas puede agilizar significativamente el proceso.</p>`,
    },
  },
  {
    slug: { en: 'short-sale-process-explained', es: 'proceso-venta-corta-explicado' },
    title: { en: 'Short Sale Process Explained', es: 'Proceso de Venta Corta (Short Sale) Explicado' },
    date: '2025-03-31',
    excerpt: {
      en: 'A short sale allows selling a home for less than the mortgage owed, avoiding foreclosure. It requires lender approval and involves specific steps.',
      es: 'Una venta corta permite vender una casa por menos de la hipoteca adeudada, evitando la ejecución hipotecaria. Requiere la aprobación del prestamista e implica pasos específicos.',
    },
    content: {
      en: `<p>A short sale occurs when a lender agrees to accept less than the full mortgage balance owed by the homeowner through the sale of the property. It's an alternative to foreclosure.</p><h4>Key Steps:</h4><ol><li><strong>Hardship Documentation:</strong> You'll need to prove financial hardship to your lender (e.g., job loss, medical bills).</li><li><strong>Lender Approval:</strong> The lender must agree to the short sale; this is not guaranteed.</li><li><strong>Listing the Property:</strong> Work with a real estate agent experienced in short sales.</li><li><strong>Offer Submission:</strong> Submit buyer offers to the lender for review and approval. This step can take time.</li><li><strong>Closing:</strong> Once approved, the sale proceeds like a traditional sale, but the lender receives the funds.</li></ol><p>While a short sale negatively impacts credit less than a foreclosure, it's still a significant event. Consult with professionals for guidance.</p>`,
      es: `<p>Una venta corta ocurre cuando un prestamista acepta recibir menos del saldo total de la hipoteca adeudado por el propietario a través de la venta de la propiedad. Es una alternativa a la ejecución hipotecaria.</p><h4>Pasos Clave:</h4><ol><li><strong>Documentación de Dificultades:</strong> Deberá demostrar dificultades financieras a su prestamista (por ejemplo, pérdida de empleo, facturas médicas).</li><li><strong>Aprobación del Prestamista:</strong> El prestamista debe aceptar la venta corta; esto no está garantizado.</li><li><strong>Listado de la Propiedad:</strong> Trabaje con un agente de bienes raíces con experiencia en ventas cortas.</li><li><strong>Presentación de Ofertas:</strong> Presente las ofertas de los compradores al prestamista para su revisión y aprobación. Este paso puede llevar tiempo.</li><li><strong>Cierre:</strong> Una vez aprobada, la venta procede como una venta tradicional, pero el prestamista recibe los fondos.</li></ol><p>Aunque una venta corta impacta negativamente el crédito menos que una ejecución hipotecaria, sigue siendo un evento significativo. Consulte con profesionales para obtener orientación.</p>`,
    },
  },
  {
    slug: { en: 'selling-distressed-home-as-is', es: 'vender-casa-dificultades-tal-como-esta' },
    title: { en: 'Selling a Distressed Home As-Is', es: 'Vender una Casa en Dificultades "Tal Como Está"' },
    date: '2025-03-31',
    excerpt: {
      en: 'Selling "as-is" means the buyer accepts the property in its current condition. This is common for distressed homes needing repairs or facing foreclosure.',
      es: 'Vender "tal como está" significa que el comprador acepta la propiedad en su condición actual. Esto es común para casas en dificultades que necesitan reparaciones o enfrentan ejecución hipotecaria.',
    },
    content: {
      en: `<p>A distressed property is often sold "as-is," meaning the seller makes no repairs before closing. Buyers, typically investors or cash buyers like TurboHomes, purchase the property knowing its condition.</p><h4>Why Sell As-Is?</h4><ul><li><strong>Speed:</strong> Avoids time-consuming and costly repairs.</li><li><strong>Convenience:</strong> Simplifies the selling process, especially if facing financial hardship or foreclosure.</li><li><strong>Certainty:</strong> Cash offers often come with fewer contingencies.</li></ul><p>Even when selling as-is, sellers must comply with state and local disclosure laws regarding known property defects. While the sale price might be lower than a renovated home, selling as-is provides a fast and straightforward solution for distressed properties.</p>`,
      es: `<p>Una propiedad en dificultades a menudo se vende "tal como está", lo que significa que el vendedor no realiza reparaciones antes del cierre. Los compradores, generalmente inversores o compradores en efectivo como TurboHomes, compran la propiedad conociendo su condición.</p><h4>¿Por Qué Vender Tal Como Está?</h4><ul><li><strong>Rapidez:</strong> Evita reparaciones costosas y que consumen mucho tiempo.</li><li><strong>Conveniencia:</strong> Simplifica el proceso de venta, especialmente si enfrenta dificultades financieras o ejecución hipotecaria.</li><li><strong>Certeza:</strong> Las ofertas en efectivo a menudo tienen menos contingencias.</li></ul><p>Incluso al vender tal como está, los vendedores deben cumplir con las leyes de divulgación estatales y locales sobre defectos conocidos de la propiedad. Si bien el precio de venta puede ser más bajo que el de una casa renovada, vender tal como está proporciona una solución rápida y directa para propiedades en dificultades.</p>`,
    },
  },
];

// Helper function to get all slugs for generateStaticParams
export const getAllPostSlugs = (): { lang: Locale; slug: string }[] => {
  return blogPosts.flatMap(post =>
    (Object.keys(post.slug) as Locale[]).map(locale => ({
      lang: locale,
      slug: post.slug[locale]
    }))
  );
};

// Helper function to get a single post by slug and locale
export const getPostBySlug = (slug: string, locale: Locale): BlogPost | undefined => {
  // Ensure locale is a valid key before accessing
  if (locale !== 'en' && locale !== 'es') return undefined;
  return blogPosts.find(post => post.slug[locale as keyof typeof post.slug] === slug);
};