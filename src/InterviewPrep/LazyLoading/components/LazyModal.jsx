import React, { useState, useEffect } from 'react';

const LazyModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    console.log('🎭 Lazy Modal Loaded');
    // Simulate loading heavy modal dependencies
    // In real apps: rich text editors, form libraries, validation libraries
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '15px', 
          cursor: 'pointer',
          fontSize: '20px',
          color: '#666'
        }} onClick={onClose}>
          ×
        </div>
        
        <h2 style={{ marginTop: 0, color: '#333' }}>🎭 Lazy-Loaded Modal</h2>
        
        <div style={{ 
          backgroundColor: '#f0f8ff', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            <strong>This modal demonstrates:</strong>
          </p>
          <ul style={{ fontSize: '12px', marginBottom: 0 }}>
            <li>Lazy loading of complex form components</li>
            <li>Heavy form validation libraries</li>
            <li>Rich text editors or date pickers</li>
            <li>Modal-specific styling and animations</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Message:
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{
                ...inputStyle,
                height: '100px',
                resize: 'vertical'
              }}
              placeholder="Enter your message"
              required
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                ...buttonStyle,
                backgroundColor: '#f0f0f0',
                color: '#333'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: '#007bff',
                color: 'white'
              }}
            >
              Submit
            </button>
          </div>
        </form>

        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          <strong>Performance Benefit:</strong> This modal and its dependencies are only loaded when needed, 
          not on initial page load. In a real app, this could save 50-200KB of initial bundle size.
        </div>
      </div>
    </div>
  );
};

export default LazyModal; 