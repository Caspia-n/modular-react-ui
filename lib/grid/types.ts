export type GridItemType = 'text' | 'image' | 'chart' | 'stat' | 'table';

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
  content?: any;
  style: GridItemStyle;
  locked?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface GridLayoutSettings {
  snapToGrid?: boolean;
  showGrid?: boolean;
  gridSize?: number;
  rowHeight?: number;
  margin?: [number, number];
  containerPadding?: [number, number];
  isDraggable?: boolean;
  isResizable?: boolean;
}

export interface GridLayout {
  id: string;
  name: string;
  version: string;
  items: GridItem[];
  breakpoints: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  settings: GridLayoutSettings;
  createdAt: number;
  updatedAt: number;
}
