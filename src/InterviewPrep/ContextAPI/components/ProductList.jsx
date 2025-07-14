import React from 'react';
import { useCart } from '../ContextDemo';
import { useTheme } from '../ContextDemo';

const ProductList = () => {
  const { addItem, items } = useCart();
  const { theme } = useTheme();

  const products = [
    { id: 1, name: 'MacBook Pro', price: 1299, image: '💻', description: 'Powerful laptop for developers' },
    { id: 2, name: 'iPhone 15', price: 999, image: '📱', description: 'Latest smartphone technology' },
    { id: 3, name: 'AirPods Pro', price: 249, image: '🎧', description: 'Premium wireless earbuds' },
    { id: 4, name: 'iPad Air', price: 599, image: '📲', description: 'Versatile tablet for work and play' },
    { id: 5, name: 'Apple Watch', price: 399, image: '⌚', description: 'Smart watch for health tracking' },
    { id: 6, name: 'Magic Mouse', price: 79, image: '🖱️', description: 'Ergonomic wireless mouse' }
  ];

  const containerStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c',
    border: `2px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`
  };

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  };

  const productCardStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#ffffff' : '#404040',
    border: `1px solid ${theme === 'light' ? '#dee2e6' : '#555'}`,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    marginTop: '10px'
  };

  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <div style={containerStyle}>
      <h3>🛍️ Product Catalog</h3>
      <p>Click "Add to Cart" to see the cart context in action!</p>

      <div style={productGridStyle}>
        {products.map(product => (
          <div key={product.id} style={productCardStyle}>
            <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '10px' }}>
              {product.image}
            </div>
            <h4 style={{ margin: '0 0 8px 0', textAlign: 'center' }}>
              {product.name}
            </h4>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '12px', 
              opacity: 0.8,
              textAlign: 'center' 
            }}>
              {product.description}
            </p>
            <p style={{ 
              margin: '0 0 10px 0', 
              fontSize: '18px', 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#28a745'
            }}>
              ${product.price}
            </p>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: isInCart(product.id) ? '#6c757d' : '#28a745',
                opacity: isInCart(product.id) ? 0.7 : 1
              }}
              onClick={() => handleAddToCart(product)}
              disabled={isInCart(product.id)}
            >
              {isInCart(product.id) ? '✓ In Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', opacity: 0.8 }}>
        <p><strong>Context Pattern Demonstrated:</strong></p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>useCart hook provides access to cart state</li>
          <li>addItem function updates global cart state</li>
          <li>Cart updates are reflected across all components</li>
          <li>No prop drilling needed for cart functionality</li>
          <li>useReducer pattern for complex state management</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductList; 