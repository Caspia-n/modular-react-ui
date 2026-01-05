import { GridLayout, GridItem } from './types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateAddItem(item: GridItem, state: GridLayout): ValidationResult {
  const errors: string[] = [];

  // Check bounds: 0 <= x, y < grid size
  if (item.x < 0 || item.y < 0) {
    errors.push('Position cannot be negative');
  }

  // Check dimensions: w, h >= 1
  if (item.w < 1 || item.h < 1) {
    errors.push('Width and height must be at least 1');
  }

  // Check uniqueness: id not already in items
  if (state.items.some(existingItem => existingItem.id === item.id)) {
    errors.push('Item ID must be unique');
  }

  // Check item fits within grid columns
  const maxCols = Math.max(...Object.values(state.breakpoints));
  if (item.x + item.w > maxCols) {
    errors.push('Item extends beyond grid width');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateMoveItem(id: string, x: number, y: number, state: GridLayout): ValidationResult {
  const errors: string[] = [];

  // Check item exists
  const item = state.items.find(item => item.id === id);
  if (!item) {
    errors.push('Item does not exist');
    return { valid: false, errors };
  }

  // Check bounds
  if (x < 0 || y < 0) {
    errors.push('Position cannot be negative');
  }

  // Check item fits within grid columns
  const maxCols = Math.max(...Object.values(state.breakpoints));
  if (x + item.w > maxCols) {
    errors.push('Item extends beyond grid width');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateResizeItem(id: string, w: number, h: number, state: GridLayout): ValidationResult {
  const errors: string[] = [];

  // Check item exists
  const item = state.items.find(item => item.id === id);
  if (!item) {
    errors.push('Item does not exist');
    return { valid: false, errors };
  }

  // Check dimensions meet constraints
  if (w < 1 || h < 1) {
    errors.push('Width and height must be at least 1');
  }

  // Check item fits within grid columns
  const maxCols = Math.max(...Object.values(state.breakpoints));
  if (item.x + w > maxCols) {
    errors.push('Resized item extends beyond grid width');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export const validateGridState = (layout: GridLayout): ValidationResult => {
  const errors: string[] = [];

  // Ensure items array is valid
  if (!Array.isArray(layout.items)) {
    errors.push('Items must be an array');
    return { valid: false, errors };
  }

  // Check all IDs are unique
  const ids = layout.items.map(item => item.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    errors.push('All item IDs must be unique');
  }

  // Check all items have required fields
  for (const item of layout.items) {
    if (!item.id || !item.type || typeof item.x !== 'number' || typeof item.y !== 'number' || 
        typeof item.w !== 'number' || typeof item.h !== 'number') {
      errors.push(`Item ${item.id || 'unknown'} is missing required fields`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};