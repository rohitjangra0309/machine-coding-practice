import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counterSlice';
import todosReducer from '../slices/todosSlice';
import usersReducer from '../slices/usersSlice';

// REDUX TOOLKIT STORE CONFIGURATION
// configureStore provides good defaults:
// - Redux DevTools Extension enabled
// - redux-thunk middleware included
// - Immutability and serializability checks in development
// - Combines reducers automatically

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    users: usersReducer,
  },
  
  // Optional: Add custom middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // These are enabled by default in development
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Example: ignore specific actions
      },
      immutableCheck: {
        warnAfter: 128, // Warn if state check takes more than 128ms
      },
    }),
  
  // Optional: Configure dev tools
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for TypeScript (if using TypeScript)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

/*
🎯 STORE CONFIGURATION INTERVIEW POINTS:

Q: What does configureStore provide out of the box?
A: configureStore automatically includes:
   - Redux DevTools Extension
   - redux-thunk middleware for async actions
   - Immutability checks (development only)
   - Serializability checks (development only)
   - Combines multiple reducers

Q: How is this different from createStore?
A: Unlike createStore, configureStore:
   - Provides sensible defaults
   - Includes useful middleware automatically
   - Better development experience
   - Less boilerplate code
   - Better error messages

Q: What middleware is included by default?
A: Default middleware includes:
   - redux-thunk (for async actions)
   - Immutability check middleware (dev only)
   - Serializability check middleware (dev only)
   - DevTools enhancer

Q: How do you add custom middleware?
A: Use the middleware option with getDefaultMiddleware():
   middleware: (getDefaultMiddleware) => 
     getDefaultMiddleware().concat(customMiddleware)

Q: What are the performance implications?
A: - Immutability/serializability checks only run in development
   - Production builds are optimized
   - DevTools are disabled in production by default
*/ 