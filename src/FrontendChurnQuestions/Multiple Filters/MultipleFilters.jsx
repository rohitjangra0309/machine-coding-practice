import React, { useState } from 'react';
import { items } from './items';
import './MultipleFilters.css';

/**
 * MultipleFilters Component - A product filtering interface
 * 
 * Features:
 * - Multiple filter selection (toggle on/off)
 * - Shows all items when no filters are active
 * - Results count display
 * 
 * @component
 */
const MultipleFilters = () => {
  // State to track which filters are currently active
  const [activeFilters, setActiveFilters] = useState([]);

  // Available filter categories (derived from items data)
  const availableCategories = [...new Set(items.map(item => item.category))].sort();

  /**
   * Toggle a filter on/off
   * If filter is active, remove it. If inactive, add it.
   * 
   * @param {string} filterCategory - The category to toggle
   */
  const toggleFilter = (filterCategory) => {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(filterCategory)) {
        // Remove filter if it's already active
        return prevFilters.filter(filter => filter !== filterCategory);
      } else {
        // Add filter if it's not active
        return [...prevFilters, filterCategory];
      }
    });
  };

  /**
   * Filter items based on active filters
   * If no filters are active, show all items
   * If filters are active, show only items that match ANY active filter
   */
  const filteredItems = activeFilters.length === 0 
    ? items 
    : items.filter(item => activeFilters.includes(item.category));

  /**
   * Clear all active filters
   */
  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  /**
   * Check if a filter is currently active
   * @param {string} filterCategory - The category to check
   * @returns {boolean} - True if the filter is active
   */
  const isFilterActive = (filterCategory) => {
    return activeFilters.includes(filterCategory);
  };

  return (
    <div className="filters-container">
      <h1 className="filters-title">Product Filters</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {availableCategories.map((category) => (
          <button
            key={category}
            className={`filter-button ${isFilterActive(category) ? 'active' : ''}`}
            onClick={() => toggleFilter(category)}
          >
            {category}
          </button>
        ))}
        
        {/* Clear All Filters Button */}
        {activeFilters.length > 0 && (
          <button
            className="filter-button clear-all"
            onClick={clearAllFilters}
            style={{ 
              backgroundColor: '#dc3545',
              color: 'white',
              borderColor: '#dc3545'
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="results-count">
        {activeFilters.length > 0 ? (
          <span>
            Showing {filteredItems.length} of {items.length} items
            {activeFilters.length > 0 && (
              <span> filtered by: {activeFilters.join(', ')}</span>
            )}
          </span>
        ) : (
          <span>Showing all {items.length} items</span>
        )}
      </div>

      {/* Items Display */}
      {filteredItems.length > 0 ? (
        <div className="items-container">
          {filteredItems.map((item, index) => (
            <div 
              key={`${item.category}-${item.name}-${index}`}
              className="item-card"
            >
              <h3 className="item-name">{item.name}</h3>
              <p className="item-category">{item.category}</p>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State - when no items match the filters */
        <div className="empty-state">
          <h3>No items found</h3>
          <p>Try adjusting your filters or clear all filters to see all items.</p>
          <button 
            className="filter-button"
            onClick={clearAllFilters}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              borderColor: '#007bff'
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MultipleFilters;
