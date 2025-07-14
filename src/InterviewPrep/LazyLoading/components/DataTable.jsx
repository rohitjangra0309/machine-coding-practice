import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    console.log('📊 Data Table Feature Loaded');
    
    // Simulate API call
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), 
                        Math.floor(Math.random() * 12), 
                        Math.floor(Math.random() * 28)).toDateString()
    }));
    setData(mockData);
  }, []);

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sortedData = [...data].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
    setData(sortedData);
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#f2f2f2',
    cursor: 'pointer'
  };

  return (
    <div style={{ 
      border: '2px solid #4ecdc4', 
      padding: '15px', 
      margin: '10px 0',
      backgroundColor: '#e0fffe' 
    }}>
      <h3>📊 Data Table Feature</h3>
      <p>This represents a complex data management feature that includes:</p>
      <ul>
        <li>Data fetching and caching</li>
        <li>Sorting and filtering</li>
        <li>Pagination (simulated)</li>
        <li>Large third-party dependencies (charts, tables, etc.)</li>
      </ul>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle} onClick={() => handleSort('id')}>
                ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={thStyle} onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={thStyle} onClick={() => handleSort('email')}>
                Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={thStyle} onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={thStyle}>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map(user => (
              <tr key={user.id}>
                <td style={thTdStyle}>{user.id}</td>
                <td style={thTdStyle}>{user.name}</td>
                <td style={thTdStyle}>{user.email}</td>
                <td style={{
                  ...thTdStyle,
                  color: user.status === 'Active' ? 'green' : 
                         user.status === 'Inactive' ? 'red' : 'orange'
                }}>
                  {user.status}
                </td>
                <td style={thTdStyle}>{user.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Showing 20 of {data.length} records. Click headers to sort.
      </p>
    </div>
  );
};

export default DataTable; 