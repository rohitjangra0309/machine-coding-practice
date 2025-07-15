import React from 'react';
import LinkPreviewer from './LinkPreviewer';

/**
 * Demo component showing how to use the LinkPreviewer component
 */
const LinkPreviewerDemo = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Link Previewer Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Interactive Link Preview Demo</h2>
        <p>
          This component demonstrates a link preview system where users can:
        </p>
        <ul>
          <li>✅ Hover over links to see preview cards</li>
          <li>✅ View rich preview information (title, description, image)</li>
          <li>✅ See smooth hover interactions</li>
          <li>✅ Experience responsive design on all devices</li>
        </ul>
      </div>

      {/* Main component demo */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <LinkPreviewer />
      </div>

      {/* Usage instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>How to Use LinkPreviewer Component:</h3>
        
        <h4>Basic Usage:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`import LinkPreviewer from './LinkPreviewer';

function App() {
  return (
    <div>
      <LinkPreviewer />
    </div>
  );
}`}
        </pre>

        <h4>Data Structure:</h4>
        <p>The component uses this data structure for links:</p>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`const sampleLinks = [
  {
    id: 1,
    text: "Visit React Documentation",
    url: "https://reactjs.org/docs",
    preview: {
      title: "React Documentation",
      description: "Learn React with the official documentation...",
      image: imageUrl,
      url: "reactjs.org"
    }
  },
  // ... more links
];`}
        </pre>

        <h4>Key Features:</h4>
        <ul>
          <li><strong>Hover interaction:</strong> Shows preview on mouse enter, hides on mouse leave</li>
          <li><strong>Rich previews:</strong> Displays title, description, image, and URL</li>
          <li><strong>Single state management:</strong> Uses one state to track hovered link</li>
          <li><strong>Responsive design:</strong> Adapts to different screen sizes</li>
          <li><strong>Clean CSS:</strong> Separate stylesheet for maintainability</li>
          <li><strong>Smooth transitions:</strong> CSS transitions for better UX</li>
        </ul>

        <h4>Component Structure:</h4>
        <ul>
          <li><strong>State Management:</strong> Uses <code>useState</code> for hover tracking</li>
          <li><strong>Event Handlers:</strong> <code>onMouseEnter</code> and <code>onMouseLeave</code></li>
          <li><strong>Styling:</strong> External CSS file with minimal styling</li>
          <li><strong>Data Mapping:</strong> Renders links from array using <code>map()</code></li>
        </ul>

        <h4>File Structure:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`Link Previewer/
├── LinkPreviewer.jsx        # Main component
├── LinkPreviewer.css        # Styling
├── LinkPreviewerDemo.jsx    # This demo
├── image.png               # Sample image
└── README.md               # Documentation`}
        </pre>

        <h4>Customization:</h4>
        <p>You can customize the component by:</p>
        <ul>
          <li>Modifying the sample links data structure</li>
          <li>Updating CSS classes for different styling</li>
          <li>Adding loading states for dynamic content</li>
          <li>Integrating with APIs for real-time preview data</li>
          <li>Adding delay timers for hover interactions</li>
        </ul>

        <h4>Common Improvements:</h4>
        <p>For production use, consider adding:</p>
        <ul>
          <li>Loading states while fetching preview data</li>
          <li>Error handling for broken images</li>
          <li>Debounced hover effects</li>
          <li>API integration for dynamic previews</li>
          <li>Keyboard navigation support</li>
        </ul>
      </div>
    </div>
  );
};

export default LinkPreviewerDemo; 