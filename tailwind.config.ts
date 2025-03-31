import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Keep in case pages dir is used later
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005f73',        // Deep teal/blue
        secondary: '#e9d8a6',      // Warm beige/gold
        accent: '#ee9b00',         // Vibrant orange/gold
        background: '#ffffff',     // White
        foreground: '#0a0a0a',     // Near black
        muted: '#f8f9fa',          // Very light gray
        'muted-foreground': '#6c757d', // Standard gray
      },
      // If using Geist fonts (already in app/fonts), ensure they are applied in globals.css or layout
      // fontFamily: {
      //   sans: ['var(--font-geist-sans)'],
      //   mono: ['var(--font-geist-mono)'],
      // }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add typography plugin
  ],
};
export default config;
