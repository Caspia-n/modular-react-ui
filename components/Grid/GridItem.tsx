'use client';

import { motion } from 'framer-motion';
import { GridItem as GridItemType } from '@/lib/grid/types';
import { getBlockComponent, getBlockEditor } from '@/lib/blocks/registry';
import { BlockContextMenu } from '@/components/Blocks/BlockContextMenu';
import { useState } from 'react';
import { useGrid } from '@/hooks/useGrid';

export interface GridItemProps {
  item: GridItemType;
  isSelected?: boolean;
  onClick?: () => void;
}

export function GridItem({ item, isSelected, onClick }: GridItemProps) {
  const { dispatch } = useGrid();
  const BlockComponent = getBlockComponent(item.type);
  const BlockEditor = getBlockEditor(item.type);
  const [showEditor, setShowEditor] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleUpdate = (updates: Partial<GridItemType>) => {
    if (updates.props) {
      dispatch({
        type: 'UPDATE_ITEM_CONTENT',
        payload: { id: item.id, content: updates.props },
      });
    }
    if (updates.style) {
      dispatch({
        type: 'UPDATE_ITEM_STYLE',
        payload: { id: item.id, style: updates.style },
      });
    }
  };

  const handleDelete = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
  };

  const handleLock = () => {
    dispatch({ type: 'LOCK_ITEM', payload: { id: item.id } });
    setShowContextMenu(false);
  };

  const handleUnlock = () => {
    dispatch({ type: 'UNLOCK_ITEM', payload: { id: item.id } });
    setShowContextMenu(false);
  };

  return (
    <motion.div
      key={item.id}
      className={`grid-item relative bg-surface border-2 rounded-md p-0 overflow-hidden transition-all ${
        isSelected ? 'border-accent shadow-lg shadow-accent/30' : 'border-subtle'
      } ${item.locked ? 'opacity-70 pointer-events-none' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowContextMenu(true);
      }}
      style={{
        backgroundColor: item.style?.backgroundColor,
        opacity: item.style?.opacity,
      }}
    >
      {BlockComponent ? (
        <BlockComponent
          config={{
            id: item.id,
            type: item.type as any,
            props: item.content || {},
            style: item.style || {},
          }}
          isSelected={isSelected || false}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">
          Unknown component type: {item.type}
        </div>
      )}

      <BlockContextMenu
        item={item}
        isOpen={showContextMenu}
        onEdit={() => setShowEditor(true)}
        onDelete={handleDelete}
        onLock={handleLock}
        onUnlock={handleUnlock}
        onClose={() => setShowContextMenu(false)}
      />

      {showEditor && BlockEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface border border-subtle rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-4 border-b border-subtle flex justify-between items-center">
              <h3 className="text-lg font-medium text-primary">Edit Block</h3>
              <button
                className="text-text-muted hover:text-primary"
                onClick={() => setShowEditor(false)}
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <BlockEditor
                config={{
                  id: item.id,
                  type: item.type as any,
                  props: item.content || {},
                  style: item.style || {},
                }}
                onSave={(updates) => {
                  handleUpdate(updates);
                  setShowEditor(false);
                }}
                onCancel={() => setShowEditor(false)}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}