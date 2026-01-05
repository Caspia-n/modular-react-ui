export const BREAKPOINTS = {
  desktop: 1200, // px
  tablet: 768,
  mobile: 0
};

export const GRID_COLS = {
  desktop: 12,
  tablet: 8,
  mobile: 4
};

export const GRID_CELL_SIZE = 60; // px per grid unit

export const AI_MODELS = {
  FAST: 'anthropic/claude-3-haiku',
  BALANCED: 'openrouter/auto',
  REASONING: 'meta-llama/llama-3-70b-instruct'
};

export const COMPONENT_DEFAULTS = {
  minWidth: 2,
  minHeight: 2,
  maxWidth: 12,
  maxHeight: 20
};

export const DESIGN_TOKENS = {
  bgCanvas: 'var(--bg-canvas)',
  bgSurface: 'var(--bg-surface)',
  borderSubtle: 'var(--border-subtle)',
  textPrimary: 'var(--text-primary)',
  textMuted: 'var(--text-muted)',
  accent: 'var(--accent)'
} as const;
