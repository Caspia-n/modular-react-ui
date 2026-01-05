'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { GridItem as GridItemType } from '@/lib/grid/types';
import { itemEnterVariants } from '@/lib/utils/animations';

export interface GridItemProps {
  item: GridItemType;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onTouchEnd?: React.TouchEventHandler;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ item, onClick, children, style, className, onMouseDown, onMouseUp, onTouchEnd }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className="grid-item relative bg-surface border border-subtle rounded-md p-4 overflow-hidden h-full w-full"
          variants={itemEnterVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClick}
          style={{
            backgroundColor: item.style?.backgroundColor,
            borderColor: item.style?.borderColor,
            opacity: item.style?.opacity,
          }}
        >
          {/* Placeholder: Component content will be rendered in Task 3 */}
          {children || (
            <div className="text-text-muted text-sm">
              [{item.type}] ID: {item.id.slice(0, 8)}
            </div>
          )}
        </motion.div>
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';
