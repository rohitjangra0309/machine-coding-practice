import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const StoreDebugger = () => {
  const [collapsed, setCollapsed] = useState({});
  
  // Get the entire store state
  const storeState = useSelector(state => state);

  const toggleCollapse = (key) => {
    setCollapsed(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatValue = (value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string') return `"${value}"`;
    if (Array.isArray(value)) return `Array(${value.length})`;
    if (typeof value === 'object') return `Object(${Object.keys(value).length})`;
    return value.toString();
  };

  const renderValue = (value, path = '') => {
    if (value === null || value === undefined || typeof value !== 'object') {
      return (
        <span style={{ color: '#666' }}>
          {formatValue(value)}
        </span>
      );
    }

    if (Array.isArray(value)) {
      const isCollapsed = collapsed[path];
      return (
        <div>
          <span 
            style={{ cursor: 'pointer', color: '#007bff' }}
            onClick={() => toggleCollapse(path)}
          >
            {isCollapsed ? '▶' : '▼'} Array({value.length})
          </span>
          {!isCollapsed && (
            <div style={{ marginLeft: '20px', marginTop: '5px' }}>
              {value.map((item, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  <span style={{ color: '#666' }}>[{index}]:</span> {renderValue(item, `${path}[${index}]`)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    const isCollapsed = collapsed[path];
    const entries = Object.entries(value);
    
    return (
      <div>
        <span 
          style={{ cursor: 'pointer', color: '#007bff' }}
          onClick={() => toggleCollapse(path)}
        >
          {isCollapsed ? '▶' : '▼'} Object({entries.length})
        </span>
        {!isCollapsed && (
          <div style={{ marginLeft: '20px', marginTop: '5px' }}>
            {entries.map(([key, val]) => (
              <div key={key} style={{ marginBottom: '5px' }}>
                <span style={{ color: '#d73a49', fontWeight: 'bold' }}>{key}:</span> {renderValue(val, `${path}.${key}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h4 style={{ margin: 0 }}>Redux Store State</h4>
        <button
          onClick={() => setCollapsed({})}
          style={{
            padding: '5px 10px',
            fontSize: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Expand All
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '4px',
        border: '1px solid #dee2e6',
        fontFamily: 'monospace',
        fontSize: '14px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {Object.entries(storeState).map(([sliceName, sliceState]) => (
          <div key={sliceName} style={{ marginBottom: '15px' }}>
            <div style={{ 
              backgroundColor: '#e9ecef',
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '8px'
            }}>
              <strong style={{ color: '#495057' }}>{sliceName} slice:</strong>
            </div>
            {renderValue(sliceState, sliceName)}
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <strong>💡 Pro Tip:</strong> Install Redux DevTools browser extension for advanced debugging:
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>Time-travel debugging</li>
          <li>Action history</li>
          <li>State diffs</li>
          <li>Performance monitoring</li>
        </ul>
      </div>
    </div>
  );
};

export default StoreDebugger; 