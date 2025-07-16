import React from "react";
import FileExplorer from "./FileExplorer";

/**
 * Demo component for FileExplorer
 * Shows how to use the FileExplorer component
 */
const FileExplorerDemo = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>File Explorer Demo</h1>
      <p>Click [+] to expand folders, [-] to collapse them.</p>
      <FileExplorer />
    </div>
  );
};

export default FileExplorerDemo; 