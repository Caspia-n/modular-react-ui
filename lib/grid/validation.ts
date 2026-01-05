import { GridLayout, GridItem } from './types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateAddItem(item: GridItem, state: GridLayout): ValidationResult {
  const errors: string[] = [];

  // Check bounds
  if (item.x < 0 || item.y < 0) {
    errors.push('Item coordinates must be non-negative');
  }

  // Check dimensions
  if (item.w <= 0 || item.h <= 0) {
    errors.push('Item width and height must be greater than zero');
  }

  // Check uniqueness
  if (state.items.some((existing) => existing.id === item.id)) {
    errors.push(`Item with ID ${item.id} already exists`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateMoveItem(id: string, x: number, y: number, state: GridLayout): ValidationResult {
  const errors: string[] = [];
  const item = state.items.find((i) => i.id === id);

  if (!item) {
    errors.push(`Item with ID ${id} not found`);
  } else {
    if (x < 0 || y < 0) {
      errors.push('Item coordinates must be non-negative');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateResizeItem(id: string, w: number, h: number, state: GridLayout): ValidationResult {
  const errors: string[] = [];
  const item = state.items.find((i) => i.id === id);

  if (!item) {
    errors.push(`Item with ID ${id} not found`);
  } else {
    if (w <= 0 || h <= 0) {
      errors.push('Item width and height must be greater than zero');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export const validateGridState = (layout: GridLayout): ValidationResult => {
  const errors: string[] = [];

  if (!Array.isArray(layout.items)) {
    errors.push('Items must be an array');
    return { valid: false, errors };
  }

  const ids = new Set<string>();
  layout.items.forEach((item) => {
    if (!item.id) {
      errors.push('Item missing ID');
    } else if (ids.has(item.id)) {
      errors.push(`Duplicate item ID: ${item.id}`);
    } else {
      ids.add(item.id);
    }

    if (item.x < 0 || item.y < 0 || item.w <= 0 || item.h <= 0) {
      errors.push(`Invalid dimensions for item ${item.id}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};
