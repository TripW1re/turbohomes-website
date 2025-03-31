/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Disable Next.js Image Optimization for static export compatibility
  },
  // trailingSlash: true, // Optional: Consider adding trailing slashes if preferred for static hosts
};

export default nextConfig;
