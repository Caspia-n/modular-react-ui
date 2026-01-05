export function generateId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
