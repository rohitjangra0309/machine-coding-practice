import React from 'react';
import FolderStructure from './FolderStructure';

/**
 * Demo component showing how to use the FolderStructure component
 */
const FolderStructureDemo = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Folder Structure Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Interactive File Explorer Demo</h2>
        <p>
          This component demonstrates a file explorer tree view where users can:
        </p>
        <ul>
          <li>✅ Click on folders to expand/collapse them</li>
          <li>✅ See simple text indicators instead of complex icons</li>
          <li>✅ Navigate through nested folder structures</li>
          <li>✅ Identify file types with simple badges</li>
        </ul>
        
        <h3>Key Features for Interviews:</h3>
        <ul>
          <li>🎯 <strong>Simple indicators:</strong> Uses "+/-" for folders, "JS/CSS/HTML" for files</li>
          <li>🎯 <strong>Easy to code:</strong> No complex icons or external dependencies</li>
          <li>🎯 <strong>Recursive structure:</strong> Clean recursive component pattern</li>
          <li>🎯 <strong>Clear logic:</strong> Easy to explain in interviews</li>
        </ul>
      </div>

      {/* Main component demo */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <FolderStructure />
      </div>

      {/* Usage instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>How to Use FolderStructure Component:</h3>
        
        <h4>Basic Usage:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`import FolderStructure from './FolderStructure';

function App() {
  return (
    <div>
      <FolderStructure />
    </div>
  );
}`}
        </pre>

        <h4>Data Structure:</h4>
        <p>The component uses this simple data structure:</p>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`const fileSystemData = {
  name: "my-project",
  isFolder: true,
  children: [
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.js", isFolder: false },
        { name: "index.js", isFolder: false },
        // ... more files
      ]
    },
    { name: "package.json", isFolder: false }
  ]
};`}
        </pre>

        <h4>Interview-Friendly Features:</h4>
        <ul>
          <li><strong>Simple indicators:</strong> "+" for closed folders, "−" for open folders</li>
          <li><strong>File type badges:</strong> "JS", "CSS", "HTML", "JSON", "MD"</li>
          <li><strong>Recursive pattern:</strong> Easy to explain component composition</li>
          <li><strong>Single state per folder:</strong> Only tracks expanded/collapsed state</li>
          <li><strong>Clean structure:</strong> Easy to code in 30-40 minutes</li>
        </ul>

        <h4>Component Logic:</h4>
        <ul>
          <li><strong>State Management:</strong> Uses <code>useState</code> for expansion state</li>
          <li><strong>Event Handling:</strong> <code>onClick</code> to toggle folder expansion</li>
          <li><strong>Conditional Rendering:</strong> Shows children only when expanded</li>
          <li><strong>Recursion:</strong> Each folder renders its children as <code>FolderItem</code> components</li>
        </ul>

        <h4>File Structure:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`Folder Structure/
├── FolderStructure.jsx        # Main component
├── FolderStructure.css        # Minimal styling
├── FolderStructureDemo.jsx    # This demo
└── README.md                  # Documentation`}
        </pre>

        <h4>Why This Approach is Perfect for Interviews:</h4>
        <ul>
          <li><strong>No emoji/icon complexity:</strong> Simple text indicators are easy to type</li>
          <li><strong>Clear recursion:</strong> Easy to explain how the tree structure works</li>
          <li><strong>Minimal dependencies:</strong> Only uses React built-in features</li>
          <li><strong>Easy to debug:</strong> Simple state management and logic</li>
          <li><strong>Quick to implement:</strong> Can be coded quickly under time pressure</li>
        </ul>

        <h4>Interview Talking Points:</h4>
        <ul>
          <li>"I'm using a recursive component pattern where each folder renders its children"</li>
          <li>"Each folder has its own state to track if it's expanded or collapsed"</li>
          <li>"I'm using simple text indicators instead of icons for simplicity"</li>
          <li>"The data structure is a tree with parent-child relationships"</li>
        </ul>

        <h4>Common Extensions:</h4>
        <p>You can easily extend this component by adding:</p>
        <ul>
          <li>File selection functionality</li>
          <li>Context menu on right-click</li>
          <li>Search functionality</li>
          <li>Drag and drop support</li>
          <li>Icons for different file types</li>
        </ul>
      </div>
    </div>
  );
};

export default FolderStructureDemo; 