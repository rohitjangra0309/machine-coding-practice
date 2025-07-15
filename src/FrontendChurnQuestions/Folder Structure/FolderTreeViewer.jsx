import React, { useState } from "react";
import "./FolderStructure.css";

/**
 * FolderTreeViewer Component - Handles array-based folder structure with IDs
 * 
 * Features:
 * - Handles array root structure
 * - Uses ID-based identification
 * - Determines folders by presence of children
 * - Clean recursive structure
 * 
 * @component
 */

// New data structure as provided
const folderData = [
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
];

/**
 * Check if item is a folder (has children)
 * @param {Object} item - The item to check
 * @returns {boolean} - True if item is a folder
 */
const isFolder = (item) => {
  return item.children && item.children.length > 0;
};

/**
 * Get file type indicator based on file extension
 * @param {string} fileName - Name of the file
 * @returns {string} - Simple text indicator
 */
const getFileType = (fileName) => {
  if (fileName.endsWith(".md")) return "MD";
  if (fileName.endsWith(".doc")) return "DOC";
  if (fileName.endsWith(".ppt")) return "PPT";
  if (fileName.endsWith(".txt")) return "TXT";
  return "FILE";
};

/**
 * TreeItem Component - Recursive component for each file/folder
 * @param {Object} item - File or folder object
 * @param {number} level - Nesting level for indentation
 */
const TreeItem = ({ item, level = 0 }) => {
  // State to track if folder is expanded
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if current item is a folder
  const itemIsFolder = isFolder(item);

  /**
   * Toggle folder expansion
   */
  const toggleFolder = () => {
    if (itemIsFolder) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      {/* Main item */}
      <div
        className={`folder-item ${itemIsFolder ? 'folder' : 'file'}`}
        onClick={toggleFolder}
        style={{ marginLeft: level * 20 + 'px' }}
      >
        {/* Icon/indicator */}
        <span className="folder-icon">
          {itemIsFolder ? (isExpanded ? '−' : '+') : getFileType(item.name)}
        </span>
        
        {/* Name */}
        <span className="folder-name">{item.name}</span>
      </div>

      {/* Children (if folder is expanded) */}
      {isExpanded && itemIsFolder && (
        <div className="folder-children">
          {item.children.map((child) => (
            <TreeItem
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main FolderTreeViewer Component
 */
const FolderTreeViewer = () => {
  return (
    <div className="folder-structure-container">
      <h2 className="folder-structure-title">Folder Tree Viewer</h2>
      
      <div className="folder-tree">
        {folderData.map((item) => (
          <TreeItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FolderTreeViewer; 