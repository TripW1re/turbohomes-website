/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Disable Next.js Image Optimization for static export compatibility
  },
  // No i18n configuration here as it's not compatible with static exports
  // Instead, we're using a root page.tsx that serves English content directly
  // and language-specific routes under [lang] for other languages
};

export default nextConfig;
