'use client';

import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { motion } from 'framer-motion';
import { useGrid } from '@/context/GridContext';
import { GridItem } from './GridItem';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface GridCanvasProps {
  onItemClick?: (id: string) => void;
}

export function GridCanvas({ onItemClick }: GridCanvasProps) {
  const { state, dispatch, currentBreakpoint } = useGrid();

  const handleLayoutChange = (newLayout: Layout[], layouts: { [key: string]: Layout[] }) => {
    // For each item in newLayout:
    // - Extract x, y, w, h
    // - Dispatch MOVE_ITEM + RESIZE_ITEM as needed
    // - Handle batch updates efficiently
    
    newLayout.forEach(layoutItem => {
      const existingItem = state.items.find(item => item.id === layoutItem.i);
      if (existingItem) {
        // Check if position changed
        if (existingItem.x !== layoutItem.x || existingItem.y !== layoutItem.y) {
          dispatch({ type: 'MOVE_ITEM', payload: { id: layoutItem.i, x: layoutItem.x, y: layoutItem.y } });
        }
        
        // Check if size changed
        if (existingItem.w !== layoutItem.w || existingItem.h !== layoutItem.h) {
          dispatch({ type: 'RESIZE_ITEM', payload: { id: layoutItem.i, w: layoutItem.w, h: layoutItem.h } });
        }
      }
    });
  };

  const handleDragStart = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    // Optional: Show visual feedback that drag started
  };

  const handleDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    // Persist the new position
    dispatch({ type: 'MOVE_ITEM', payload: { id: oldItem.i, x: newItem.x, y: newItem.y } });
  };

  const handleResizeStart = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    // Optional: Show visual feedback
  };

  const handleResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    // Persist the new size
    dispatch({ type: 'RESIZE_ITEM', payload: { id: oldItem.i, w: newItem.w, h: newItem.h } });
  };

  // Convert GridItem[] to react-grid-layout format
  const rglLayout: Layout[] = state.items.map(item => ({
    i: item.id,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    static: item.locked || false,
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveGridLayout
        className="grid-canvas"
        breakpoints={{ desktop: 1200, tablet: 768, mobile: 0 }}
        cols={{ desktop: 12, tablet: 8, mobile: 4 }}
        rowHeight={60}
        layouts={{
          desktop: rglLayout,
          tablet: rglLayout, // TODO: Store breakpoint-specific layouts
          mobile: rglLayout,
        }}
        onLayoutChange={handleLayoutChange}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        onResizeStart={handleResizeStart}
        onResizeStop={handleResizeStop}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
        useCSSTransforms={true}
        measureBeforeMount={false}
      >
        {state.items.map(item => (
          <GridItem
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}