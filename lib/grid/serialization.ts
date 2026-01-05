import { GridLayout } from './types';
import { validateGridState } from './validation';
import { generateId } from '@/lib/utils/id';

export function serializeLayout(layout: GridLayout): string {
  return JSON.stringify(layout, null, 2);
}

export function deserializeLayout(json: string): GridLayout | null {
  try {
    const parsed = JSON.parse(json);
    // Validate schema
    const validation = validateGridState(parsed);
    return validation.valid ? parsed : null;
  } catch (e) {
    return null;
  }
}

export function createDefaultLayout(): GridLayout {
  return {
    id: generateId(),
    name: 'Untitled Layout',
    version: '1.0',
    items: [],
    breakpoints: { desktop: 12, tablet: 8, mobile: 4 },
    settings: { snapToGrid: true, showGrid: false, gridSize: 60 },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}