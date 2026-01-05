import { GridLayout, GridItem, GridItemStyle } from './types';

export type GridAction =
  | { type: 'INIT_LAYOUT'; payload: GridLayout }
  | { type: 'ADD_ITEM'; payload: GridItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'MOVE_ITEM'; payload: { id: string; x: number; y: number } }
  | { type: 'RESIZE_ITEM'; payload: { id: string; w: number; h: number } }
  | { type: 'UPDATE_ITEM_STYLE'; payload: { id: string; style: Partial<GridItemStyle> } }
  | { type: 'UPDATE_ITEM_CONTENT'; payload: { id: string; content: Record<string, any> } }
  | { type: 'LOCK_ITEM'; payload: { id: string } }
  | { type: 'UNLOCK_ITEM'; payload: { id: string } }
  | { type: 'SET_BREAKPOINT'; payload: { breakpoint: 'desktop' | 'tablet' | 'mobile' } };

export type { GridLayout, GridItem } from './types';

export function gridReducer(state: GridLayout, action: GridAction): GridLayout {
  switch (action.type) {
    case 'INIT_LAYOUT':
      return {
        ...action.payload,
        updatedAt: Date.now(),
      };

    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        updatedAt: Date.now(),
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        updatedAt: Date.now(),
      };

    case 'MOVE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, x: action.payload.x, y: action.payload.y, updatedAt: Date.now() }
            : item
        ),
        updatedAt: Date.now(),
      };

    case 'RESIZE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, w: action.payload.w, h: action.payload.h, updatedAt: Date.now() }
            : item
        ),
        updatedAt: Date.now(),
      };

    case 'UPDATE_ITEM_STYLE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, style: { ...item.style, ...action.payload.style }, updatedAt: Date.now() }
            : item
        ),
        updatedAt: Date.now(),
      };

    case 'UPDATE_ITEM_CONTENT':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, content: { ...item.content, ...action.payload.content }, updatedAt: Date.now() }
            : item
        ),
        updatedAt: Date.now(),
      };

    case 'LOCK_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, locked: true, updatedAt: Date.now() }
            : item
        ),
        updatedAt: Date.now(),
      };

    case 'UNLOCK_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, locked: false, updatedAt: Date.now() }
            : item
        ),
        updatedAt: Date.now(),
      };

    case 'SET_BREAKPOINT':
      return state; // Breakpoint is managed separately in context

    default:
      return state;
  }
}