import React, { useState } from "react";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (activeTab < 2) setActiveTab(activeTab + 1);
  };

  const handlePrev = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  const tabs = ["Personal", "Address", "Review"];

  return (
    <div style={styles.container}>
      <div style={styles.tabHeader}>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === idx ? "#ccc" : "#eee",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={styles.tabContent}>
        {activeTab === 0 && (
          <>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        {activeTab === 1 && (
          <>
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        {activeTab === 2 && (
          <div>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>Zip:</strong> {formData.zip}</p>
          </div>
        )}
      </div>

      <div style={styles.buttonRow}>
        {activeTab > 0 && (
          <button onClick={handlePrev} style={styles.navButton}>
            Previous
          </button>
        )}
        {activeTab < 2 ? (
          <button onClick={handleNext} style={styles.navButton}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} style={styles.navButton}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "30px auto",
    fontFamily: "sans-serif",
  },
  tabHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  tabButton: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  tabContent: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  navButton: {
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default TabForm;
