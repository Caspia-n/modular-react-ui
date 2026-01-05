'use client';

import { BlockEditorProps } from '@/lib/blocks/types';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';

export function EmbedBlockEditor({ config, onSave, onCancel }: BlockEditorProps) {
  const [embedUrl, setEmbedUrl] = useState(config.props.embedUrl || '');
  const [embedType, setEmbedType] = useState(config.props.embedType || 'youtube');

  const getPlaceholder = () => {
    switch (embedType) {
      case 'youtube':
        return 'https://www.youtube.com/embed/VIDEO_ID';
      case 'twitter':
        return '@username/status/TWEET_ID';
      case 'figma':
        return 'https://www.figma.com/embed?url=...';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface border border-subtle rounded">
      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Embed Type</label>
        <Select
          size="sm"
          selectedKeys={[embedType]}
          onSelectionChange={(keys) => setEmbedType(Array.from(keys)[0])}
        >
          <SelectItem key="youtube">YouTube</SelectItem>
          <SelectItem key="twitter">Twitter/X</SelectItem>
          <SelectItem key="figma">Figma</SelectItem>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Embed URL</label>
        <Input
          size="sm"
          value={embedUrl}
          onChange={(e) => setEmbedUrl(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full"
        />
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 text-sm text-text-muted">
        <p className="font-medium text-accent mb-1">Tips:</p>
        <ul className="text-xs list-disc list-inside space-y-1">
          {embedType === 'youtube' && (
            <li>Use the embed URL from YouTube's share menu</li>
          )}
          {embedType === 'twitter' && (
            <li>Use format: @username/status/TWEET_ID</li>
          )}
          {embedType === 'figma' && (
            <li>Generate embed link from Figma file settings</li>
          )}
        </ul>
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <Button size="sm" variant="light" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          color="primary"
          onPress={() => onSave({ props: { embedUrl, embedType } })}
        >
          Save
        </Button>
      </div>
    </div>
  );
}