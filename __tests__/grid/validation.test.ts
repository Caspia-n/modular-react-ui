import { validateAddItem } from '@/lib/grid/validation';
import { createDefaultLayout } from '@/lib/grid/serialization';

describe('validation', () => {
  it('should validate a valid item', () => {
    const state = createDefaultLayout();
    const item = { 
      id: 'test-1', 
      type: 'text' as const, 
      x: 0, 
      y: 0, 
      w: 3, 
      h: 2, 
      content: {}, 
      style: {}, 
      createdAt: Date.now(), 
      updatedAt: Date.now() 
    };
    
    const result = validateAddItem(item, state);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject item with invalid dimensions', () => {
    const state = createDefaultLayout();
    const item = { 
      id: 'test-1', 
      type: 'text' as const, 
      x: 0, 
      y: 0, 
      w: 0, 
      h: 0, 
      content: {}, 
      style: {}, 
      createdAt: Date.now(), 
      updatedAt: Date.now() 
    };
    
    const result = validateAddItem(item, state);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
