import type { GridItemStyle } from '../grid/types';

export interface BaseAICommand {
  reason?: string;
}

export interface AddComponentCommand extends BaseAICommand {
  type: 'add_component';
  id: string;
  componentType: string;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  content?: unknown;
  style?: GridItemStyle;
}

export interface RemoveComponentCommand extends BaseAICommand {
  type: 'remove_component';
  ids: string[];
}

export interface ResizeComponentCommand extends BaseAICommand {
  type: 'resize_component';
  id: string;
  size: {
    w: number;
    h: number;
  };
}

export interface MoveComponentCommand extends BaseAICommand {
  type: 'move_component';
  id: string;
  position: {
    x: number;
    y: number;
  };
}

export interface UpdateStyleCommand extends BaseAICommand {
  type: 'update_style';
  id: string;
  style: Partial<GridItemStyle>;
}

export interface UpdateContentCommand extends BaseAICommand {
  type: 'update_content';
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
