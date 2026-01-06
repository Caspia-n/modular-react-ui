import type { GridItemStyle } from '../grid/types';

export interface BaseAICommand {
  reason?: string;
}

export interface AddComponentCommand extends BaseAICommand {
  type: 'add';
  id?: string;
  componentType: 'text' | 'media' | 'embed';
  x: number;
  y: number;
  w: number;
  h: number;
  content?: unknown;
  style?: GridItemStyle;
}

export interface RemoveComponentCommand extends BaseAICommand {
  type: 'remove';
  id: string;
}

export interface ResizeComponentCommand extends BaseAICommand {
  type: 'resize';
  id: string;
  w: number;
  h: number;
}

export interface MoveComponentCommand extends BaseAICommand {
  type: 'move';
  id: string;
  x: number;
  y: number;
}

export interface UpdateStyleCommand extends BaseAICommand {
  type: 'updateStyle';
  id: string;
  style: Partial<GridItemStyle>;
}

export interface UpdateContentCommand extends BaseAICommand {
  type: 'updateContent';
  id: string;
  content: unknown;
}

export type AICommand =
  | AddComponentCommand
  | RemoveComponentCommand
  | ResizeComponentCommand
  | MoveComponentCommand
  | UpdateStyleCommand
  | UpdateContentCommand;

export interface AISuggestion {
  commands: AICommand[];
  reasoning: string;
  confidence: number;
  requiresApproval: boolean;
}
