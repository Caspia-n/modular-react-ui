'use client';

import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { GridProvider } from '@/context/GridContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <GridProvider>
        {children}
      </GridProvider>
    </HeroUIProvider>
  );
}
