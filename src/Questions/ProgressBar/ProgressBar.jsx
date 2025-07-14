import React, { useEffect, useState } from 'react'
import './ProgressBar.css'


// transform: translateX(`${value}%`)
// translateX is a CSS function, but it's being used like a JavaScript function.

// translateX should be inside a string.

// transform: `translateX(${value}%)`

// ProgressBar component to display a progress bar with animation
const ProgressBar = ({ value }) => {
    // State to hold the animated value (initial value is 0)
    const [animatedValue, setAnimatedValue] = useState(0);

    // useEffect hook to update the animated value when `value` changes
    useEffect(() => {
        // After 1 second, update the animated value to the current `value`
        setTimeout(() => setAnimatedValue(value), 1000);
    }, [value]);  // Dependency array ensures it triggers when `value` changes

  return (
    <div className='outerBorder'>
      {/* Outer border containing the progress bar */}
      <div className='innerBorder' style={{
          // Dynamically set width based on the animated value
          width: `${animatedValue}%`,
          
          // Dynamically set the background color based on the animated value
          backgroundColor: animatedValue <= 10 ? "red" : "#4caf50" // Red for <= 10%, Green for > 10%
      }}>
        {/* Display the progress value inside the progress bar */}
        {value} %
      </div>
    </div>
  );
}

export default ProgressBar;
