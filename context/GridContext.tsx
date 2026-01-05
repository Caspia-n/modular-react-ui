'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { GridLayout, GridAction } from '@/lib/grid/reducer';
import { gridReducer } from '@/lib/grid/reducer';
import { createDefaultLayout } from '@/lib/grid/serialization';

export interface GridContextValue {
  state: GridLayout;
  dispatch: (action: GridAction) => void;
  currentBreakpoint: 'desktop' | 'tablet' | 'mobile';
}

const GridContext = createContext<GridContextValue | null>(null);

interface GridProviderProps {
  children: ReactNode;
}

export function GridProvider({ children }: GridProviderProps) {
  const [state, dispatch] = useReducer(gridReducer, createDefaultLayout());
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Handle resize observer for breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setCurrentBreakpoint('desktop');
      } else if (width >= 768) {
        setCurrentBreakpoint('tablet');
      } else {
        setCurrentBreakpoint('mobile');
      }
    };

    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GridContext.Provider value={{ state, dispatch, currentBreakpoint }}>
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGrid must be used within GridProvider');
  return context;
}

export function useGridItem(id: string) {
  const { state } = useGrid();
  return state.items.find(item => item.id === id);
}