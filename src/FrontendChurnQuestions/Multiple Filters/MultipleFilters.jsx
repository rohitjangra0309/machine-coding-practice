import React, { useState } from 'react';
import { items } from './items';
import './MultipleFilters.css';

/**
 * A React component for filtering a list of items by multiple categories.
 * Perfect for a machine coding interview setting.
 */
const MultipleFilters = () => {
  const [activeFilters, setActiveFilters] = useState([]);

  // Get unique categories from the items list.
  const availableCategories = [...new Set(items.map(item => item.category))].sort();

  // Toggle a filter on or off.
  const toggleFilter = (category) => {
    setActiveFilters(prev =>
      prev.includes(category)
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

  // Clear all active filters.
  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  // Determine the list of items to display based on active filters.
  const filteredItems = activeFilters.length === 0
    ? items
    : items.filter(item => activeFilters.includes(item.category));

  return (
    <div className="filters-container">
      <h2 className="filters-title">Product Filters</h2>

      <div className="filter-buttons">
        {availableCategories.map(category => (
          <button
            key={category}
            className={`filter-button ${activeFilters.includes(category) ? 'active' : ''}`}
            onClick={() => toggleFilter(category)}
          >
            {category}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button
            className="filter-button clear-all"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="items-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={`${item.name}-${index}`} className="item-card">
              <div className="item-name">{item.name}</div>
              <div className="item-category">{item.category}</div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No items match the selected filters.</p>
            <button
              className="filter-button"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleFilters;
