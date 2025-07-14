import React, { useEffect, useState, useRef } from "react";

const TrafficLight = () => {
  const [light, setLight] = useState("red");
  const timeoutRef = useRef(null);

  // Delay per light color
  const getDelay = (color) => {
    switch (color) {
      case "red":
        return 3000;
      case "green":
        return 3000;
      case "yellow":
        return 1000;
      default:
        return 3000;
    }
  };

  // Get next light in sequence
  const getNextLight = (current) => {
    if (current === "red") return "green";
    if (current === "green") return "yellow";
    return "red";
  };

  useEffect(() => {
    const changeLight = () => {
      const next = getNextLight(light);
      timeoutRef.current = setTimeout(() => {
        setLight(next);
      }, getDelay(next));
    };

    changeLight();

    return () => clearTimeout(timeoutRef.current); // cleanup
  }, [light]);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.light,
          backgroundColor: light === "red" ? "red" : "gray",
        }}
      />
      <div
        style={{
          ...styles.light,
          backgroundColor: light === "yellow" ? "yellow" : "gray",
        }}
      />
      <div
        style={{
          ...styles.light,
          backgroundColor: light === "green" ? "green" : "gray",
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "100px",
    background: "#222",
    padding: "10px",
    borderRadius: "10px",
  },
  light: {
    width: "60px",
    height: "60px",
    margin: "10px auto",
    borderRadius: "50%",
    transition: "background-color 0.3s ease",
  },
};

export default TrafficLight;


//  What to say in the interview:
// “I'm using useState to track the current light color. I use a useRef to store the timeout so I can clear it properly. In useEffect, I recursively trigger a new timeout each time the light changes. This avoids timing drift and makes it easy to assign dynamic delays per light. I also ensure cleanup to prevent memory leaks when the component unmounts.”