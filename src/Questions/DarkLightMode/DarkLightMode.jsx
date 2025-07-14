import React, { useState, useEffect } from 'react';
import './DarkLightMode.css';

const DarkLightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to update the body class when mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]); // This effect runs whenever `isDarkMode` changes

  return (
    <div className="dark-light-mode">
      <h1>{isDarkMode ? "Dark Mode" : "Light Mode"}</h1>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle Mode
      </button>
    </div>
  );
};

export default DarkLightMode;
