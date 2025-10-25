// app/layout.tsx
import './globals.css';
import Head from 'next/head';
import React from 'react';

export const metadata = {
  title: 'Click-Clean India - Comprehensive Waste Management Platform',
  description: 'Converted from existing HTML/CSS/JS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Font Awesome CDN from your original index.html */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}