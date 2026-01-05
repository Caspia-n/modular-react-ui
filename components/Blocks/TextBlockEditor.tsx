'use client';

import { BlockEditorProps } from '@/lib/blocks/types';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';

export function TextBlockEditor({ config, onSave, onCancel }: BlockEditorProps) {
  const [text, setText] = useState(config.props.text || '');
  const [fontSize, setFontSize] = useState(config.props.fontSize || 16);
  const [fontWeight, setFontWeight] = useState(config.props.fontWeight || 'normal');
  const [textAlign, setTextAlign] = useState(config.props.textAlign || 'left');

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface border border-subtle rounded">
      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Text</label>
        <textarea
          className="w-full h-24 bg-canvas border border-subtle rounded p-2 text-primary resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text content..."
        />
      </div>

      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Font Size</label>
        <Input
          size="sm"
          type="number"
          value={fontSize.toString()}
          onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
          min={8}
          max={48}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Font Weight</label>
        <Select
          size="sm"
          selectedKeys={[fontWeight]}
          onSelectionChange={(keys) => setFontWeight(Array.from(keys)[0])}
        >
          <SelectItem key="normal">Normal</SelectItem>
          <SelectItem key="bold">Bold</SelectItem>
          <SelectItem key="500">Medium</SelectItem>
          <SelectItem key="700">Bold</SelectItem>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-text-muted mb-1 block">Text Align</label>
        <Select
          size="sm"
          selectedKeys={[textAlign]}
          onSelectionChange={(keys) => setTextAlign(Array.from(keys)[0])}
        >
          <SelectItem key="left">Left</SelectItem>
          <SelectItem key="center">Center</SelectItem>
          <SelectItem key="right">Right</SelectItem>
        </Select>
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <Button size="sm" variant="light" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          color="primary"
          onPress={() =>
            onSave({
              props: { text, fontSize, fontWeight, textAlign },
            })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
}