import React from 'react';
import './globals.css'; // Import global styles

// Minimal root layout for the redirect page
export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> {/* Default lang, will be redirected */}
      <body>
        {children}
      </body>
    </html>
  );
}