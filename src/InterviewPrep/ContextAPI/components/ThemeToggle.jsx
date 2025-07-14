import React from 'react';
import { useTheme } from '../ContextDemo';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: theme === 'light' ? '#333' : '#fff',
    color: theme === 'light' ? '#fff' : '#333',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  };

  const containerStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
    border: `2px solid ${theme === 'light' ? '#ddd' : '#555'}`
  };

  return (
    <div style={containerStyle}>
      <p>
        <strong>Current Theme:</strong> {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </p>
      <button style={buttonStyle} onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      
      <div style={{ marginTop: '15px', fontSize: '14px', opacity: 0.8 }}>
        <p><strong>How it works:</strong></p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>ThemeContext provides theme state globally</li>
          <li>useTheme hook accesses context anywhere in the app</li>
          <li>No prop drilling needed for theme data</li>
          <li>All components automatically get theme updates</li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeToggle; 