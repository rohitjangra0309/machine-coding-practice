import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CounterDemo from './components/CounterDemo';
import TodosDemo from './components/TodosDemo';
import UsersDemo from './components/UsersDemo';
import StoreDebugger from './components/StoreDebugger';

const ReduxDemo = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <h1>⚡ Redux Toolkit Concepts Demo</h1>
        
        {/* Store Debug Info */}
        <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
          <h2>🔍 Store State Inspector</h2>
          <StoreDebugger />
        </section>

        {/* Counter Slice Demo */}
        <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
          <h2>1. Counter Slice (Basic State Management)</h2>
          <p>Demonstrates createSlice, reducers, and actions</p>
          <CounterDemo />
        </section>

        {/* Todos Slice Demo */}
        <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
          <h2>2. Todos Slice (Complex State with Arrays)</h2>
          <p>Shows CRUD operations, payload actions, and array manipulation</p>
          <TodosDemo />
        </section>

        {/* Users Async Demo */}
        <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
          <h2>3. Users Slice (Async Operations with createAsyncThunk)</h2>
          <p>Demonstrates API calls, loading states, and error handling</p>
          <UsersDemo />
        </section>

        {/* Interview Concepts */}
        <section style={{ backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px' }}>
          <h2>📝 Redux Toolkit Interview Key Points</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            
            <div>
              <h3>🔧 Core Concepts:</h3>
              <ul>
                <li><strong>createSlice:</strong> Combines actions + reducers</li>
                <li><strong>configureStore:</strong> Store setup with good defaults</li>
                <li><strong>createAsyncThunk:</strong> Handle async operations</li>
                <li><strong>RTK Query:</strong> Data fetching and caching</li>
                <li><strong>Immer:</strong> Immutable updates made easy</li>
              </ul>
            </div>

            <div>
              <h3>⚡ Benefits over Classic Redux:</h3>
              <ul>
                <li>Less boilerplate code</li>
                <li>Built-in Immer for mutations</li>
                <li>DevTools configured automatically</li>
                <li>Better TypeScript support</li>
                <li>Standardized patterns</li>
              </ul>
            </div>

            <div>
              <h3>🎯 When to Use Redux:</h3>
              <ul>
                <li>Complex state logic</li>
                <li>State shared across many components</li>
                <li>Large applications</li>
                <li>Need for time-travel debugging</li>
                <li>Predictable state updates</li>
              </ul>
            </div>

            <div>
              <h3>🏗️ Best Practices:</h3>
              <ul>
                <li>Normalize state shape</li>
                <li>Use createAsyncThunk for API calls</li>
                <li>Keep slices focused and small</li>
                <li>Use selectors for derived data</li>
                <li>Structure by feature, not by type</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
            <h4>🤔 Redux Toolkit vs Context API - When to choose what?</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <strong>Use Context API when:</strong>
                <ul>
                  <li>Simple global state (theme, user auth)</li>
                  <li>Small to medium applications</li>
                  <li>Minimal state logic complexity</li>
                  <li>Don't need time-travel debugging</li>
                </ul>
              </div>
              <div>
                <strong>Use Redux Toolkit when:</strong>
                <ul>
                  <li>Complex state logic and transformations</li>
                  <li>Large applications with many features</li>
                  <li>Need predictable state updates</li>
                  <li>Want debugging and dev tools</li>
                  <li>Multiple developers working on state</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Provider>
  );
};

export default ReduxDemo;

/*
🎯 REDUX TOOLKIT INTERVIEW QUESTIONS & ANSWERS:

Q: What is Redux Toolkit and why was it created?
A: Redux Toolkit (RTK) is the official, opinionated way to write Redux logic. It was created to:
   - Reduce Redux boilerplate
   - Provide good defaults and best practices
   - Make Redux easier to learn and use
   - Include common utilities like Immer for immutable updates

Q: What are the main APIs of Redux Toolkit?
A: Main APIs include:
   - configureStore(): Sets up store with good defaults
   - createSlice(): Defines reducers and actions together
   - createAsyncThunk(): Handles async logic
   - createEntityAdapter(): Manages normalized data
   - RTK Query: Complete data fetching solution

Q: How does createSlice work?
A: createSlice automatically generates:
   - Action creators based on reducer names
   - Action types as strings
   - A reducer function that handles all actions
   - Uses Immer internally for immutable updates

Q: What is createAsyncThunk used for?
A: createAsyncThunk is used for:
   - Handling async operations (API calls)
   - Automatically dispatching pending/fulfilled/rejected actions
   - Managing loading states
   - Error handling in async operations

Q: How does RTK handle immutability?
A: RTK uses Immer internally, which allows you to write "mutative" logic that's 
   actually producing immutable updates under the hood.

Q: What's the difference between Redux and Redux Toolkit?
A: Redux Toolkit is built on top of Redux with:
   - Simplified API (less boilerplate)
   - Built-in best practices
   - Better defaults (includes thunk, devtools)
   - Immer for easier immutable updates
   - Better TypeScript support
*/ 