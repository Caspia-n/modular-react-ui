'use client';

import { Button, Input, Alert, Spinner } from '@heroui/react';
import { useAIModel } from '@/hooks/useAIModel';
import { useGrid } from '@/context/GridContext';
import { parseAIResponse, buildAIPrompt } from '@/lib/ai/command-parser';
import { useState } from 'react';

export function AIChat() {
  const { client, isReady, isLoading: modelLoading } = useAIModel();
  const { state, dispatch } = useGrid();
  const [prompt, setPrompt] = useState('');
  const [isInferring, setIsInferring] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSendPrompt = async () => {
    if (!client || !isReady || !prompt.trim()) return;

    setError(null);
    setIsInferring(true);
    setResponse('');

    try {
      const fullPrompt = buildAIPrompt(prompt, state);
      const result = await client.infer(fullPrompt, {
        maxTokens: 512,
        temperature: 0.7,
      });

      setResponse(result);

      // Parse and show suggestions (require approval before applying)
      const parsed = parseAIResponse(result);
      if (parsed.commands.length > 0) {
        console.log('AI suggestions:', parsed);
        // User will see suggestions and approve/reject in Task 5 UI
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsInferring(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-surface rounded border border-subtle">
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-2">AI Layout Assistant</h3>

        {!isReady && (
          <Alert color="warning" title="Model not loaded">
            Select and load a model first
          </Alert>
        )}

        {error && (
          <Alert color="danger" title="Error" className="mb-2">
            {error}
          </Alert>
        )}
      </div>

      {isReady && (
        <div className="flex flex-col gap-2">
          <Input
            size="sm"
            placeholder="Describe the layout you want..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isInferring) handleSendPrompt();
            }}
            disabled={isInferring}
            className="w-full"
          />

          <Button
            size="sm"
            color="primary"
            onPress={handleSendPrompt}
            disabled={isInferring || !prompt.trim()}
          >
            {isInferring ? (
              <>
                <Spinner size="sm" />
                Generating...
              </>
            ) : (
              'Generate Layout'
            )}
          </Button>

          {response && (
            <div className="bg-canvas rounded p-3 border border-subtle text-xs text-text-muted max-h-40 overflow-auto">
              <p className="font-medium text-text-primary mb-1">AI Response:</p>
              <pre className="whitespace-pre-wrap break-words">{response}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}