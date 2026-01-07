'use client';

import { Button, Input, Progress, Alert } from '@heroui/react';
import { useAIModel } from '@/hooks/useAIModel';
import { useState } from 'react';

export function ModelPicker() {
  const { modelPath, isLoading, loadProgress, error, isReady, selectModel, unloadModel } = useAIModel();
  const [selectedPath, setSelectedPath] = useState('');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.gguf')) {
      // In a real app, this would use Electron IPC or file system API
      // For now, we'll assume the user provides the path directly
      console.log('Selected file:', file.name);
      alert('In a real Electron app, this would use file.path. Please use manual path input for now.');
    } else {
      alert('Please select a .gguf model file');
    }
  };

  const handleManualPathSubmit = async () => {
    if (selectedPath.trim()) {
      await selectModel(selectedPath.trim());
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface rounded border border-subtle">
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-2">AI Model</h3>
        
        {error && (
          <Alert color="danger" title="Error" className="mb-4">
            {error}
          </Alert>
        )}

        {isReady && modelPath && (
          <div className="bg-green-900/20 border border-green-500/30 rounded p-3 mb-3">
            <p className="text-sm text-green-400 font-medium">✓ Model loaded</p>
            <p className="text-xs text-text-muted mt-1">{modelPath}</p>
            <Button
              size="sm"
              variant="light"
              color="danger"
              className="mt-2"
              onPress={unloadModel}
            >
              Unload
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="mb-3">
            <p className="text-xs text-text-muted mb-2">Loading model... {loadProgress}%</p>
            <Progress value={loadProgress} className="w-full" />
          </div>
        )}

        {!isReady && !isLoading && (
          <div className="flex flex-col gap-3">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 mb-3">
              <div className="text-xs text-text-muted gap-1">
                <p className="font-medium text-accent">📥 Download Model</p>
                <p>Before using AI, download the model from HuggingFace:</p>
                <a 
                  href="https://huggingface.co/featherless-ai-quants/unsloth-Qwen2-7B-Instruct-GGUF/resolve/main/unsloth-Qwen2-7B-Instruct-Q5_K_S.gguf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline break-all"
                >
                  unsloth-Qwen2-7B-Instruct-Q5_K_S.gguf
                </a>
                <p className="text-xs">Size: ~4.3 GB (Q5_K_S quantization)</p>
              </div>
            </div>

            <div>
              <label className="text-xs text-text-muted block mb-1">Enter model file path:</label>
              <Input
                size="sm"
                placeholder="/path/to/unsloth-Qwen2-7B-Instruct-Q5_K_S.gguf"
                value={selectedPath}
                onChange={(e) => setSelectedPath(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              size="sm"
              color="primary"
              onPress={handleManualPathSubmit}
              disabled={isLoading || !selectedPath.trim()}
            >
              Load Model
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}