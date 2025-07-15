import React from 'react';
import MultipleFilters from './MultipleFilters';

/**
 * Demo component showing how to use the MultipleFilters component
 */
const MultipleFiltersDemo = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Multiple Filters Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Interactive Filter Demo</h2>
        <p>
          This component demonstrates a multi-category filtering system where users can:
        </p>
        <ul>
          <li>✅ Click filter buttons to toggle categories on/off</li>
          <li>✅ Select multiple filters simultaneously</li>
          <li>✅ See real-time results count</li>
          <li>✅ Clear all filters at once</li>
          <li>✅ View all items when no filters are active</li>
        </ul>
      </div>

      {/* Main component demo */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <MultipleFilters />
      </div>

      {/* Usage instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>How to Use MultipleFilters Component:</h3>
        
        <h4>Basic Usage:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`import MultipleFilters from './MultipleFilters';

function App() {
  return (
    <div>
      <MultipleFilters />
    </div>
  );
}`}
        </pre>

        <h4>Data Structure:</h4>
        <p>The component reads from <code>items.js</code> with this structure:</p>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`export const items = [
  {
    name: 'Prada',
    category: 'Bags',
  },
  {
    name: 'Rolex',
    category: 'Watches',
  },
  // ... more items
];`}
        </pre>

        <h4>Key Features:</h4>
        <ul>
          <li><strong>Multi-select filtering:</strong> Users can select multiple categories</li>
          <li><strong>Dynamic categories:</strong> Filter buttons are generated from data</li>
          <li><strong>Real-time updates:</strong> Results update immediately</li>
          <li><strong>Clear all option:</strong> Easy way to reset all filters</li>
          <li><strong>Results count:</strong> Shows filtered vs total items</li>
          <li><strong>Empty state:</strong> Helpful message when no items match</li>
          <li><strong>Responsive design:</strong> Works on all screen sizes</li>
        </ul>

        <h4>Component Structure:</h4>
        <ul>
          <li><strong>State Management:</strong> Uses <code>useState</code> for active filters</li>
          <li><strong>Styling:</strong> Separate CSS file for maintainability</li>
          <li><strong>Simple Logic:</strong> Clean and easy to understand</li>
        </ul>

        <h4>File Structure:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`Multiple Filters/
├── MultipleFilters.jsx       # Main component
├── MultipleFilters.css       # Styling
├── MultipleFiltersDemo.jsx   # This demo
├── items.js                  # Sample data
└── README.md                 # Documentation`}
        </pre>

        <h4>Customization:</h4>
        <p>You can customize the component by:</p>
        <ul>
          <li>Modifying the <code>items.js</code> data structure</li>
          <li>Updating CSS classes in <code>MultipleFilters.css</code></li>
          <li>Adding new features like search, sorting, or advanced filters</li>
          <li>Integrating with external APIs for dynamic data</li>
        </ul>
      </div>
    </div>
  );
};

export default MultipleFiltersDemo; 