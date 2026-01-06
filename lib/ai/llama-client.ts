// Client-side wrapper for server-side AI inference
export interface LlamaConfig {
  modelPath: string;
  contextSize?: number;
  threads?: number;
  gpuLayers?: number;
}

export interface InferenceOptions {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxTokens?: number;
  onToken?: (token: string) => void;
}

export class LlamaCppClient {
  private modelPath: string | null = null;

  constructor(config: LlamaConfig) {
    this.modelPath = config.modelPath;
  }

  async loadModel(onProgress?: (progress: number) => void): Promise<void> {
    if (!this.modelPath) {
      throw new Error('Model path not specified');
    }

    try {
      const response = await fetch('/api/ai/load-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelPath: this.modelPath,
          onProgress
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load model');
      }

      return;
    } catch (error) {
      throw new Error(`Failed to load model: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async infer(prompt: string, options: InferenceOptions = {}): Promise<string> {
    try {
      const response = await fetch('/api/ai/inference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Inference failed');
      }

      return result.result;
    } catch (error) {
      throw new Error(`Inference failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async isReady(): Promise<boolean> {
    try {
      const response = await fetch('/api/ai/inference');
      const result = await response.json();
      return result.isReady || false;
    } catch {
      return false;
    }
  }

  unload(): void {
    // Client-side only - server-side model management handled by API
    this.modelPath = null;
  }
}

let globalLlamaClient: LlamaCppClient | null = null;

export function createLlamaClient(config: LlamaConfig): LlamaCppClient {
  if (globalLlamaClient) return globalLlamaClient;
  globalLlamaClient = new LlamaCppClient(config);
  return globalLlamaClient;
}

export function getLlamaClient(): LlamaCppClient | null {
  return globalLlamaClient;
}