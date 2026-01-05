import type { GridLayout } from '../grid/types';

export interface PersistenceConfig {
  enableLocalStorage: boolean;
  enableServerSync: boolean;
  serverEndpoint?: string;
}

export interface ExportPayload {
  schemaVersion: number;
  exportedAt: string;
  layout: GridLayout;
  metadata?: Record<string, string>;
}
