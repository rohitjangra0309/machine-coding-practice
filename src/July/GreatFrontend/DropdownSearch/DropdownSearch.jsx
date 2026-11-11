import React, { useState, useEffect, useRef } from "react";

const DropdownSearch = () => {
  const options = ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad"];
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    setSearch(item);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ width: "200px", position: "relative", fontFamily: "sans-serif" }}>
      <input
        type="text"
        value={search}
        placeholder="Select a city"
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
      />
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 1000,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {filtered.length ? (
            filtered.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: item === selected ? "#e3f2fd" : "white",
                  color: "#333",
                  borderBottom: "1px solid #eee",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = item === selected ? "#e3f2fd" : "white";
                }}
              >
                {item}
              </li>
            ))
          ) : (
            <li style={{ padding: "8px", color: "#999", backgroundColor: "white" }}>No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownSearch;