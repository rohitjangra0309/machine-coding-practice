import { createSlice } from '@reduxjs/toolkit';

// COUNTER SLICE - Basic createSlice Example
// This demonstrates the fundamental RTK pattern:
// 1. Define initial state
// 2. Create slice with reducers
// 3. Export actions and reducer

const initialState = {
  value: 0,
  step: 1,
  history: [] // Track increment/decrement history
};

const counterSlice = createSlice({
  name: 'counter', // This becomes the action type prefix
  initialState,
  reducers: {
    // RTK uses Immer internally, so we can "mutate" the state
    increment: (state) => {
      state.value += state.step;
      state.history.push({
        action: 'increment',
        value: state.value,
        timestamp: Date.now()
      });
    },
    
    decrement: (state) => {
      state.value -= state.step;
      state.history.push({
        action: 'decrement',
        value: state.value,
        timestamp: Date.now()
      });
    },
    
    // Action with payload
    incrementByAmount: (state, action) => {
      const amount = action.payload;
      state.value += amount;
      state.history.push({
        action: `increment by ${amount}`,
        value: state.value,
        timestamp: Date.now()
      });
    },
    
    // Multiple state updates in one action
    setStep: (state, action) => {
      state.step = action.payload;
    },
    
    // Reset state
    reset: (state) => {
      state.value = 0;
      state.step = 1;
      state.history = [{
        action: 'reset',
        value: 0,
        timestamp: Date.now()
      }];
    },
    
    // Complex logic with conditional updates
    doubleIfOdd: (state) => {
      if (state.value % 2 === 1) {
        state.value *= 2;
        state.history.push({
          action: 'double (was odd)',
          value: state.value,
          timestamp: Date.now()
        });
      }
    }
  }
});

// Action creators are generated automatically
export const { 
  increment, 
  decrement, 
  incrementByAmount, 
  setStep, 
  reset, 
  doubleIfOdd 
} = counterSlice.actions;

// Selectors (functions to extract data from state)
export const selectCounter = (state) => state.counter.value;
export const selectStep = (state) => state.counter.step;
export const selectHistory = (state) => state.counter.history;

// Computed selectors
export const selectIsEven = (state) => state.counter.value % 2 === 0;
export const selectAbsoluteValue = (state) => Math.abs(state.counter.value);

// Export the reducer
export default counterSlice.reducer;

/*
🎯 CREATESLICE INTERVIEW POINTS:

Q: What does createSlice automatically generate?
A: createSlice automatically generates:
   - Action creators (increment, decrement, etc.)
   - Action types ('counter/increment', 'counter/decrement')
   - A reducer function that handles all the actions
   - Immutable update logic using Immer

Q: How does the "mutative" syntax work?
A: RTK uses Immer under the hood, which allows you to write code that looks like
   mutations but actually produces immutable updates. state.value += 1 is safe!

Q: What is action.payload?
A: action.payload contains the data passed to the action creator:
   dispatch(incrementByAmount(5)) → action.payload = 5

Q: How do you handle complex logic in reducers?
A: You can use conditional logic, multiple state updates, and even computed
   values within reducers. Just remember each reducer should be pure.

Q: What are selectors and why use them?
A: Selectors are functions that extract specific data from state:
   - Encapsulate state shape knowledge
   - Enable computed/derived data
   - Can be memoized for performance
   - Make components less coupled to state structure

Q: How do action types get generated?
A: Action types are generated as: `${slice.name}/${reducer.name}`
   Example: 'counter/increment', 'counter/decrement'
*/ 