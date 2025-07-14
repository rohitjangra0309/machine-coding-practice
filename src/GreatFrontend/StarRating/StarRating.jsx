import React, { useState } from 'react'

import './StarRating.css'

import { StarRatingIcon, StarRatingIconFilled } from './StarRatingIcon'

const StarRating = ({ maxStars = 5, filledStars = 0 }) => {
  const [hoveredStars, setHoveredStars] = useState(0); // Number of stars under hover
  const [currentRating, setCurrentRating] = useState(filledStars); // Current selected rating

  const handleMouseEnter = (index) => {
    setHoveredStars(index + 1); // Fill stars on hover
  };

  const handleMouseLeave = () => {
    setHoveredStars(0); // Reset hover state
  };

  const handleClick = (index) => {
    setCurrentRating(index + 1); // Set rating based on the clicked star
  };

  // Helper function to determine whether a star should be filled or not
  const getStarState = (index) => {
    return hoveredStars > index || currentRating > index;
  };

  return (
    <div className="star-rating-container">
      {Array.from({ length: maxStars }).map((_, index) => (
        <span
          key={index}
          className="star"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          {getStarState(index) ? <StarRatingIconFilled /> : <StarRatingIcon />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
