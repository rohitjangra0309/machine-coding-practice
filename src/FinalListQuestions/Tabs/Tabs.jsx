import React, { useState } from "react";

const Tabs = () => {
  const tabs = ["Home", "Profile", "Settings"];
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <p>Welcome to the Home page!</p>;
      case "Profile":
        return <p>This is your Profile.</p>;
      case "Settings":
        return <p>Adjust your Settings here.</p>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              borderBottom: activeTab === tab ? "2px solid blue" : "none",
              fontWeight: activeTab === tab ? "bold" : "normal",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={styles.content}>{renderContent()}</div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    width: "300px",
    margin: "auto",
    textAlign: "center",
  },
  tabList: {
    display: "flex",
    justifyContent: "space-around",
    borderBottom: "1px solid #ccc",
    marginBottom: "10px",
  },
  tab: {
    color: 'black',
    flex: 1,
    padding: "10px",
    cursor: "pointer",
    background: "none",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  content: {
    padding: "10px",
  },
};

export default Tabs;

// What to Say in the Interview:
// “I’ve stored the current active tab in a useState variable. The tabs are rendered dynamically using .map(), which avoids repetition. On click, the active tab updates and triggers re-rendering of its content. I used inline styling to highlight the active tab with a bottom border and bold font.”