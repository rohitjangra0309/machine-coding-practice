import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchUsers,
  fetchUserById,
  createUser,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectSelectedUser,
  selectUsersCreating,
  clearError
} from '../slices/usersSlice';

const UsersDemo = () => {
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const creating = useSelector(selectUsersCreating);
  const error = useSelector(selectUsersError);
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const handleCreateUser = async () => {
    await dispatch(createUser({
      name: `New User ${Date.now()}`,
      email: `user${Date.now()}@example.com`,
      username: `user${Date.now()}`
    }));
  };

  const buttonStyle = {
    margin: '5px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      {/* Action Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => dispatch(fetchUsers())}
          disabled={loading}
          style={primaryButtonStyle}
        >
          {loading ? '🔄 Loading...' : '📥 Fetch Users'}
        </button>
        <button
          onClick={handleCreateUser}
          disabled={creating}
          style={successButtonStyle}
        >
          {creating ? '🔄 Creating...' : '➕ Create User'}
        </button>
        {error && (
          <button
            onClick={() => dispatch(clearError())}
            style={dangerButtonStyle}
          >
            ✕ Clear Error
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '24px' }}>🔄</div>
          <p>Loading users...</p>
        </div>
      )}

      {/* Users List */}
      {!loading && users.length > 0 && (
        <div>
          <h4>Users ({users.length}):</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {users.slice(0, 6).map(user => (
              <div
                key={user.id}
                style={{
                  padding: '15px',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <h5 style={{ margin: '0 0 8px 0' }}>{user.name}</h5>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
                  📧 {user.email}
                </p>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
                  👤 @{user.username}
                </p>
                <button
                  onClick={() => dispatch(fetchUserById(user.id))}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    fontSize: '12px'
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected User Details */}
      {selectedUser && (
        <div style={{
          padding: '20px',
          backgroundColor: '#e7f3ff',
          border: '1px solid #b8daff',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <h4>Selected User Details:</h4>
          <div style={{ fontSize: '14px' }}>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            {selectedUser.phone && <p><strong>Phone:</strong> {selectedUser.phone}</p>}
            {selectedUser.website && <p><strong>Website:</strong> {selectedUser.website}</p>}
          </div>
        </div>
      )}

      {/* Async Operations Explanation */}
      <div style={{ 
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <h4>Async Operations Demonstrated:</h4>
        <ul>
          <li><strong>createAsyncThunk:</strong> Handles async API calls</li>
          <li><strong>Loading States:</strong> pending/fulfilled/rejected</li>
          <li><strong>Error Handling:</strong> rejectWithValue for custom errors</li>
          <li><strong>extraReducers:</strong> Handle thunk actions</li>
          <li><strong>Optimistic Updates:</strong> UI updates before API response</li>
        </ul>
      </div>
    </div>
  );
};

export default UsersDemo; 