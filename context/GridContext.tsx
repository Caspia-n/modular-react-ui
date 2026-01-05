'use client';

import React, { createContext, useReducer, useState, useEffect, ReactNode } from 'react';
import { GridLayout } from '@/lib/grid/types';
import { gridReducer, GridAction } from '@/lib/grid/reducer';
import { createDefaultLayout } from '@/lib/grid/serialization';
import { useResponsive } from '@/hooks/useResponsive';

export interface GridContextValue {
  state: GridLayout;
  dispatch: (action: GridAction) => void;
  currentBreakpoint: 'desktop' | 'tablet' | 'mobile';
}

export const GridContext = createContext<GridContextValue | null>(null);

export function GridProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gridReducer, createDefaultLayout());
  const breakpoint = useResponsive();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<'desktop' | 'tablet' | 'mobile'>(breakpoint);

  useEffect(() => {
    setCurrentBreakpoint(breakpoint);
    dispatch({ type: 'SET_BREAKPOINT', payload: { breakpoint } });
  }, [breakpoint]);

  return (
    <GridContext.Provider value={{ state, dispatch, currentBreakpoint }}>
      {children}
    </GridContext.Provider>
  );
}
