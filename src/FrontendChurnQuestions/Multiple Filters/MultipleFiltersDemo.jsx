import React from 'react';
import MultipleFilters from './MultipleFilters';

/**
 * A simple demo for the MultipleFilters component.
 */
const MultipleFiltersDemo = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Multiple Filters Demo</h1>
      <p>Click the buttons to filter the items by category.</p>

      <div style={{
        marginTop: '20px',
        border: '1px solid #eee',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <MultipleFilters />
      </div>

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#555' }}>
        <h3>Key Interview Features:</h3>
        <ul>
          <li><strong>Clean Logic:</strong> Simple state and filtering logic.</li>
          <li><strong>Functional UI:</strong> Basic but clear user interface.</li>
          <li><strong>Reusable:</strong> Component is self-contained.</li>
          <li><strong>No Over-engineering:</strong> Perfect for a timed coding challenge.</li>
        </ul>
      </div>
    </div>
  );
};

export default MultipleFiltersDemo; 