'use client';

import { BlockComponentProps } from '@/lib/blocks/types';
import { useState } from 'react';

export interface TextBlockProps extends BlockComponentProps {}

export function TextBlock({ config, isSelected, onUpdate, onDelete }: TextBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const text = config.props.text || '';
  const fontSize = config.props.fontSize || 16;
  const fontWeight = config.props.fontWeight || 'normal';
  const textAlign = config.props.textAlign || 'left';

  const handleTextChange = (newText: string) => {
    onUpdate({
      props: {
        ...config.props,
        text: newText,
      },
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    onUpdate({
      props: {
        ...config.props,
        [key]: value,
      },
    });
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 rounded cursor-text overflow-auto"
      style={{ textAlign: textAlign as any }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <textarea
          autoFocus
          className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-inherit"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight as any,
          }}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <span
          className="w-full break-words select-none"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight as any,
            color: 'var(--text-primary)',
          }}
        >
          {text || '[Empty text block]'}
        </span>
      )}
    </div>
  );
}