export type GridItemType = string;

export interface GridItemStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  opacity?: number;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export interface GridItem {
  id: string;
  type: GridItemType;
  x: number;
  y: number;
  w: number;
  h: number;
  content?: unknown;
  style?: GridItemStyle;
  locked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BreakpointLayout {
  breakpoint: string;
  cols: number;
  items: Array<Pick<GridItem, 'id' | 'x' | 'y' | 'w' | 'h'>>;
}

export interface GridLayoutSettings {
  rowHeight?: number;
  margin?: [number, number];
  containerPadding?: [number, number];
  isDraggable?: boolean;
  isResizable?: boolean;
}

export interface GridLayout {
  id: string;
  name: string;
  version: number;
  items: GridItem[];
  breakpoints: Record<string, BreakpointLayout>;
  settings?: GridLayoutSettings;
  createdAt: string;
  updatedAt: string;
}
