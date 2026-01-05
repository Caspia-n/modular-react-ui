'use client';

import { GridCanvas } from '@/components/Grid/GridCanvas';
import { useState } from 'react';
import { useGrid } from '@/context/GridContext';

function GridTestControls() {
  const { state, dispatch } = useGrid();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addTestItem = () => {
    const newItem = {
      id: `test-${Date.now()}`,
      type: 'text',
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      content: {},
      style: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  return (
    <>
      <div style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1000 }}>
        <button 
          onClick={addTestItem}
          style={{
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          Add Test Item
        </button>
        <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
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
