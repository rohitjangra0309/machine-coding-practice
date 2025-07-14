import React, { useEffect, useState } from 'react';

// Simulate a heavy component that takes time to load and render
const HeavyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate expensive computation
  useEffect(() => {
    console.log('🔥 Heavy Component Loaded - This would be a large bundle chunk!');
    
    // Simulate data fetching or heavy computation
    setTimeout(() => {
      const mockData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 100
      }));
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>🔧 Initializing heavy component...</div>;
  }

  return (
    <div style={{ 
      border: '2px solid #ff6b6b', 
      padding: '15px', 
      margin: '10px 0',
      backgroundColor: '#ffe0e0' 
    }}>
      <h3>🔥 Heavy Component Loaded!</h3>
      <p>This component simulates:</p>
      <ul>
        <li>Large bundle size (imagine 500KB+ of code)</li>
        <li>Heavy computations</li>
        <li>Large data processing</li>
        <li>Third-party library imports</li>
      </ul>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <strong>Processed Data ({data.length} items):</strong>
        {data.slice(0, 10).map(item => (
          <div key={item.id} style={{ fontSize: '12px' }}>
            {item.name}: {item.value.toFixed(2)}
          </div>
        ))}
        <em>...and {data.length - 10} more items</em>
      </div>
    </div>
  );
};

export default HeavyComponent; 