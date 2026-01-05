'use client';

import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { useGrid } from '@/hooks/useGrid';
import { GridItem } from './GridItem';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface GridCanvasProps {
  onItemClick?: (id: string) => void;
}

export function GridCanvas({ onItemClick }: GridCanvasProps) {
  const { state, dispatch } = useGrid();

  const handleLayoutChange = (newLayout: Layout[]) => {
    // Sync state with new layout
    newLayout.forEach((l) => {
      const item = state.items.find((i) => i.id === l.i);
      if (item) {
        if (item.x !== l.x || item.y !== l.y) {
          dispatch({ type: 'MOVE_ITEM', payload: { id: l.i, x: l.x, y: l.y } });
        }
        if (item.w !== l.w || item.h !== l.h) {
          dispatch({ type: 'RESIZE_ITEM', payload: { id: l.i, w: l.w, h: l.h } });
        }
      }
    });
  };

  const handleDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    dispatch({ type: 'MOVE_ITEM', payload: { id: newItem.i, x: newItem.x, y: newItem.y } });
  };

  const handleResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    dispatch({ type: 'RESIZE_ITEM', payload: { id: newItem.i, w: newItem.w, h: newItem.h } });
  };

  // Convert GridItem[] to react-grid-layout format
  const rglLayout: Layout[] = state.items.map((item) => ({
    i: item.id,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    static: item.locked || false,
  }));

  return (
    <ResponsiveGridLayout
      className="grid-canvas"
      breakpoints={{ desktop: 1200, tablet: 768, mobile: 0 }}
      cols={{ desktop: 12, tablet: 8, mobile: 4 }}
      rowHeight={state.settings.rowHeight || 60}
      layouts={{
        desktop: rglLayout,
        tablet: rglLayout,
        mobile: rglLayout,
      }}
      onLayoutChange={handleLayoutChange}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      isDraggable={state.settings.isDraggable !== false}
      isResizable={state.settings.isResizable !== false}
      compactType="vertical"
      preventCollision={false}
      useCSSTransforms={true}
      margin={state.settings.margin}
      containerPadding={state.settings.containerPadding}
    >
      {state.items.map((item) => (
        <GridItem
          key={item.id}
          item={item}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
    </ResponsiveGridLayout>
  );
}
