import { AICommand } from '@/lib/ai/types';
import { GridLayout } from '@/lib/grid/types';
import { COMPONENT_DEFAULTS } from '@/lib/utils/constants';

export interface CommandValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateAICommand(
  command: AICommand,
  gridState: GridLayout
): CommandValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  switch (command.type) {
    case 'add':
      if (command.x < 0 || command.y < 0) {
        errors.push('Position must be non-negative');
      }
      if (!command.w || !command.h || 
          command.w < COMPONENT_DEFAULTS.minWidth || 
          command.h < COMPONENT_DEFAULTS.minHeight) {
        errors.push(`Dimensions must be at least ${COMPONENT_DEFAULTS.minWidth}x${COMPONENT_DEFAULTS.minHeight}`);
      }
      if (command.w > COMPONENT_DEFAULTS.maxWidth || 
          command.h > COMPONENT_DEFAULTS.maxHeight) {
        warnings.push(`Large dimensions may not fit grid`);
      }
      if (!['text', 'media', 'embed'].includes(command.componentType)) {
        errors.push('Unknown component type');
      }
      break;

    case 'move':
    case 'resize':
      const item = gridState.items.find(i => i.id === command.id);
      if (!item) {
        errors.push(`Item ${command.id} not found`);
      }
      if (command.type === 'move' && (command.x < 0 || command.y < 0)) {
        errors.push('Position must be non-negative');
      }
      if (command.type === 'resize' && (command.w < COMPONENT_DEFAULTS.minWidth || 
          command.h < COMPONENT_DEFAULTS.minHeight)) {
        errors.push(`Dimensions must be at least ${COMPONENT_DEFAULTS.minWidth}x${COMPONENT_DEFAULTS.minHeight}`);
      }
      break;

    case 'remove':
      if (!gridState.items.find(i => i.id === command.id)) {
        errors.push(`Item ${command.id} not found`);
      }
      break;

    case 'updateStyle':
      if (!gridState.items.find(i => i.id === command.id)) {
        errors.push(`Item ${command.id} not found`);
      }
      break;

    case 'updateContent':
      if (!gridState.items.find(i => i.id === command.id)) {
        errors.push(`Item ${command.id} not found`);
      }
      break;

    default:
      errors.push('Unknown command type');
  }

  return { valid: errors.length === 0, errors, warnings };
}