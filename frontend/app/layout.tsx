// app/layout.tsx
import './globals.css';
import Head from 'next/head';
import React from 'react';

export const metadata = {
  title: 'Click Clean - Civic Issue Reporting Platform',
  description: 'Report and track civic issues in your neighborhood for a better city.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}