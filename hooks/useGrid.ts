import { useContext } from 'react';
import { GridContext } from '@/context/GridContext';

export function useGrid() {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGrid must be used within GridProvider');
  return context;
}

export function useGridItem(id: string) {
  const { state } = useGrid();
  return state.items.find(item => item.id === id);
}
