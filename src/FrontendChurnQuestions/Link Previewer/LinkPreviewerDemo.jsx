import React from 'react';
import LinkPreviewer from './LinkPreviewer';

/**
 * Demo component for LinkPreviewer
 * Shows how to use the component with hover interactions
 */
const LinkPreviewerDemo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Link Previewer Demo</h1>
      <p>Hover over links to see preview cards with rich information.</p>
      
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        marginTop: '20px'
      }}>
        <LinkPreviewer />
      </div>
      
      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>Key Features:</h3>
        <ul>
          <li>✅ Hover to show preview cards</li>
          <li>✅ Rich preview with image, title, description</li>
          <li>✅ Single state management for hover tracking</li>
          <li>✅ Clean, minimal CSS styling</li>
        </ul>
      </div>
    </div>
  );
};

export default LinkPreviewerDemo; 