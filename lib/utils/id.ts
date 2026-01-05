export function generateId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}