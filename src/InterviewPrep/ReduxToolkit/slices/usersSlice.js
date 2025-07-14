import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// USERS SLICE - Async Operations with createAsyncThunk
// Demonstrates:
// - API calls with createAsyncThunk
// - Loading states management
// - Error handling
// - Pending/fulfilled/rejected patterns

// ASYNC THUNKS - These handle async operations
// createAsyncThunk automatically creates action types:
// - fetchUsers.pending
// - fetchUsers.fulfilled 
// - fetchUsers.rejected

// Fetch users from API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const users = await response.json();
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch single user
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`User ${userId} not found`);
      }
      
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new user (simulated)
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      const newUser = await response.json();
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// INITIAL STATE
const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
  lastFetch: null
};

// SLICE DEFINITION
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    
    // Optimistic update for better UX
    optimisticUpdate: (state, action) => {
      const { id, changes } = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        Object.assign(user, changes);
      }
    }
  },
  
  // EXTRA REDUCERS - Handle async thunk actions
  extraReducers: (builder) => {
    // FETCH USERS
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // FETCH USER BY ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creating = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      
      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      
      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleting = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  }
});

// Export synchronous actions
export const { 
  clearError, 
  setSelectedUser, 
  clearSelectedUser, 
  optimisticUpdate 
} = usersSlice.actions;

// SELECTORS
export const selectUsers = (state) => state.users.users;
export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
export const selectUsersCreating = (state) => state.users.creating;
export const selectUsersUpdating = (state) => state.users.updating;
export const selectUsersDeleting = (state) => state.users.deleting;

// Computed selectors
export const selectUsersCount = (state) => state.users.users.length;
export const selectRecentlyFetched = (state) => {
  const lastFetch = state.users.lastFetch;
  return lastFetch && (Date.now() - lastFetch) < 5 * 60 * 1000; // 5 minutes
};

// Export reducer
export default usersSlice.reducer;

/*
🎯 ASYNC OPERATIONS INTERVIEW POINTS:

Q: What is createAsyncThunk and why use it?
A: createAsyncThunk is RTK's way to handle async operations. It:
   - Automatically creates pending/fulfilled/rejected action types
   - Dispatches appropriate actions based on promise state
   - Handles errors and loading states
   - Provides consistent pattern for async logic

Q: What are the three states of an async thunk?
A: 1. pending: When async operation starts
   2. fulfilled: When async operation succeeds
   3. rejected: When async operation fails

Q: How do you handle errors in async thunks?
A: Use rejectWithValue() to return custom error payloads:
   catch (error) {
     return rejectWithValue(error.message);
   }

Q: What is extraReducers and when to use it?
A: extraReducers handles actions defined outside the slice:
   - Async thunk actions (pending/fulfilled/rejected)
   - Actions from other slices
   - Externally defined actions

Q: How do you handle loading states?
A: Maintain separate loading flags for different operations:
   - loading: general loading state
   - creating: for create operations
   - updating: for update operations
   - deleting: for delete operations

Q: What's the difference between async thunks and regular actions?
A: Regular actions are synchronous and update state immediately
   Async thunks handle async operations and dispatch multiple actions

Q: How do you handle optimistic updates?
A: Update state immediately, then revert if the API call fails:
   - Dispatch optimistic action first
   - Make API call
   - Handle success/failure accordingly

Q: What is the typical async thunk pattern?
A: 1. Create thunk with createAsyncThunk
   2. Handle pending/fulfilled/rejected in extraReducers
   3. Use appropriate loading/error states
   4. Dispatch thunk from components with useDispatch
*/ 