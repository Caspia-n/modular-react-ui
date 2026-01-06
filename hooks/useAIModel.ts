import { useState, useCallback } from 'react';
import { LlamaCppClient, createLlamaClient } from '@/lib/ai/llama-client';

export interface ModelInfo {
  path: string;
  name: string;
  size?: number; // bytes
  isLoaded: boolean;
  loadProgress: number; // 0-100
}

export function useAIModel() {
  const [modelPath, setModelPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<LlamaCppClient | null>(null);

  const selectModel = useCallback(async (filePath: string) => {
    setError(null);
    setIsLoading(true);
    setLoadProgress(0);

    try {
      const newClient = createLlamaClient({ modelPath: filePath });
      await newClient.loadModel((progress) => {
        setLoadProgress(progress);
      });

      setModelPath(filePath);
      setClient(newClient);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setIsLoading(false);
    }
  }, []);

  const unloadModel = useCallback(() => {
    client?.unload();
    setClient(null);
    setModelPath(null);
    setLoadProgress(0);
  }, [client]);

  return {
    modelPath,
    isLoading,
    loadProgress,
    error,
    client,
    selectModel,
    unloadModel,
    isReady: !!client,
  };
}