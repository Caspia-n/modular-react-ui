import { useEffect, useState } from 'react';
import { useGrid } from './useGrid';

export function useKeyboard() {
  const { dispatch } = useGrid();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        dispatch({ type: 'REMOVE_ITEM', payload: { id: selectedId } });
        setSelectedId(null);
      }

      if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        dispatch({ type: 'LOCK_ITEM', payload: { id: selectedId } });
      }

      if (e.key === 'u' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        dispatch({ type: 'UNLOCK_ITEM', payload: { id: selectedId } });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, dispatch]);

  return { selectedId, setSelectedId };
}
