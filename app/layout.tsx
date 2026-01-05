import type { Metadata } from 'next';

import './globals.css';
import { Providers } from './providers';
import { GridProvider } from '@/context/GridContext';

export const metadata: Metadata = {
  title: 'modular-react-ui',
  description: 'A modular editor UI built with Next.js.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        <GridProvider>
          <Providers>{children}</Providers>
        </GridProvider>
      </body>
    </html>
  );
}
