import React, { useState } from 'react'
import './CrudApp.css'

const CrudApp = () => {
    const [userList, setUserList] = useState(["Rohit Jangra", "Gintoki Sakata", "Elizabeth Zura"])
    const [search, setSearch] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const filteredUserList = userList.filter((user) => 
        user.toLowerCase().includes(search.toLowerCase())
    )

    const handleUserClick = (user) => {
        const [first, last] = user.split(" ")
        setFirstName(first || "")
        setLastName(last || "")
        setSelectedUser(user)
        setIsEditing(true)
    }

    const handleCreate = () => {
        if (!firstName.trim() || !lastName.trim()) {
            alert("Please fill in both first and last name")
            return
        }
        
        const newUser = `${firstName.trim()} ${lastName.trim()}`
        
        // Check for duplicates
        if (userList.includes(newUser)) {
            alert("User already exists!")
            return
        }
        
        setUserList([...userList, newUser])
        handleCancel()
    }

    const handleUpdate = () => {
        if (!firstName.trim() || !lastName.trim()) {
            alert("Please fill in both first and last name")
            return
        }
        
        if (!selectedUser) {
            alert("Please select a user to update")
            return
        }
        
        const updatedUser = `${firstName.trim()} ${lastName.trim()}`
        
        // Check if the new name already exists (excluding the current user)
        const otherUsers = userList.filter(user => user !== selectedUser)
        if (otherUsers.includes(updatedUser)) {
            alert("User with this name already exists!")
            return
        }
        
        setUserList(userList.map((user) => 
            user === selectedUser ? updatedUser : user
        ))
        handleCancel()
    }

    const handleDelete = () => {
        if (!selectedUser) {
            alert("Please select a user to delete")
            return
        }
        
        if (window.confirm(`Are you sure you want to delete "${selectedUser}"?`)) {
            setUserList(userList.filter((user) => user !== selectedUser))
            handleCancel()
        }
    }   

    const handleCancel = () => {
        setFirstName("")
        setLastName("")
        setSearch("")
        setSelectedUser(null)
        setIsEditing(false)
    }

    const isFormValid = firstName.trim() && lastName.trim()

    return (
        <div className="crud-container">
            <h1>User Management</h1>
            
            <div className="search-section">
                <input 
                    type="search" 
                    placeholder='Search users...' 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>
            
            <div className='main-content'>
                <div className='user-list'>
                    <h3>Users ({filteredUserList.length})</h3>
                    {filteredUserList.length === 0 ? (
                        <div className="no-users">No users found</div>
                    ) : (
                        filteredUserList.map((user, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleUserClick(user)}
                                className={`user-item ${selectedUser === user ? 'selected' : ''}`}
                            >
                                {user}
                            </div>
                        ))
                    )}
                </div>
                
                <div className='form-section'>
                    <h3>{isEditing ? 'Edit User' : 'Add New User'}</h3>
                    <div className='name-div'>
                        <div className="input-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input 
                                type="text" 
                                placeholder='Enter first name' 
                                id='firstName' 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input 
                                type="text" 
                                placeholder='Enter last name' 
                                id='lastName' 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='button-div'>
                <button 
                    onClick={handleCreate} 
                    disabled={!isFormValid || isEditing}
                    className="btn btn-primary"
                >
                    Create
                </button>
                <button 
                    onClick={handleUpdate} 
                    disabled={!isFormValid || !isEditing}
                    className="btn btn-secondary"
                >
                    Update
                </button>
                <button 
                    onClick={handleDelete} 
                    disabled={!isEditing}
                    className="btn btn-danger"
                >
                    Delete
                </button>
                <button 
                    onClick={handleCancel}
                    className="btn btn-neutral"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default CrudApp