import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ initialMinutes = 5 }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes === 0) {
          clearInterval(intervalId);
        } else {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId); // cleanup
  }, [seconds, minutes]); // re-run effect when either changes

  const format = (value) => String(value).padStart(2, '0');


//   You're formatting numbers like 5 to look like 05.
// const seconds = String(5).padStart(2, '0'); // "05"
// This ensures the timer always shows:
// 01:09 instead of 1:9
// 00:05 instead of 0:5



  return (
    <div className='timer-container'>
      {format(minutes)}:{format(seconds)}
    </div>
  );
};

export default CountdownTimer;



//  Issues in your current code:
// setInterval is called directly in the render function

// This creates multiple intervals on every re-render and causes memory leaks or bugs.

// No cleanup function

// setInterval should be cleared when the component unmounts.

// Missing useEffect

// setInterval should be set up inside useEffect.



// import React, { useEffect, useState } from 'react'
// import './CountdownTimer.css'

// const CountdownTimer = () => {
//     // Create a Date object for the current time
//     const now = new Date();

//     // Extract hours, minutes, and seconds
//     const hours = String(now.getHours()).padStart(2, '0');   // 0-23
//     const minutes = String(now.getMinutes()).padStart(2, '0'); // 0-59
//     const seconds = String(now.getSeconds()).padStart(2, '0'); // 0-59

//     // Format as HH:MM:SS
//     const timeString = `${hours}:${minutes}:${seconds}`;

//     const [currentTime, setCurrentTime] = useState(timeString)

//     setInterval(() => {
//         const now = new Date();

//         // Extract hours, minutes, and seconds
//         const hours = String(now.getHours()).padStart(2, '0');   // 0-23
//         const minutes = String(now.getMinutes()).padStart(2, '0'); // 0-59
//         const seconds = String(now.getSeconds()).padStart(2, '0'); // 0-59
//         const timeString = `${hours}:${minutes}:${seconds}`;
//         setCurrentTime(timeString)
//     }, 1000)
//     // console.log(timeString); // e.g., "14:05:09"
//     return (
//         <div>{currentTime}</div>
//     )
// }

// export default CountdownTimer