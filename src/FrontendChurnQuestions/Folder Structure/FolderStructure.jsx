import React, { useState } from "react";

// **Folder structure data**
const files = {
  name: "root",
  isFolder: true,
  children: [
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.js", isFolder: false },
        { name: "Folder.js", isFolder: false },
        { name: "data.js", isFolder: false },
        { name: "Index.js", isFolder: false },
        { name: "styles.css", isFolder: false },
      ],
    },
    {
      name: "public",
      isFolder: true,
      children: [
        { name: "index.html", isFolder: false },
        { name: "styles.css", isFolder: false },
      ],
    },
    { name: "package.json", isFolder: false },
  ],
};

// **Function to get the correct file icon based on file type**
const getFileIcon = (name) => {
  if (name.endsWith(".js")) return "📜"; // JavaScript files
  if (name.endsWith(".css")) return "🎨"; // CSS files
  if (name.endsWith(".html")) return "📄"; // HTML files
  if (name.endsWith(".json")) return "📝"; // JSON files
  return "📁"; // Default folder icon
};

// **Recursive Folder Component**
const Folder = ({ data, level = 0 }) => {
  // **State to track whether the folder is open or closed**
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginLeft: level * 15 + "px" }}>
      {/* **Folder or File Name** */}
      <div
        style={{
          cursor: data.isFolder ? "pointer" : "default", // Only folders are clickable
          fontWeight: data.isFolder ? "bold" : "normal",
          color: data.isFolder ? "#007acc" : "#ccc", // Folder has blue text, files have gray text
          display: "flex",
          alignItems: "center",
        }}
        // **Clicking a folder toggles its open/close state**
        onClick={() => data.isFolder && setIsOpen(!isOpen)}
      >
        {/* **Display folder icon (open/close) or file icon** */}
        {data.isFolder ? (isOpen ? "📂" : "📁") : getFileIcon(data.name)}

        {/* **Display the name of the file/folder** */}
        <span style={{ marginLeft: "5px" }}>{data.name}</span>
      </div>

      {/* **Render children if the folder is open** */}
      {isOpen &&
        data.isFolder &&
        data.children.map((child, index) => (
          <Folder key={index} data={child} level={level + 1} />
        ))}
    </div>
  );
};

// **Main Component that renders the folder structure**
const FolderStructure = () => {
  return (
    <div style={styles.container}>
      <h3>📂 VS Code Folder Structure</h3>
      <Folder data={files} />
    </div>
  );
};

// **CSS Styles (Inline)**
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "20px auto",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#222", // Dark background (VS Code theme)
    color: "#eee",
  },
};

export default FolderStructure;
