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

export function gridReducer(state: GridLayout, action: GridAction): GridLayout {
  const updatedAt = Date.now();

  switch (action.type) {
    case 'INIT_LAYOUT':
      return {
        ...action.payload,
        updatedAt,
      };

    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        updatedAt,
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        updatedAt,
      };

    case 'MOVE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, x: action.payload.x, y: action.payload.y, updatedAt }
            : item
        ),
        updatedAt,
      };

    case 'RESIZE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, w: action.payload.w, h: action.payload.h, updatedAt }
            : item
        ),
        updatedAt,
      };

    case 'UPDATE_ITEM_STYLE':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                style: { ...item.style, ...action.payload.style },
                updatedAt,
              }
            : item
        ),
        updatedAt,
      };

    case 'UPDATE_ITEM_CONTENT':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                content: { ...(item.content as Record<string, any> || {}), ...action.payload.content },
                updatedAt,
              }
            : item
        ),
        updatedAt,
      };

    case 'LOCK_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, locked: true, updatedAt } : item
        ),
        updatedAt,
      };

    case 'UNLOCK_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, locked: false, updatedAt } : item
        ),
        updatedAt,
      };

    case 'SET_BREAKPOINT':
      // This might need more logic if we store breakpoint-specific layouts
      // For now, it's just updating state's updatedAt or we could add currentBreakpoint to state
      return {
        ...state,
        updatedAt,
      };

    default:
      return state;
  }
}
