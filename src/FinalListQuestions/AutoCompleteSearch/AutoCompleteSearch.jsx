import React, { useState, useEffect, useRef } from "react";

const AutoCompleteSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      setSuggestions(data.products || []);
    } catch (error) {
      setSuggestions([]);
      console.error("Error fetching suggestions:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    // Clear previous debounce timer
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Set new debounce timer
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 500); // 500ms debounce delay
  };

  const handleSelect = (product) => {
    setQuery(product.title);
    setSuggestions([]);
  };

  return (
    <div style={styles.container}>
      <h3>Auto Complete Search</h3>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        style={styles.input}
      />
      {loading && <div style={styles.loading}>Loading...</div>}

      {suggestions.length > 0 && (
        <ul style={styles.suggestionsList}>
          {suggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelect(product)}
              style={styles.suggestionItem}
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    fontFamily: "sans-serif",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  loading: {
    marginTop: "8px",
    fontStyle: "italic",
    color: "#888",
  },
  suggestionsList: {
    listStyle: "none",
    paddingLeft: 0,
    marginTop: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: "200px",
    overflowY: "auto",
  },
  suggestionItem: {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
};

export default AutoCompleteSearch;
