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
  content?: Record<string, any>;
  style?: GridItemStyle;
  locked?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface GridLayout {
  id: string;
  name: string;
  version: string;
  items: GridItem[];
  breakpoints: { desktop: number; tablet: number; mobile: number };
  settings: { snapToGrid: boolean; showGrid: boolean; gridSize: number };
  createdAt: number;
  updatedAt: number;
}
