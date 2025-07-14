import React from 'react';
import { useCart } from '../ContextDemo';
import { useTheme } from '../ContextDemo';

const ShoppingCart = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();
  const { theme } = useTheme();

  const containerStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c',
    border: `2px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`
  };

  const cartItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '10px',
    backgroundColor: theme === 'light' ? '#ffffff' : '#404040',
    border: `1px solid ${theme === 'light' ? '#dee2e6' : '#555'}`,
    borderRadius: '6px'
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    margin: '0 2px'
  };

  const quantityButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const removeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#000',
    padding: '8px 16px',
    fontSize: '14px'
  };

  const checkoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  const handleQuantityChange = (itemId, change) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert(`Checkout completed!\nTotal: $${getTotalPrice().toFixed(2)}\nItems: ${getTotalItems()}`);
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div style={containerStyle}>
        <h3>🛒 Shopping Cart</h3>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          opacity: 0.6 
        }}>
          <div style={{ fontSize: '48px' }}>🛒</div>
          <p>Your cart is empty</p>
          <p style={{ fontSize: '14px' }}>Add some products to get started!</p>
        </div>
        
        <div style={{ marginTop: '20px', fontSize: '14px', opacity: 0.8 }}>
          <p><strong>Cart Context Features:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Real-time cart updates across components</li>
            <li>Quantity management with useReducer</li>
            <li>Automatic total calculations</li>
            <li>Persistent cart state during navigation</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>🛒 Shopping Cart ({getTotalItems()} items)</h3>
        <button onClick={clearCart} style={clearButtonStyle}>
          Clear Cart
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {items.map(item => (
          <div key={item.id} style={cartItemStyle}>
            <div style={{ fontSize: '24px', marginRight: '15px' }}>
              {item.image}
            </div>
            
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>
                {item.name}
              </h4>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
                ${item.price} each
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                style={quantityButtonStyle}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              
              <span style={{ 
                minWidth: '40px', 
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                style={quantityButtonStyle}
              >
                +
              </button>

              <span style={{ 
                minWidth: '60px', 
                textAlign: 'right',
                fontWeight: 'bold',
                color: '#28a745',
                marginLeft: '10px'
              }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button
                onClick={() => removeItem(item.id)}
                style={removeButtonStyle}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        borderTop: `2px solid ${theme === 'light' ? '#dee2e6' : '#555'}`,
        paddingTop: '15px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Total: ${getTotalPrice().toFixed(2)}
          </span>
          <button onClick={handleCheckout} style={checkoutButtonStyle}>
            Checkout
          </button>
        </div>
      </div>

      <div style={{ fontSize: '14px', opacity: 0.8 }}>
        <p><strong>useReducer Pattern Demonstrated:</strong></p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Complex state management (ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY)</li>
          <li>Immutable state updates</li>
          <li>Centralized business logic in reducer</li>
          <li>Type-safe actions with payload</li>
          <li>Computed values (totals) derived from state</li>
        </ul>
      </div>
    </div>
  );
};

export default ShoppingCart; 