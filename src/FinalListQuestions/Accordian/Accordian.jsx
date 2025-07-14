import React, { useState } from "react";

const Accordion = () => {
  // Track open section by index; -1 means none open
  const [openIndex, setOpenIndex] = useState(-1);

  const sections = [
    { title: "Section 1", content: "Content for section 1." },
    { title: "Section 2", content: "Content for section 2." },
    { title: "Section 3", content: "Content for section 3." },
  ];

  const toggleSection = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div style={styles.container}>
      {sections.map((section, index) => (
        <div key={index} style={styles.section}>
          <div
            style={styles.title}
            onClick={() => toggleSection(index)}
          >
            {section.title} {openIndex === index ? "▲" : "▼"}
          </div>
          {openIndex === index && (
            <div style={styles.content}>{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
    overflow: "hidden",
  },
  title: {
    background: "#f0f0f0",
    padding: "10px",
    cursor: "pointer",
    userSelect: "none",
    fontWeight: "bold",
  },
  content: {
    padding: "10px",
    background: "white",
  },
};

export default Accordion;


// What to say in an interview:
// “I’m managing the open/close state using useState and tracking which section is currently open by its index. Clicking a section toggles it open or closed. Only one section can be open at a time. The arrow icon changes direction accordingly. The code is scalable if I want to add more sections.”