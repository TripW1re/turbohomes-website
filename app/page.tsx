'use client' // This component needs to run client-side for the redirect hook

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n-config'; // Import default locale

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default locale's homepage
    router.replace(`/${defaultLocale}/`);
  }, [router]);

  // Render minimal content while redirecting
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Loading...</p>
      {/* You could add a spinner component here */}
    </div>
  );
}