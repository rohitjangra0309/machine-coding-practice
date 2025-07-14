import React, { useState } from "react";

const StarRating = () => {
  const [selectedRating, setSelectedRating] = useState(0); // clicked rating
  const [hoverRating, setHoverRating] = useState(0);       // hovered rating

  const handleClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            ...styles.star,
            color:
              hoverRating >= star || selectedRating >= star ? "#ffc107" : "#ccc",
          }}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
      <div style={styles.label}>Rating: {selectedRating}</div>
    </div>
  );
};

const styles = {
  container: {
    fontSize: "32px",
    textAlign: "center",
    marginTop: "20px",
  },
  star: {
    cursor: "pointer",
    transition: "color 0.2s",
    padding: "0 5px",
  },
  label: {
    fontSize: "18px",
    marginTop: "10px",
  },
};

export default StarRating;


//  What to say in the interview:
// “I’m mapping over five stars and using useState to store the selected rating and hovered rating separately. On hover, I temporarily highlight stars using onMouseEnter. On click, I save the selected rating using setSelectedRating. This pattern ensures smooth UX and accurate rating capture.”