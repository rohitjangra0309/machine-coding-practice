import React, { useState } from 'react'

import './NestedCheckboxes.css'

const checkboxesData = [
    {
        id: 1,
        name: 'Electronics',
        checked: false,
        children: [
            {
                id: 2,
                name: 'Mobile phones',
                checked: false,
                children: [
                    {
                        id: 3,
                        name: 'iPhone',
                        checked: false,
                    },
                    {
                        id: 4,
                        name: 'Android',
                        checked: false,
                    },
                ],
            },
            {
                id: 5,
                name: 'Laptops',
                checked: false,
                children: [
                    {
                        id: 6,
                        name: 'MacBook',
                        checked: false,
                    },
                    {
                        id: 7,
                        name: 'Surface Pro',
                        checked: false,
                    },
                ],
            },
        ],
    },
    {
        id: 8,
        name: 'Books',
        checked: false,
        children: [
            {
                id: 9,
                name: 'Fiction',
                checked: false,
            },
            {
                id: 10,
                name: 'Non-fiction',
                checked: false,
            },
        ],
    },
    {
        id: 11,
        name: 'Toys',
        checked: false,
    },
];

const CheckboxTree = ({ data, isChecked, setIsChecked }) => {
    // Update all children of a node to match parent's state
    const updateAllChildren = (node, checked, newChecked) => {
        if (node.children) {
            node.children.forEach(child => {
                newChecked[child.id] = checked;
                updateAllChildren(child, checked, newChecked);
            });
        }
    };

    // Top-to-leaf approach: Update parent states based on children
    const updateParentStates = (node, checkedMap) => {
        if (!node.children || node.children.length === 0) {
            // Leaf node - return its current state
            return checkedMap[node.id] || false;
        }
        
        // Recursively check all children first (top-to-leaf)
        const allChildrenChecked = node.children.every(child => 
            updateParentStates(child, checkedMap)
        );
        
        // Update this parent's state based on children
        checkedMap[node.id] = allChildrenChecked;
        return allChildrenChecked;
    };

    const handleClick = (element, checked) => {
        setIsChecked(prev => {
            const newChecked = { ...prev, [element.id]: checked };

            // Update all children
            updateAllChildren(element, checked, newChecked);

            // Update all parent states using top-to-leaf approach
            checkboxesData.forEach(root => {
                updateParentStates(root, newChecked);
            });

            return newChecked;
        });
    };

    return (
        <div>
            {data.map((element) => (
                <div key={element.id} className='tree'>
                    <input 
                        type='checkbox' 
                        checked={isChecked[element.id] || false} 
                        onChange={(e) => handleClick(element, e.target.checked)} 
                    />
                    <label>{element.name}</label>
                    {element.children && (
                        <CheckboxTree 
                            data={element.children} 
                            isChecked={isChecked} 
                            setIsChecked={setIsChecked} 
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

const NestedCheckboxes = () => {
    const [isChecked, setIsChecked] = useState({});
    
    return (
        <div>
            <CheckboxTree 
                data={checkboxesData} 
                isChecked={isChecked} 
                setIsChecked={setIsChecked} 
            />
        </div>
    );
};

export default NestedCheckboxes;