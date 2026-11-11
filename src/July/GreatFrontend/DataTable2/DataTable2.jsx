import React, { useState } from 'react';
import users from '../DataTable/users.json';
import '../DataTable/styles.css';

const labels = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Occupation', key: 'occupation' },
];

const DataTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle sorting logic
  const sortedUsers = [...users].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (!key) return 0;

    const aVal = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
    const bVal = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate sorted data
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const finalUsers = sortedUsers.slice(startIndex, endIndex);

  const totalPage = Math.ceil(users.length / perPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setCurrentPage(1); // Reset page
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div>
      <h1>User Data Table</h1>
      <table>
        <thead>
          <tr>
            {labels.map((item) => (
              <th key={item.key} onClick={() => handleSort(item.key)} style={{ cursor: 'pointer' }}>
                {item.label}
                {sortConfig.key === item.key && (
                  sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {finalUsers.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <select value={perPage} onChange={handlePerPageChange}>
          <option value={5}>Show 5</option>
          <option value={10}>Show 10</option>
          <option value={20}>Show 20</option>
        </select>

        <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        {' '}
        {`${currentPage} of ${totalPage}`}
        {' '}
        <button onClick={handleNextPage} disabled={currentPage === totalPage}>Next</button>
      </div>
    </div>
  );
};

export default DataTable;
