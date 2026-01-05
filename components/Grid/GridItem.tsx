'use client';

import { motion } from 'framer-motion';
import { GridItem as GridItemType } from '@/lib/grid/types';

export interface GridItemProps {
  item: GridItemType;
  onClick?: () => void;
}

export function GridItem({ item, onClick }: GridItemProps) {
  return (
    <motion.div
      key={item.id}
      className="grid-item p-4 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        backgroundColor: item.style?.backgroundColor || 'var(--bg-surface)',
        borderColor: item.style?.borderColor || 'var(--border-subtle)',
        border: '1px solid',
        borderRadius: '0.375rem',
        opacity: item.style?.opacity || 1,
      }}
    >
      {/* Placeholder: Component content will be rendered in Task 3 */}
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        [{item.type}] ID: {item.id.slice(0, 8)}
      </div>
    </motion.div>
  );
}