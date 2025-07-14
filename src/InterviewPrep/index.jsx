import React, { useState } from 'react';
import LazyLoadingDemo from './LazyLoading/LazyLoadingDemo';
import ContextDemo from './ContextAPI/ContextDemo';
import ReduxDemo from './ReduxToolkit/ReduxDemo';

const InterviewPrep = () => {
  const [activeDemo, setActiveDemo] = useState('lazy-loading');

  const navButtonStyle = {
    padding: '12px 24px',
    margin: '5px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  const getButtonStyle = (demo) => ({
    ...navButtonStyle,
    backgroundColor: activeDemo === demo ? '#007bff' : '#e9ecef',
    color: activeDemo === demo ? 'white' : '#333',
    transform: activeDemo === demo ? 'translateY(-2px)' : 'none',
    boxShadow: activeDemo === demo ? '0 4px 8px rgba(0,123,255,0.3)' : 'none'
  });

  const demos = [
    { id: 'lazy-loading', label: '🚀 Lazy Loading', component: <LazyLoadingDemo /> },
    { id: 'context-api', label: '🎯 Context API', component: <ContextDemo /> },
    { id: 'redux-toolkit', label: '⚡ Redux Toolkit', component: <ReduxDemo /> }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
          🎓 React Interview Preparation
        </h1>
        <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>
          Master the top 3 React concepts for your next interview
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderBottom: '1px solid #dee2e6',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {demos.map(demo => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            style={getButtonStyle(demo.id)}
          >
            {demo.label}
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div style={{ padding: '0' }}>
        {demos.find(demo => demo.id === activeDemo)?.component}
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h3>🎯 Interview Success Tips</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: '20px'
        }}>
          <div>
            <h4>🚀 Lazy Loading</h4>
            <ul style={{ textAlign: 'left', fontSize: '14px' }}>
              <li>Explain code splitting benefits</li>
              <li>Demonstrate React.lazy() and Suspense</li>
              <li>Discuss bundle optimization strategies</li>
              <li>Show performance improvements</li>
            </ul>
          </div>
          <div>
            <h4>🎯 Context API</h4>
            <ul style={{ textAlign: 'left', fontSize: '14px' }}>
              <li>Compare with prop drilling</li>
              <li>Explain provider pattern</li>
              <li>Demonstrate custom hooks</li>
              <li>Discuss performance considerations</li>
            </ul>
          </div>
          <div>
            <h4>⚡ Redux Toolkit</h4>
            <ul style={{ textAlign: 'left', fontSize: '14px' }}>
              <li>Explain benefits over classic Redux</li>
              <li>Show createSlice and createAsyncThunk</li>
              <li>Demonstrate immutable updates</li>
              <li>Compare with Context API</li>
            </ul>
          </div>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#495057',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '30px auto 0'
        }}>
          <h4>💡 Pro Interview Tips:</h4>
          <ul style={{ textAlign: 'left', fontSize: '14px' }}>
            <li><strong>Practice explaining concepts:</strong> Don't just code, explain your thinking</li>
            <li><strong>Know when to use what:</strong> Understand trade-offs between different solutions</li>
            <li><strong>Show real-world examples:</strong> Connect concepts to actual project scenarios</li>
            <li><strong>Demonstrate best practices:</strong> Show you know production-ready patterns</li>
            <li><strong>Ask clarifying questions:</strong> Show you think about requirements and constraints</li>
          </ul>
        </div>

        <p style={{ marginTop: '30px', fontSize: '16px', opacity: 0.8 }}>
          Good luck with your interviews! 🍀
        </p>
      </div>
    </div>
  );
};

export default InterviewPrep; 