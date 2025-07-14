import React, { createContext, useContext, useReducer, useState } from 'react';
import UserProfile from './components/UserProfile';
import ShoppingCart from './components/ShoppingCart';
import ProductList from './components/ProductList';
import ThemeToggle from './components/ThemeToggle';

// 1. THEME CONTEXT - Simple State Management
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for theme
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// 2. USER CONTEXT - Complex State with Authentication
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'user',
        preferences: { notifications: true, theme: 'auto' }
      });
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      updateProfile 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for user context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// 3. SHOPPING CART CONTEXT - useReducer Pattern
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// MAIN DEMO COMPONENT
const ContextDemo = () => {
  const { theme } = useTheme();
  
  const containerStyle = {
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#000000' : '#ffffff',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <h1>🎯 Context API Concepts Demo</h1>
      
      {/* Theme Toggle */}
      <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>1. Theme Context (Simple State)</h2>
        <ThemeToggle />
      </section>

      {/* User Authentication */}
      <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>2. User Context (Authentication)</h2>
        <UserProfile />
      </section>

      {/* Shopping Cart */}
      <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>3. Cart Context (useReducer Pattern)</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <ProductList />
          </div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <ShoppingCart />
          </div>
        </div>
      </section>

      {/* Interview Concepts */}
      <section style={{ backgroundColor: theme === 'light' ? '#f5f5f5' : '#2a2a2a', padding: '15px', borderRadius: '5px' }}>
        <h2>📝 Interview Key Points:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h3>Context API Benefits:</h3>
            <ul>
              <li>Avoid prop drilling</li>
              <li>Global state management</li>
              <li>Component composition</li>
              <li>Custom hooks pattern</li>
            </ul>
          </div>
          <div>
            <h3>When to Use Context:</h3>
            <ul>
              <li>Theme/UI preferences</li>
              <li>User authentication</li>
              <li>Language/localization</li>
              <li>Shopping cart state</li>
            </ul>
          </div>
          <div>
            <h3>Best Practices:</h3>
            <ul>
              <li>Split contexts by concern</li>
              <li>Use custom hooks</li>
              <li>Provider composition</li>
              <li>Error boundaries</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

// MAIN APP WITH ALL PROVIDERS
const ContextApp = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <ContextDemo />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default ContextApp;

// Export contexts and hooks for use in components
export { ThemeContext, UserContext, CartContext, useTheme, useUser, useCart };

/*
🎯 INTERVIEW QUESTIONS & ANSWERS:

Q: What is Context API and why use it?
A: Context API provides a way to pass data through component tree without manually 
   passing props at every level. It's used for global state like themes, user auth, etc.

Q: When should you use Context vs Props?
A: Use Context for data that needs to be accessed by many components at different 
   nesting levels. Use props for component-specific data and parent-child communication.

Q: What are the performance implications of Context?
A: All components that consume a context re-render when context value changes. 
   Split contexts by concern and use React.memo for optimization.

Q: How do you handle complex state in Context?
A: Use useReducer for complex state logic, similar to Redux patterns. 
   Combine multiple contexts for different concerns.

Q: What's the difference between Context API and Redux?
A: Context API is built into React, good for simple global state. 
   Redux has more features like middleware, time-travel debugging, and strict patterns.
*/ 