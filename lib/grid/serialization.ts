import { GridLayout } from './types';
import { validateGridState } from './validation';
import { generateId } from '../utils/id';

export function serializeLayout(layout: GridLayout): string {
  return JSON.stringify(layout, null, 2);
}

export function deserializeLayout(json: string): GridLayout | null {
  try {
    const parsed = JSON.parse(json);
    const validation = validateGridState(parsed);
    return validation.valid ? (parsed as GridLayout) : null;
  } catch (e) {
    return null;
  }
}

export function createDefaultLayout(): GridLayout {
  const now = Date.now();
  return {
    id: generateId(),
    name: 'Untitled Layout',
    version: '1.0',
    items: [],
    breakpoints: { desktop: 12, tablet: 8, mobile: 4 },
    settings: {
      snapToGrid: true,
      showGrid: false,
      gridSize: 60,
      rowHeight: 60,
      margin: [10, 10],
      containerPadding: [10, 10],
    },
    createdAt: now,
    updatedAt: now,
  };
}
