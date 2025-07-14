import React, { useState } from "react";

const ChipsInputBelow = () => {
  const [chips, setChips] = useState([]);
  const [input, setInput] = useState("");

  const addChip = (value) => {
    const trimmed = value.trim();
    if (trimmed && !chips.includes(trimmed)) {
      setChips([...chips, trimmed]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip(input);
      setInput("");
    }
  };

  const handleRemove = (chipToRemove) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter or comma"
        style={styles.input}
      />
      <div style={styles.chipsContainer}>
        {chips.map((chip) => (
          <div key={chip} style={styles.chip}>
            {chip}
            <button
              onClick={() => handleRemove(chip)}
              style={styles.removeButton}
              aria-label={`Remove ${chip}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "sans-serif",
    maxWidth: "400px",
    margin: "30px auto",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  chipsContainer: {
    marginTop: "12px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
  },
  removeButton: {
    marginLeft: "8px",
    border: "none",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "1",
  },
};

export default ChipsInputBelow;
