import React, { useState } from 'react';
import { useUser } from '../ContextDemo';
import { useTheme } from '../ContextDemo';

const UserProfile = () => {
  const { user, loading, login, logout, updateProfile } = useUser();
  const { theme } = useTheme();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginForm.email, loginForm.password);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setEditMode(false);
  };

  const startEdit = () => {
    setProfileForm({ name: user.name, email: user.email });
    setEditMode(true);
  };

  const containerStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c',
    border: `2px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: theme === 'light' ? '#fff' : '#444',
    color: theme === 'light' ? '#000' : '#fff'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
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

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <p>🔄 Logging in...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={containerStyle}>
        <h3>🔐 Login Required</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            style={inputStyle}
            required
          />
          <button type="submit" style={primaryButtonStyle}>
            Login
          </button>
        </form>
        
        <div style={{ marginTop: '15px', fontSize: '12px', opacity: 0.7 }}>
          <p><strong>Demo credentials:</strong> Any email/password will work</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h3>👤 User Profile</h3>
      
      {editMode ? (
        <form onSubmit={handleProfileUpdate}>
          <input
            type="text"
            placeholder="Name"
            value={profileForm.name}
            onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={profileForm.email}
            onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
            style={inputStyle}
            required
          />
          <button type="submit" style={primaryButtonStyle}>
            Save Changes
          </button>
          <button type="button" onClick={() => setEditMode(false)} style={secondaryButtonStyle}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <h4>Preferences:</h4>
            <p>Notifications: {user.preferences?.notifications ? '✅ Enabled' : '❌ Disabled'}</p>
            <p>Theme Preference: {user.preferences?.theme || 'auto'}</p>
          </div>

          <button onClick={startEdit} style={primaryButtonStyle}>
            Edit Profile
          </button>
          <button onClick={logout} style={dangerButtonStyle}>
            Logout
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', opacity: 0.8 }}>
        <p><strong>Context Features Demonstrated:</strong></p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Authentication state management</li>
          <li>User data persistence across components</li>
          <li>Async operations (login simulation)</li>
          <li>Custom hook pattern (useUser)</li>
          <li>Error handling with context validation</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile; 