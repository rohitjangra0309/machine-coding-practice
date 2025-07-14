import React, { useState } from 'react';
import { items as defaultItems } from './items';

export default function MultipleFilters() {
  const [activeFilters, setActiveFilters] = useState([]);

  const filters = ['Bags', 'Watches', 'Sports', 'Sunglasses'];

  const handleFilterClick = (filter) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredItems =
    activeFilters.length > 0
      ? defaultItems.filter((item) => activeFilters.includes(item.category))
      : defaultItems;

  const buttonStyle = {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: 'green',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'blue',
    color: 'white',
  };

  const buttonsContainerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const itemsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const itemStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '150px',
    textAlign: 'center',
  };

  const categoryStyle = {
    fontSize: '0.9em',
    color: '#888',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Algochurn Filters</h2>
      <div style={buttonsContainerStyle}>
        {filters.map((filter, idx) => (
          <button
            style={activeFilters.includes(filter) ? activeButtonStyle : buttonStyle}
            key={`filters-${idx}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div style={itemsContainerStyle}>
        {filteredItems.map((item, idx) => (
          <div key={`items-${idx}`} style={itemStyle}>
            <p>{item.name}</p>
            <p style={categoryStyle}>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
