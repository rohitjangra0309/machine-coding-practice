import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  const INITIAL_TIME = 60; // in seconds
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start countdown
  const start = () => {
    if (isRunning || timeLeft <= 0) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Pause countdown
  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset to initial time
  const reset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(INITIAL_TIME);
    setIsRunning(false);
  };

  // Cleanup when unmounted
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.timer}>{formatTime(timeLeft)}</h2>
      <div>
        <button onClick={start} style={styles.button} disabled={isRunning || timeLeft === 0}>
          Start
        </button>
        <button onClick={pause} style={styles.button} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={reset} style={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "200px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  timer: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  button: {
    padding: "8px 16px",
    margin: "0 5px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default CountdownTimer;


// “I use useState to manage time and running state, and useRef to store the interval ID. The timer counts down every second using setInterval. When it reaches 0, I clear the interval to avoid unnecessary processing. I also provide Start, Pause, and Reset controls. Cleanup is handled using useEffect’s return function. The display is formatted as MM:SS.”