import React, { useState } from "react";
import "./FolderStructure.css";

/**
 * FolderStructure Component - A file explorer tree view
 * 
 * Features:
 * - Expandable/collapsible folders
 * - Simple text indicators instead of icons
 * - Clean recursive structure
 * - Easy to understand and explain
 * 
 * @component
 */

// Sample folder structure data
const fileSystemData = {
  name: "my-project",
  isFolder: true,
  children: [
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.js", isFolder: false },
        { name: "index.js", isFolder: false },
        { name: "styles.css", isFolder: false },
        {
          name: "components",
          isFolder: true,
          children: [
            { name: "Header.js", isFolder: false },
            { name: "Footer.js", isFolder: false },
          ],
        },
      ],
    },
    {
      name: "public",
      isFolder: true,
      children: [
        { name: "index.html", isFolder: false },
        { name: "favicon.ico", isFolder: false },
      ],
    },
    { name: "package.json", isFolder: false },
    { name: "README.md", isFolder: false },
  ],
};

/**
 * Get file type indicator based on file extension
 * @param {string} fileName - Name of the file
 * @returns {string} - Simple text indicator
 */
const getFileType = (fileName) => {
  if (fileName.endsWith(".js")) return "JS";
  if (fileName.endsWith(".css")) return "CSS";
  if (fileName.endsWith(".html")) return "HTML";
  if (fileName.endsWith(".json")) return "JSON";
  if (fileName.endsWith(".md")) return "MD";
  return "FILE";
};

/**
 * FolderItem Component - Recursive component for each file/folder
 * @param {Object} item - File or folder object
 * @param {number} level - Nesting level for indentation
 */
const FolderItem = ({ item, level = 0 }) => {
  // State to track if folder is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Toggle folder expansion
   */
  const toggleFolder = () => {
    if (item.isFolder) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      {/* Main item */}
      <div
        className={`folder-item ${item.isFolder ? 'folder' : 'file'}`}
        onClick={toggleFolder}
        style={{ marginLeft: level * 20 + 'px' }}
      >
        {/* Icon/indicator */}
        <span className="folder-icon">
          {item.isFolder ? (isExpanded ? '−' : '+') : getFileType(item.name)}
        </span>
        
        {/* Name */}
        <span className="folder-name">{item.name}</span>
      </div>

      {/* Children (if folder is expanded) */}
      {isExpanded && item.isFolder && item.children && (
        <div className="folder-children">
          {item.children.map((child, index) => (
            <FolderItem
              key={index}
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
 * Main FolderStructure Component
 */
const FolderStructure = () => {
  return (
    <div className="folder-structure-container">
      <h2 className="folder-structure-title">File Explorer</h2>
      
      <div className="folder-tree">
        <FolderItem item={fileSystemData} />
      </div>
    </div>
  );
};

export default FolderStructure;
