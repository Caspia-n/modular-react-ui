'use client';

import { BlockComponentProps } from '@/lib/blocks/types';
import { useState } from 'react';

export interface MediaBlockProps extends BlockComponentProps {}

export function MediaBlock({ config, isSelected, onUpdate, onDelete }: MediaBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const src = config.props.src || '';
  const mediaType = config.props.mediaType || 'image';

  const handleSourceChange = (newSrc: string) => {
    onUpdate({
      props: {
        ...config.props,
        src: newSrc,
      },
    });
  };

  if (!src && !isEditing) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-surface rounded cursor-pointer border-2 border-dashed border-subtle hover:border-accent transition-colors"
        onClick={() => setIsEditing(true)}
      >
        <div className="text-center">
          <div className="text-3xl mb-2">📷</div>
          <div className="text-text-muted text-sm">Click to add media</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full relative rounded overflow-hidden bg-surface flex items-center justify-center"
      onDoubleClick={() => setIsEditing(true)}
    >
      {mediaType === 'image' ? (
        <img src={src} alt="Media" className="w-full h-full object-cover" />
      ) : (
        <video src={src} controls className="w-full h-full object-cover" />
      )}

      {isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <input
            autoFocus
            type="text"
            className="bg-surface border border-accent rounded px-3 py-2 text-primary w-full"
            value={src}
            onChange={(e) => handleSourceChange(e.target.value)}
            placeholder="Paste image or video URL..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditing(false);
              if (e.key === 'Escape') setIsEditing(false);
            }}
            onBlur={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
}