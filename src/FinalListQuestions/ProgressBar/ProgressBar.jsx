import React, { useState, useEffect, useRef } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startProgress = () => {
    if (intervalRef.current) return; // avoid multiple intervals

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 100;
        }
        return prev + 1; // 1% increment
      });
    }, 50); // updates every 50ms (5 seconds total)
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // cleanup on unmount
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.track}>
        <div style={{ ...styles.bar, width: `${progress}%` }} />
      </div>
      <div style={styles.label}>{progress}%</div>
      <div>
        <button onClick={startProgress} disabled={progress >= 100} style={styles.button}>
          Start
        </button>
        <button onClick={reset} style={styles.button}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  track: {
    height: "20px",
    width: "100%",
    background: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  bar: {
    height: "100%",
    background: "#4caf50",
    transition: "width 0.05s linear",
  },
  label: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    margin: "5px",
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default ProgressBar;


// “I use useState to manage the current progress, and useRef to track the interval ID so that we don’t create duplicate timers. The setInterval increases progress by 1% every 50ms, giving a smooth transition. I ensure cleanup using clearInterval and a cleanup function in useEffect. The width of the progress bar is controlled dynamically via inline styles.”