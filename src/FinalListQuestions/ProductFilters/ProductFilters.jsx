import React, { useState } from "react";

const products = [
  { id: 1, name: "iPhone", category: "Electronics", price: 900 },
  { id: 2, name: "T-shirt", category: "Clothing", price: 20 },
  { id: 3, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 4, name: "Jeans", category: "Clothing", price: 45 },
  { id: 5, name: "Book", category: "Books", price: 15 },
  { id: 6, name: "Tablet", category: "Electronics", price: 450 },
];

const allCategories = [...new Set(products.map(p => p.category))];

const ProductFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch =
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice));
    return categoryMatch && priceMatch;
  });

  return (
    <div style={styles.container}>
      <h2>Product Filters</h2>

      <div style={styles.filters}>
        <div style={styles.section}>
          <h4>Category</h4>
          {allCategories.map((cat) => (
            <label key={cat} style={styles.label}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div style={styles.section}>
          <h4>Price Range</h4>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      <div>
        <h3>Products ({filteredProducts.length})</h3>
        <ul style={styles.list}>
          {filteredProducts.map((product) => (
            <li key={product.id} style={styles.item}>
              {product.name} - {product.category} - ₹{product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
  },
  filters: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontSize: "14px",
  },
  input: {
    width: "80px",
    marginBottom: "8px",
    padding: "4px",
    fontSize: "14px",
  },
  list: {
    paddingLeft: "0",
    listStyle: "none",
  },
  item: {
    padding: "8px",
    borderBottom: "1px solid #ccc",
  },
};

export default ProductFilters;
