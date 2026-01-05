'use client';

import { BlockEditorProps } from '@/lib/blocks/types';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';

export function MediaBlockEditor({ config, onSave, onCancel }: BlockEditorProps) {
  const [src, setSrc] = useState(config.props.src || '');
  const [mediaType, setMediaType] = useState(config.props.mediaType || 'image');

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface border border-subtle rounded">
      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Media URL</label>
        <Input
          size="sm"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full"
        />
        <p className="text-xs text-text-muted mt-1">
          Paste direct URL to image or video file
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Media Type</label>
        <Select
          size="sm"
          selectedKeys={[mediaType]}
          onSelectionChange={(keys) => setMediaType(Array.from(keys)[0])}
        >
          <SelectItem key="image">Image</SelectItem>
          <SelectItem key="video">Video</SelectItem>
        </Select>
      </div>

      {src && (
        <div className="bg-surface rounded p-2 border border-subtle">
          <p className="text-xs text-text-muted mb-2">Preview:</p>
          {mediaType === 'image' ? (
            <img src={src} alt="Preview" className="w-full h-auto rounded max-h-40 object-cover" />
          ) : (
            <video src={src} controls className="w-full h-auto rounded max-h-40" />
          )}
        </div>
      )}

      <div className="flex gap-2 justify-end mt-4">
        <Button size="sm" variant="light" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          color="primary"
          onPress={() => onSave({ props: { src, mediaType } })}
        >
          Save
        </Button>
      </div>
    </div>
  );
}