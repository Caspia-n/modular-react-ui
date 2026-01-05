'use client';

import { BlockComponentProps } from '@/lib/blocks/types';
import { useState } from 'react';

export interface EmbedBlockProps extends BlockComponentProps {}

export function EmbedBlock({ config, isSelected, onUpdate, onDelete }: EmbedBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const embedUrl = config.props.embedUrl || '';
  const embedType = config.props.embedType || 'youtube';

  const getEmbedCode = () => {
    switch (embedType) {
      case 'youtube':
        return (
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border-0"
          />
        );
      case 'twitter':
        return (
          <iframe
            width="100%"
            height="100%"
            src={`https://twitframe.com/${embedUrl}`}
            className="rounded border-0"
          />
        );
      case 'figma':
        return (
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            allowFullScreen
            className="rounded border-0"
          />
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            Unknown embed type
          </div>
        );
    }
  };

  if (!embedUrl && !isEditing) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-surface rounded cursor-pointer border-2 border-dashed border-subtle hover:border-accent transition-colors"
        onClick={() => setIsEditing(true)}
      >
        <div className="text-center">
          <div className="text-3xl mb-2">🔗</div>
          <div className="text-text-muted text-sm">Click to add embed</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full relative rounded overflow-hidden bg-surface"
      onDoubleClick={() => setIsEditing(true)}
    >
      {getEmbedCode()}

      {isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <input
            autoFocus
            type="text"
            className="bg-surface border border-accent rounded px-3 py-2 text-primary w-full"
            value={embedUrl}
            onChange={(e) =>
              onUpdate({
                props: { ...config.props, embedUrl: e.target.value },
              })
            }
            placeholder="Paste embed URL..."
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