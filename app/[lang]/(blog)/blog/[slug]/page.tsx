import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n-config';
// Removed unused getDictionary import
import Section from '@/components/Section';
// Import static blog data functions
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog-data';

// Define params interface
interface BlogPostPageProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

// Generate static paths for all blog posts in all languages
export async function generateStaticParams() {
  // Use helper function from blog-data.ts
  const paths = getAllPostSlugs();
  return paths;
}

// Generate metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Use helper function from blog-data.ts
  const post = getPostBySlug(params.slug, params.lang);

  if (!post) {
    return { title: 'Blog Post Not Found' };
  }

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }

  // TODO: Add more specific metadata (description, keywords, OpenGraph)
  return {
    title: `${getLocaleString(post.title, params.lang)} | Blog | TurboHomes`, // Updated company name
    description: getLocaleString(post.excerpt, params.lang), // Use excerpt for description
  };
}

// Blog Post Page Component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = params;
  // Use helper function from blog-data.ts
  const post = getPostBySlug(slug, lang);

  if (!post) {
    notFound(); // Trigger 404 if post not found
  }

  // Helper to safely access locale-specific data
  const getLocaleString = (record: Record<Locale, string> | undefined, locale: Locale): string => {
    return record?.[locale as keyof typeof record] ?? '';
  }

  const postTitle = getLocaleString(post.title, lang);
  const postContent = getLocaleString(post.content, lang);

  return (
    <Section>
      <article className="prose lg:prose-xl mx-auto"> {/* Using Tailwind Typography prose */}
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{postTitle}</h1>
          <p className="text-muted-foreground text-sm">
            Published on {post.date}
            {/* TODO: Add Author if available */}
          </p>
        </header>

        {/* Post Content */}
        {/* Assuming post.content is HTML fetched from API */}
        {/* Add sanitization if content source is untrusted */}
        <div dangerouslySetInnerHTML={{ __html: postContent }} />

        {/* TODO: Add social sharing buttons, related posts, etc. */}
      </article>
    </Section>
  );
}