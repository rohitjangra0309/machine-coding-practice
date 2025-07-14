import React, { useState } from "react";
import "./styles.css";

// 0% start state and 100% end state in keyframes animation

export const InsertText = () => {
  const [text, setText] = useState([]);
  const [input, setInput] = useState(""); 

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 

      const newText = input.trim(); 
      if (newText) {
        setText([...text, newText]);
        setInput(""); 
      }
    }
  };

  return (
    <div>
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        rows="5"
        cols="40"
        placeholder="Type something and press Enter..."
      />
      <div>
        <h3>Saved Texts:</h3>
        <ul>
          {text.map((item, index) => (
            <li key={index} className="highlighted">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsertText;
