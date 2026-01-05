import { gridReducer } from '@/lib/grid/reducer';
import { createDefaultLayout } from '@/lib/grid/serialization';

describe('gridReducer', () => {
  it('should add an item', () => {
    const state = createDefaultLayout();
    const newItem = { 
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
    
    const result = gridReducer(state, { type: 'ADD_ITEM', payload: newItem });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe('test-1');
  });

  it('should remove an item', () => {
    const state = createDefaultLayout();
    state.items.push({ 
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
    });
    
    const result = gridReducer(state, { type: 'REMOVE_ITEM', payload: { id: 'test-1' } });
    expect(result.items).toHaveLength(0);
  });

  it('should move an item', () => {
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
    state.items.push(item);
    
    const result = gridReducer(state, { type: 'MOVE_ITEM', payload: { id: 'test-1', x: 3, y: 4 } });
    expect(result.items[0].x).toBe(3);
    expect(result.items[0].y).toBe(4);
  });

  it('should update item style', () => {
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
    state.items.push(item);
    
    const result = gridReducer(state, { 
      type: 'UPDATE_ITEM_STYLE', 
      payload: { id: 'test-1', style: { backgroundColor: '#FF0000' } }
    });
    expect(result.items[0].style.backgroundColor).toBe('#FF0000');
  });
});
