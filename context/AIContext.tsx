'use client';

import { createContext, useContext } from 'react';
import { useAIModel } from '@/hooks/useAIModel';
import { LlamaCppClient } from '@/lib/ai/llama-client';

export interface AIContextValue {
  client: LlamaCppClient | null;
  isReady: boolean;
  isLoading: boolean;
  loadProgress: number;
  error: string | null;
}

export const AIContext = createContext<AIContextValue | null>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const { client, isReady, isLoading, loadProgress, error } = useAIModel();

  return (
    <AIContext.Provider value={{ client, isReady, isLoading, loadProgress, error }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within AIProvider');
  return context;
}