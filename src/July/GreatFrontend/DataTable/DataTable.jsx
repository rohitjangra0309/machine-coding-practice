


import React, { useState } from 'react'

import users from './users.json'

import './styles.css'

const labels = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
]

const DataTable = () => {
    const [perPage, setPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate the correct slice of users based on current page and perPage
    const startIndex = (currentPage - 1) * perPage
    const endIndex = startIndex + perPage
    const finalUsers = users.slice(startIndex, endIndex)

    const totalPage = Math.ceil(users.length / perPage)

    // Handle previous page
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Handle next page
    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Handle items per page change
    const handlePerPageChange = (e) => {
        const newPerPage = parseInt(e.target.value)
        setPerPage(newPerPage)
        // Reset to first page when changing items per page
        setCurrentPage(1)
    }

    return (
        <div>
            <h1>User Data Table</h1>
            <table>
                <thead>
                    <tr>
                        {labels.map((item) => (
                            <th key={item.key}>{item.label}</th>
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

                <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {' '}
                {`${currentPage} of ${totalPage}`}
                {' '}
                <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPage}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default DataTable