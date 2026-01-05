export interface BlockConfig {
  id: string;
  type: 'text' | 'media' | 'embed';
  props: Record<string, any>;
  style?: Record<string, any>;
}

export interface BlockComponentProps {
  config: BlockConfig;
  isSelected: boolean;
  onUpdate: (config: Partial<BlockConfig>) => void;
  onDelete: () => void;
}

export interface BlockDefinition {
  type: 'text' | 'media' | 'embed';
  label: string;
  icon: React.ReactNode;
  defaultProps: Record<string, any>;
  defaultStyle: Record<string, any>;
  component: React.ComponentType<BlockComponentProps>;
  editor: React.ComponentType<BlockEditorProps>;
}

export interface BlockEditorProps {
  config: BlockConfig;
  onSave: (config: Partial<BlockConfig>) => void;
  onCancel: () => void;
}