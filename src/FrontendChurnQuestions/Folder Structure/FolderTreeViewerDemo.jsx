import React from 'react';
import FolderTreeViewer from './FolderTreeViewer';

/**
 * Demo component showing how to use the FolderTreeViewer component
 */
const FolderTreeViewerDemo = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Folder Tree Viewer Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>ID-Based Array Structure Demo</h2>
        <p>
          This component demonstrates a file explorer for array-based data structures:
        </p>
        <ul>
          <li>✅ Handles array root structure (not single root object)</li>
          <li>✅ Uses ID-based identification for React keys</li>
          <li>✅ Determines folders by presence of children property</li>
          <li>✅ Simple text indicators for different file types</li>
        </ul>
        
        <h3>Key Differences from Original:</h3>
        <ul>
          <li>🔄 <strong>Root structure:</strong> Array of items instead of single root</li>
          <li>🔄 <strong>Identification:</strong> Uses `id` field instead of array index</li>
          <li>🔄 <strong>Folder detection:</strong> Checks for `children` property instead of `isFolder`</li>
          <li>🔄 <strong>File types:</strong> Updated for .md, .doc, .ppt, .txt files</li>
        </ul>
      </div>

      {/* Main component demo */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <FolderTreeViewer />
      </div>

      {/* Usage instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>How to Use FolderTreeViewer Component:</h3>
        
        <h4>Basic Usage:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`import FolderTreeViewer from './FolderTreeViewer';

function App() {
  return (
    <div>
      <FolderTreeViewer />
    </div>
  );
}`}
        </pre>

        <h4>Data Structure:</h4>
        <p>The component uses this array-based structure:</p>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`const folderData = [
  {
    "id": 1,
    "name": "README.md"
  },
  {
    "id": 2,
    "name": "Documents",
    "children": [
      {
        "id": 3,
        "name": "Word.doc"
      },
      {
        "id": 4,
        "name": "Powerpoint.ppt"
      }
    ]
  },
  {
    "id": 5,
    "name": "Downloads",
    "children": [
      {
        "id": 6,
        "name": "unnamed.txt"
      },
      {
        "id": 7,
        "name": "Misc",
        "children": [
          {
            "id": 8,
            "name": "foo.txt"
          },
          {
            "id": 9,
            "name": "bar.txt"
          }
        ]
      }
    ]
  }
];`}
        </pre>

        <h4>Key Features:</h4>
        <ul>
          <li><strong>Array root:</strong> Root is an array of items, not single object</li>
          <li><strong>ID-based keys:</strong> Uses `id` field for React keys</li>
          <li><strong>Folder detection:</strong> Checks if item has `children` property</li>
          <li><strong>File type indicators:</strong> "MD", "DOC", "PPT", "TXT", "FILE"</li>
          <li><strong>Same logic:</strong> Maintains recursive structure and expansion state</li>
        </ul>

        <h4>Component Logic:</h4>
        <ul>
          <li><strong>Root mapping:</strong> Maps over array root instead of single object</li>
          <li><strong>Folder detection:</strong> <code>isFolder(item)</code> checks for children</li>
          <li><strong>Recursive rendering:</strong> Same TreeItem component for all levels</li>
          <li><strong>State management:</strong> Each folder tracks its own expansion state</li>
        </ul>

        <h4>Differences from Original FolderStructure:</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e9ecef' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Aspect</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Original</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>New (TreeViewer)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>Root</strong></td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Single object</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Array of objects</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>Identification</strong></td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>Array index</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>ID field</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>Folder detection</strong></td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>isFolder property</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>children property</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>File types</strong></td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>JS, CSS, HTML, JSON</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>MD, DOC, PPT, TXT</td>
            </tr>
          </tbody>
        </table>

        <h4>Interview Talking Points:</h4>
        <ul>
          <li><strong>Data structure adaptation:</strong> "I modified the component to handle array root instead of single object"</li>
          <li><strong>Folder detection:</strong> "I check for children property to determine if item is a folder"</li>
          <li><strong>ID-based keys:</strong> "I use the id field for React keys to ensure proper re-rendering"</li>
          <li><strong>Same patterns:</strong> "The recursive logic and state management remain the same"</li>
        </ul>

        <h4>When to Use Each Version:</h4>
        <ul>
          <li><strong>FolderStructure:</strong> When you have a single root with explicit isFolder property</li>
          <li><strong>FolderTreeViewer:</strong> When you have array root with ID-based identification</li>
        </ul>
      </div>
    </div>
  );
};

export default FolderTreeViewerDemo; 