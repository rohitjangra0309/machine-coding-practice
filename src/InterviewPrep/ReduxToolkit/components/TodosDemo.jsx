import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  clearCompleted,
  selectFilteredTodos,
  selectFilter,
  selectTodoStats
} from '../slices/todosSlice';

const TodosDemo = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState('medium');

  const filteredTodos = useSelector(selectFilteredTodos);
  const filter = useSelector(selectFilter);
  const stats = useSelector(selectTodoStats);
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodo({ 
        text: newTodoText.trim(), 
        priority: newTodoPriority 
      }));
      setNewTodoText('');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const buttonStyle = {
    margin: '2px',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      {/* Stats */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <span><strong>Total:</strong> {stats.total}</span>
        <span><strong>Active:</strong> {stats.active}</span>
        <span><strong>Completed:</strong> {stats.completed}</span>
        <span><strong>High Priority:</strong> {stats.byPriority.high}</span>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <select
            value={newTodoPriority}
            onChange={(e) => setNewTodoPriority(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            style={{
              ...buttonStyle,
              backgroundColor: '#007bff',
              color: 'white',
              padding: '8px 16px'
            }}
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ marginRight: '10px' }}>Filter:</span>
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => dispatch(setFilter(filterType))}
            style={{
              ...buttonStyle,
              backgroundColor: filter === filterType ? '#007bff' : '#e9ecef',
              color: filter === filterType ? 'white' : '#333'
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
        <button
          onClick={() => dispatch(clearCompleted())}
          style={{
            ...buttonStyle,
            backgroundColor: '#dc3545',
            color: 'white',
            marginLeft: '10px'
          }}
        >
          Clear Completed
        </button>
      </div>

      {/* Todo List */}
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            No todos to show
          </p>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '8px',
                backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                borderLeft: `4px solid ${getPriorityColor(todo.priority)}`
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                style={{ marginRight: '10px' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#666' : '#333'
                }}
              >
                {todo.text}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: getPriorityColor(todo.priority),
                  marginRight: '10px',
                  fontWeight: 'bold'
                }}
              >
                {todo.priority.toUpperCase()}
              </span>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#dc3545',
                  color: 'white'
                }}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Redux Concepts */}
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <h4>Array Operations Demonstrated:</h4>
        <ul>
          <li><strong>push():</strong> Add new todos to array</li>
          <li><strong>find():</strong> Locate specific todo for updates</li>
          <li><strong>filter():</strong> Remove todos and filter display</li>
          <li><strong>forEach():</strong> Batch operations on todos</li>
          <li><strong>Computed Selectors:</strong> Derived state (stats, filtered todos)</li>
        </ul>
      </div>
    </div>
  );
};

export default TodosDemo; 