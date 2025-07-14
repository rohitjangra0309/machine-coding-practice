import { createSlice } from '@reduxjs/toolkit';

// TODOS SLICE - Complex Array Operations Example
// Demonstrates:
// - CRUD operations on arrays
// - Complex payload handling
// - Filtering and sorting logic
// - Normalized state patterns

const initialState = {
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'
  nextId: 1
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // CREATE - Add new todo
    addTodo: (state, action) => {
      const { text, priority = 'medium' } = action.payload;
      state.todos.push({
        id: state.nextId++,
        text,
        completed: false,
        priority,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    },
    
    // UPDATE - Toggle todo completion
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = Date.now();
      }
    },
    
    // UPDATE - Edit todo text
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
        todo.updatedAt = Date.now();
      }
    },
    
    // UPDATE - Set todo priority
    setPriority: (state, action) => {
      const { id, priority } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.priority = priority;
        todo.updatedAt = Date.now();
      }
    },
    
    // DELETE - Remove todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    
    // BATCH OPERATIONS
    toggleAll: (state) => {
      const allCompleted = state.todos.every(todo => todo.completed);
      state.todos.forEach(todo => {
        todo.completed = !allCompleted;
        todo.updatedAt = Date.now();
      });
    },
    
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    
    // FILTERING
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    // BULK IMPORT (complex payload)
    importTodos: (state, action) => {
      const importedTodos = action.payload.map(todoText => ({
        id: state.nextId++,
        text: todoText,
        completed: false,
        priority: 'medium',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }));
      state.todos.push(...importedTodos);
    },
    
    // REORDER todos
    reorderTodos: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedTodo] = state.todos.splice(fromIndex, 1);
      state.todos.splice(toIndex, 0, movedTodo);
    }
  }
});

// Export actions
export const {
  addTodo,
  toggleTodo,
  editTodo,
  setPriority,
  deleteTodo,
  toggleAll,
  clearCompleted,
  setFilter,
  importTodos,
  reorderTodos
} = todosSlice.actions;

// SELECTORS - Demonstrate different selection patterns

// Basic selectors
export const selectTodos = (state) => state.todos.todos;
export const selectFilter = (state) => state.todos.filter;

// Computed selectors (derived state)
export const selectFilteredTodos = (state) => {
  const todos = selectTodos(state);
  const filter = selectFilter(state);
  
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

// Statistics selectors
export const selectTodoStats = (state) => {
  const todos = selectTodos(state);
  return {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    byPriority: {
      high: todos.filter(todo => todo.priority === 'high').length,
      medium: todos.filter(todo => todo.priority === 'medium').length,
      low: todos.filter(todo => todo.priority === 'low').length
    }
  };
};

// Sorted selectors
export const selectTodosByPriority = (state) => {
  const todos = selectTodos(state);
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...todos].sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const selectRecentTodos = (state) => {
  const todos = selectTodos(state);
  return [...todos]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);
};

// Complex computed selector
export const selectTodoProgress = (state) => {
  const stats = selectTodoStats(state);
  return stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
};

export default todosSlice.reducer;

/*
🎯 COMPLEX STATE MANAGEMENT INTERVIEW POINTS:

Q: How do you handle array operations in RTK?
A: RTK uses Immer, so you can use array methods like push(), splice(), etc.
   These appear to mutate but actually create immutable updates.

Q: What's the pattern for finding and updating array items?
A: Use find() to locate item, then directly modify its properties:
   const todo = state.todos.find(todo => todo.id === action.payload);
   if (todo) { todo.completed = !todo.completed; }

Q: How do you handle complex payloads?
A: Destructure payload in action parameter:
   editTodo: (state, action) => {
     const { id, text } = action.payload;
     // ... handle multiple values
   }

Q: What are selectors and why are they important?
A: Selectors extract data from state and can compute derived values:
   - Encapsulate state structure
   - Enable computed/filtered data
   - Can be memoized with reselect
   - Keep components simple

Q: How do you handle batch operations?
A: Use forEach or array methods to update multiple items:
   state.todos.forEach(todo => { todo.completed = true; });

Q: What's the difference between basic and computed selectors?
A: Basic selectors just extract data: (state) => state.todos.todos
   Computed selectors derive/transform data: filtered, sorted, aggregated results

Q: How do you maintain referential equality in selectors?
A: For complex computations, use memoization libraries like reselect
   to prevent unnecessary re-renders when derived data hasn't changed.
*/ 