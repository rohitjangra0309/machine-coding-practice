import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start stopwatch
  const start = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10); // update every 10ms for centisecond accuracy
  };

  // Stop stopwatch
  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  // Reset stopwatch
  const reset = () => {
    stop();
    setTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format time: mm:ss:cs
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const centiseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div style={styles.container}>
      <h1>{formatTime(time)}</h1>
      <div>
        <button onClick={start} disabled={isRunning} style={styles.button}>Start</button>
        <button onClick={stop} disabled={!isRunning} style={styles.button}>Stop</button>
        <button onClick={reset} style={styles.button}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  button: {
    margin: "5px",
    padding: "10px 20px",
    fontSize: "16px",
  },
};

export default Stopwatch;


// What to say in an interview:
// “I'm using useRef to persist the interval ID and prevent multiple intervals from being created. useEffect ensures cleanup. The time is stored in milliseconds for easy math and formatted into mm:ss:cs. The buttons are conditionally disabled based on the state, ensuring a clean user experience.”