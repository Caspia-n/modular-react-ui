import { TextBlock } from '@/components/Blocks/TextBlock';
import { TextBlockEditor } from '@/components/Blocks/TextBlockEditor';
import { MediaBlock } from '@/components/Blocks/MediaBlock';
import { MediaBlockEditor } from '@/components/Blocks/MediaBlockEditor';
import { EmbedBlock } from '@/components/Blocks/EmbedBlock';
import { EmbedBlockEditor } from '@/components/Blocks/EmbedBlockEditor';
import { BlockDefinition } from './types';

export const blockRegistry: Record<string, BlockDefinition> = {
  text: {
    type: 'text',
    label: 'Text Block',
    icon: '📝',
    defaultProps: { text: '', fontSize: 16, fontWeight: 'normal', textAlign: 'left' },
    defaultStyle: {},
    component: TextBlock,
    editor: TextBlockEditor,
  },
  media: {
    type: 'media',
    label: 'Media (Image/Video)',
    icon: '📷',
    defaultProps: { src: '', mediaType: 'image' },
    defaultStyle: {},
    component: MediaBlock,
    editor: MediaBlockEditor,
  },
  embed: {
    type: 'embed',
    label: 'Embed (YouTube, Twitter, Figma)',
    icon: '🔗',
    defaultProps: { embedUrl: '', embedType: 'youtube' },
    defaultStyle: {},
    component: EmbedBlock,
    editor: EmbedBlockEditor,
  },
};

export function getBlockDefinition(type: string): BlockDefinition | null {
  return blockRegistry[type] || null;
}

export function getBlockComponent(type: string) {
  const def = getBlockDefinition(type);
  return def?.component || null;
}

export function getBlockEditor(type: string) {
  const def = getBlockDefinition(type);
  return def?.editor || null;
}