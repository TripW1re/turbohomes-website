import { Metadata } from 'next';
import Link from 'next/link';
import { Locale, supportedLocales } from '@/lib/i18n-config';
// Removed unused getDictionary import
import Section from '@/components/Section';
import { Card, CardContent, CardHeader } from '@/components/Card';
import { blogPosts } from '@/lib/blog-data'; // Import static blog data

// Define params interface
interface BlogIndexPageProps {
  params: { lang: Locale };
}

// Generate static paths for the blog index page
export async function generateStaticParams() {
  return supportedLocales.map((locale: Locale) => ({
    lang: locale,
  }));
}

// Generate metadata (params not needed as title/desc are generic for now)
export async function generateMetadata(): Promise<Metadata> {
  // Dictionary might be needed here later for translated titles/desc
  // const dictionary = await getDictionary(params.lang);
  return {
    title: `Blog | TurboHomes`, // Updated company name
    description: `Latest news and insights on selling your home fast.`, // Placeholder description
  };
}

// Blog Index Page Component
export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { lang } = params;
  // Use static data directly
  const posts = blogPosts;

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }

  return (
    <Section>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {/* TODO: Add blog heading to dictionary */}
        Blog
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No blog posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const postSlug = getLocaleString(post.slug, lang);
            const postTitle = getLocaleString(post.title, lang);
            const postExcerpt = getLocaleString(post.excerpt, lang);

            // Skip rendering if slug is empty for the current language
            if (!postSlug) return null;

            return (
              <Card key={postSlug}> {/* Use localized slug as key */}
                <CardHeader>
                  <Link href={`/${lang}/blog/${postSlug}`} className="hover:text-primary">
                    <h2 className="text-xl font-semibold">{postTitle}</h2>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                  <p className="text-muted-foreground mb-4">{postExcerpt}</p>
                  <Link href={`/${lang}/blog/${postSlug}`} className="text-primary hover:underline text-sm font-medium">
                    Read More &rarr;
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </Section>
  );
}