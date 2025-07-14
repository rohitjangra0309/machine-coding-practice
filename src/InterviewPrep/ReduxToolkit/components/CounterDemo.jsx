import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  setStep, 
  reset, 
  doubleIfOdd,
  selectCounter,
  selectStep,
  selectHistory,
  selectIsEven,
  selectAbsoluteValue
} from '../slices/counterSlice';

const CounterDemo = () => {
  const [customAmount, setCustomAmount] = useState(0);
  const [newStep, setNewStep] = useState(1);
  
  // Using useSelector to read from store
  const count = useSelector(selectCounter);
  const step = useSelector(selectStep);
  const history = useSelector(selectHistory);
  const isEven = useSelector(selectIsEven);
  const absoluteValue = useSelector(selectAbsoluteValue);
  
  // Using useDispatch to dispatch actions
  const dispatch = useDispatch();

  const buttonStyle = {
    margin: '5px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white'
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white'
  };

  const warningButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#000'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#333', fontSize: '48px', margin: '10px 0' }}>
          {count}
        </h3>
        <div style={{ fontSize: '14px', color: '#666' }}>
          <p>Current step: {step}</p>
          <p>Is even: {isEven ? '✅' : '❌'}</p>
          <p>Absolute value: {absoluteValue}</p>
        </div>
      </div>

      {/* Basic Actions */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Basic Actions:</h4>
        <button 
          style={successButtonStyle}
          onClick={() => dispatch(increment())}
        >
          +{step}
        </button>
        <button 
          style={dangerButtonStyle}
          onClick={() => dispatch(decrement())}
        >
          -{step}
        </button>
        <button 
          style={secondaryButtonStyle}
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>

      {/* Custom Amount */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Custom Amount:</h4>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(Number(e.target.value))}
          style={{ 
            padding: '6px', 
            marginRight: '10px', 
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          style={primaryButtonStyle}
          onClick={() => dispatch(incrementByAmount(customAmount))}
        >
          Add {customAmount}
        </button>
      </div>

      {/* Step Control */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Step Control:</h4>
        <input
          type="number"
          value={newStep}
          onChange={(e) => setNewStep(Number(e.target.value))}
          min="1"
          style={{ 
            padding: '6px', 
            marginRight: '10px', 
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          style={warningButtonStyle}
          onClick={() => dispatch(setStep(newStep))}
        >
          Set Step
        </button>
      </div>

      {/* Conditional Action */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Conditional Action:</h4>
        <button 
          style={primaryButtonStyle}
          onClick={() => dispatch(doubleIfOdd())}
        >
          Double if Odd
        </button>
        <p style={{ fontSize: '12px', color: '#666' }}>
          This will double the value only if it's odd
        </p>
      </div>

      {/* History */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Action History:</h4>
        <div style={{ 
          maxHeight: '150px', 
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {history.length === 0 ? (
            <p>No actions yet</p>
          ) : (
            [...history].reverse().slice(0, 5).map((entry, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <strong>{entry.action}</strong> → {entry.value} 
                <span style={{ color: '#666' }}>
                  {' '}({new Date(entry.timestamp).toLocaleTimeString()})
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Redux Concepts Explanation */}
      <div style={{ 
        backgroundColor: '#e9ecef',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <h4>Redux Hooks Demonstrated:</h4>
        <ul>
          <li><strong>useSelector:</strong> Extract data from Redux store state</li>
          <li><strong>useDispatch:</strong> Dispatch actions to update state</li>
          <li><strong>Selectors:</strong> Functions that compute derived data</li>
          <li><strong>Actions:</strong> Plain objects describing what happened</li>
          <li><strong>Reducers:</strong> Pure functions that specify state updates</li>
        </ul>
      </div>
    </div>
  );
};

export default CounterDemo; 