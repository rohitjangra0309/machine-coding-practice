import React, { useState } from "react";
import image from '../../assets/image.png';
import "./LinkPreviewer.css";

/**
 * LinkPreviewer Component - Shows preview cards on hover
 * Core functionality: hover to show/hide preview cards
 */
const LinkPreviewer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  // Sample data - in real app this would come from props
  const links = [
    {
      id: 1,
      text: "Visit React Documentation",
      preview: {
        title: "React Documentation",
        description: "Learn React with the official documentation. Build user interfaces with components.",
        image: image,
        url: "reactjs.org"
      }
    },
    {
      id: 2,
      text: "Check out JavaScript Guide",
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
      preview: {
        title: "Complete Guide to CSS Grid",
        description: "Everything you need to know about CSS Grid layout system with practical examples.",
        image: image,
        url: "css-tricks.com"
      }
    }
  ];

  return (
    <div className="link-previewer">
      <h2>Link Previewer</h2>
      
      <div className="links-container">
        {links.map((link) => (
          <div 
            key={link.id} 
            className="link-item"
            onMouseEnter={() => setHoveredLink(link.id)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <span className="link-text">{link.text}</span>
            
            {hoveredLink === link.id && (
              <div className="preview-card">
                <img src={link.preview.image} alt={link.preview.title} />
                <h3>{link.preview.title}</h3>
                <p>{link.preview.description}</p>
                <small>{link.preview.url}</small>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkPreviewer;
