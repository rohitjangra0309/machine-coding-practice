import React, { useState } from "react";
import "./FileExplorer.css";

// Sample data - in real app this would come from props
const data = [
  {
    id: 1,
    name: "README.md"
  },
  {
    id: 2,
    name: "Documents",
    children: [
      {
        id: 3,
        name: "resume.doc"
      },
      {
        id: 4,
        name: "Projects", 
        children: [
          {
            id: 5,
            name: "project1.txt"
          },
          {
            id: 6,
            name: "project2.txt"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Pictures",
    children: [
      {
        id: 8,
        name: "vacation.jpg"
      },
      {
        id: 9,
        name: "family.png"
      }
    ]
  }
];

/**
 * Individual file/folder item component
 * Uses props drilling to maintain state in parent
 */
const FileExplorerItem = ({ item, expandedItems, toggleExpanded }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems[item.id] || false;

  return (
    <div className="file-item">
      <div className="item-content">
        {/* File/Folder name */}
        <span className="item-name">{item.name}</span>
        
        {/* Expand/Collapse button for folders */}
        {hasChildren && (
          <span 
            className="toggle-btn"
            onClick={() => toggleExpanded(item.id)}
          >
            {isExpanded ? '[-]' : '[+]'}
          </span>
        )}
      </div>
      
      {/* Render children if folder is expanded */}
      {hasChildren && isExpanded && (
        <div className="children">
          {item.children.map((child) => (
            <FileExplorerItem 
              key={child.id}
              item={child}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main FileExplorer component
 * Manages expanded state for all items in single place
 */
const FileExplorer = () => {
  // Single state object to track all expanded items by ID
  const [expandedItems, setExpandedItems] = useState({});
  
  /**
   * Toggle expanded state for a specific item
   */
  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className="file-explorer">
      <h2>File Explorer</h2>
      {data.map((item) => (
        <FileExplorerItem 
          key={item.id}
          item={item}
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
        />
      ))}
    </div>
  );
};

export default FileExplorer;