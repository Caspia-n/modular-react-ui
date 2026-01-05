'use client';

import { GridCanvas } from '@/components/Grid/GridCanvas';
import { useKeyboard } from '@/hooks/useKeyboard';

export default function Home() {
  const { selectedId, setSelectedId } = useKeyboard();

  return (
    <main className="w-full h-screen bg-canvas p-4">
      <GridCanvas onItemClick={setSelectedId} />
      {selectedId && (
        <div className="fixed bottom-4 right-4 bg-surface p-3 rounded text-text-muted text-sm border border-subtle">
          Selected: {selectedId.slice(0, 12)}...
        </div>
      )}
    </main>
  );
}
