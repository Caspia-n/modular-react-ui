'use client';

import { Button } from '@heroui/react';
import { GridItem } from '@/lib/grid/types';

export interface BlockContextMenuProps {
  item: GridItem;
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onLock: () => void;
  onUnlock: () => void;
  onClose: () => void;
}

export function BlockContextMenu({
  item,
  isOpen,
  onEdit,
  onDelete,
  onLock,
  onUnlock,
  onClose,
}: BlockContextMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-1 right-1 bg-surface border border-subtle rounded-md shadow-lg z-50 p-1 min-w-32">
      <Button
        variant="light"
        size="sm"
        className="w-full justify-start"
        onPress={() => {
          onEdit();
          onClose();
        }}
      >
        ✏️ Edit
      </Button>
      <Button
        variant="light"
        size="sm"
        className="w-full justify-start"
        onPress={() => {
          if (item.locked) {
            onUnlock();
          } else {
            onLock();
          }
          onClose();
        }}
      >
        {item.locked ? '🔓 Unlock' : '🔒 Lock'}
      </Button>
      <Button
        variant="light"
        size="sm"
        className="w-full justify-start text-red-500"
        onPress={() => {
          onDelete();
          onClose();
        }}
      >
        🗑️ Delete
      </Button>
    </div>
  );
}