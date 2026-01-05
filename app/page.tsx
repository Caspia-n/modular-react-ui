'use client';

import { GridCanvas } from '@/components/Grid/GridCanvas';
import { useState } from 'react';
import { useGrid } from '@/context/GridContext';
import { Button } from '@heroui/react';
import { generateId } from '@/lib/utils/id';

function GridTestControls() {
  const { state, dispatch } = useGrid();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addTextBlock = () => {
    const newItem = {
      id: generateId(),
      type: 'text',
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      content: { text: 'Click to edit text, right-click for menu', fontSize: 18, fontWeight: 'normal', textAlign: 'left' },
      style: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const addMediaBlock = () => {
    const newItem = {
      id: generateId(),
      type: 'media',
      x: 5,
      y: 0,
      w: 4,
      h: 4,
      content: { src: '', mediaType: 'image' },
      style: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const addEmbedBlock = () => {
    const newItem = {
      id: generateId(),
      type: 'embed',
      x: 0,
      y: 4,
      w: 6,
      h: 4,
      content: { embedUrl: '', embedType: 'youtube' },
      style: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-50 flex gap-2 bg-surface p-2 rounded border border-subtle">
        <Button size="sm" color="primary" onPress={addTextBlock}>
          + Text Block
        </Button>
        <Button size="sm" color="primary" onPress={addMediaBlock}>
          + Media Block
        </Button>
        <Button size="sm" color="primary" onPress={addEmbedBlock}>
          + Embed Block
        </Button>
        <div className="text-text-muted text-sm self-center ml-2">
          Items: {state.items.length}
        </div>
      </div>
      
      <GridCanvas onItemClick={setSelectedId} />
      
      {selectedId && (
        <div 
          className="fixed bottom-4 right-4 p-3 rounded text-sm"
          style={{ 
            backgroundColor: 'var(--bg-surface)', 
            color: 'var(--text-muted)' 
          }}
        >
          Selected: {selectedId.slice(0, 12)}...
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <main className="w-full h-screen" style={{ backgroundColor: 'var(--bg-canvas)' }}>
      <GridTestControls />
    </main>
  );
}
