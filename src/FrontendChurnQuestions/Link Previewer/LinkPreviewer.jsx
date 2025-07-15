import React, { useState } from "react";
import image from "./image.png";
import "./LinkPreviewer.css";

/**
 * LinkPreviewer Component - Shows preview cards on hover for links
 * 
 * Features:
 * - Hover to show preview cards
 * - Clean, reusable component structure
 * - Sample data for demonstration
 * 
 * @component
 */
const LinkPreviewer = () => {
  // Track which link is currently being hovered
  const [hoveredLink, setHoveredLink] = useState(null);

  // Sample links data (in real app, this would come from props or API)
  const sampleLinks = [
    {
      id: 1,
      text: "Visit React Documentation",
      url: "https://reactjs.org/docs",
      preview: {
        title: "React Documentation",
        description: "Learn React with the official documentation. Build user interfaces with components, props, and state management.",
        image: image,
        url: "reactjs.org"
      }
    },
    {
      id: 2,
      text: "Check out JavaScript Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      preview: {
        title: "JavaScript Guide - MDN",
        description: "Complete guide to JavaScript programming language with examples and best practices.",
        image: image,
        url: "developer.mozilla.org"
      }
    },
    {
      id: 3,
      text: "Learn CSS Grid Layout",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      preview: {
        title: "Complete Guide to CSS Grid",
        description: "Everything you need to know about CSS Grid layout system with practical examples.",
        image: image,
        url: "css-tricks.com"
      }
    }
  ];

  /**
   * Handle mouse enter on a link
   * @param {number} linkId - The ID of the link being hovered
   */
  const handleMouseEnter = (linkId) => {
    setHoveredLink(linkId);
  };

  /**
   * Handle mouse leave from a link
   */
  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <div className="link-previewer-container">
      <h1 className="link-previewer-title">Link Previewer Demo</h1>
      
      <div className="links-list">
        {sampleLinks.map((link) => (
          <div 
            key={link.id} 
            className="link-item"
            onMouseEnter={() => handleMouseEnter(link.id)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="link-text">
              {link.text}
            </span>
            
            {/* Show preview card when this link is hovered */}
            {hoveredLink === link.id && (
              <div className="preview-card">
                <img
                  src={link.preview.image}
                  alt={link.preview.title}
                  className="preview-image"
                />
                <h3 className="preview-title">{link.preview.title}</h3>
                <p className="preview-description">{link.preview.description}</p>
                <p className="preview-url">{link.preview.url}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkPreviewer;
