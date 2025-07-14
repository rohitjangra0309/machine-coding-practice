import React, { useState } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(100); // starting with 100 likes

  const handleClick = () => {
    setLiked((prev) => !prev);
    setCount((prev) => prev + (liked ? -1 : 1)); // toggle count
  };

  return (
    <button onClick={handleClick} style={styles.button}>
      {liked ? "❤️" : "🤍"} {count}
    </button>
  );
};

const styles = {
  button: {
    fontSize: "24px",
    padding: "10px 20px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
  },
};

export default LikeButton;


// What to say in the interview:
// “I’m using useState to track both the liked state and count. When the user clicks the button, it toggles liked, and updates the count accordingly. The emoji changes based on the state. This approach is clean, avoids unnecessary re-renders, and handles edge cases like toggling back and forth properly.”