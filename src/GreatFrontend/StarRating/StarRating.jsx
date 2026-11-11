import React, { useState } from 'react'

import './StarRating.css'

import { StarRatingIcon, StarRatingIconFilled } from './StarRatingIcon'



function StarRating({ maxStars = 5, initialRating = 0 }) {
  const [selected, setSelected] = useState(initialRating); // clicked value
  const [hovered, setHovered] = useState(null); // temporary hover value

  return (
    <div
      style={{ display: "flex", gap: "4px", cursor: "pointer" }}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const index = i + 1; // star number: 1 to maxStars
        const filled = hovered !== null ? index <= hovered : index <= selected;

        return (
          <span
            key={index}
            onMouseEnter={() => setHovered(index)}
            onClick={() => setSelected(index)}
          >
            {filled ? <StarRatingIconFilled /> : <StarRatingIcon />}
          </span>
        );
      })}
    </div>
  );
}


export default StarRating;
