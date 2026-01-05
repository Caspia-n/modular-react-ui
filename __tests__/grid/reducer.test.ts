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
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
  });

  it('should remove an item', () => {
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
    
    const result = gridReducer(state, { type: 'REMOVE_ITEM', payload: { id: 'test-1' } });
    expect(result.items).toHaveLength(0);
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
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
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
  });

  it('should resize an item', () => {
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
    
    const result = gridReducer(state, { type: 'RESIZE_ITEM', payload: { id: 'test-1', w: 4, h: 3 } });
    expect(result.items[0].w).toBe(4);
    expect(result.items[0].h).toBe(3);
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
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
    expect(result.items[0].style?.backgroundColor).toBe('#FF0000');
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
  });

  it('should update item content', () => {
    const state = createDefaultLayout();
    const item = { 
      id: 'test-1', 
      type: 'text' as const, 
      x: 0, 
      y: 0, 
      w: 3, 
      h: 2, 
      content: { text: 'old' }, 
      style: {}, 
      createdAt: Date.now(), 
      updatedAt: Date.now() 
    };
    state.items.push(item);
    
    const result = gridReducer(state, { 
      type: 'UPDATE_ITEM_CONTENT', 
      payload: { id: 'test-1', content: { text: 'new' } }
    });
    expect(result.items[0].content?.text).toBe('new');
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
  });

  it('should lock an item', () => {
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
      locked: false,
      createdAt: Date.now(), 
      updatedAt: Date.now() 
    };
    state.items.push(item);
    
    const result = gridReducer(state, { type: 'LOCK_ITEM', payload: { id: 'test-1' } });
    expect(result.items[0].locked).toBe(true);
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
  });

  it('should unlock an item', () => {
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
      locked: true,
      createdAt: Date.now(), 
      updatedAt: Date.now() 
    };
    state.items.push(item);
    
    const result = gridReducer(state, { type: 'UNLOCK_ITEM', payload: { id: 'test-1' } });
    expect(result.items[0].locked).toBe(false);
    expect(result.updatedAt).toBeGreaterThan(state.updatedAt);
  });

  it('should return state unchanged for unknown actions', () => {
    const state = createDefaultLayout();
    // Use a proper unknown action that matches the union type structure
    const unknownAction = { 
      type: 'UNKNOWN_ACTION' as any, 
      payload: { id: 'test', x: 0, y: 0, w: 1, h: 1 } as any
    };
    
    const result = gridReducer(state, unknownAction);
    expect(result).toBe(state);
  });
});