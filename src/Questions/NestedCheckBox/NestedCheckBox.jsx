import React, { useState } from 'react'
import './NestedCheckBox.css'

/**
 * Sample hierarchical data structure for demonstration
 * Each node has: id, label, checked status, and optional children
 */
const SAMPLE_DATA = [
    {
        id: 1,
        label: "Fruits",
        checked: false,
        children: [
            {
                id: 2,
                label: "Citrus",
                checked: false,
                children: [
                    { id: 3, label: "Orange", checked: false },
                    { id: 4, label: "Lemon", checked: false }
                ]
            },
            {
                id: 5,
                label: "Berries",
                checked: false,
                children: [
                    { id: 6, label: "Strawberry", checked: false },
                    { id: 7, label: "Blueberry", checked: false }
                ]
            }
        ]
    },
    {
        id: 8,
        label: "Vegetables",
        checked: false,
        children: [
            {
                id: 9,
                label: "Leafy Greens",
                checked: false,
                children: [
                    { id: 10, label: "Spinach", checked: false },
                    { id: 11, label: "Lettuce", checked: false }
                ]
            },
            {
                id: 12,
                label: "Roots",
                checked: false,
                children: [
                    { id: 13, label: "Carrot", checked: false },
                    { id: 14, label: "Beetroot", checked: false }
                ]
            }
        ]
    }
];

/**
 * Individual Checkbox Item Component
 * Renders a single checkbox with its label and handles its children recursively
 * 
 * @param {Object} node - The data node to render
 * @param {Object} checkedState - Current checked state of all nodes
 * @param {Function} onToggle - Function to handle checkbox toggle
 * @param {number} level - Current nesting level (for styling)
 */
const CheckboxItem = ({ node, checkedState, onToggle, level = 0 }) => {
    const isChecked = checkedState[node.id] || false;
    const hasChildren = node.children && node.children.length > 0;
    
    // Determine CSS classes based on level
    const getItemClasses = () => {
        const baseClass = 'checkbox-item';
        const levelClass = level === 0 ? 'root-level' : `level-${level}`;
        return `${baseClass} ${levelClass}`;
    };

    return (
        <div className={getItemClasses()}>
            {/* Checkbox input and label */}
            <div className="checkbox-wrapper">
                <input
                    type="checkbox"
                    id={`checkbox-${node.id}`}
                    checked={isChecked}
                    onChange={(e) => onToggle(node, e.target.checked)}
                />
                <label htmlFor={`checkbox-${node.id}`}>
                    {node.label}
                </label>
            </div>

            {/* Render children recursively if they exist */}
            {hasChildren && (
                <div className="checkbox-children">
                    {node.children.map((child) => (
                        <CheckboxItem
                            key={child.id}
                            node={child}
                            checkedState={checkedState}
                            onToggle={onToggle}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * Main NestedCheckBox Component
 * Manages the entire hierarchical checkbox tree with parent-child synchronization
 * 
 * @param {Array} data - Hierarchical data structure (optional, uses SAMPLE_DATA if not provided)
 */
const NestedCheckBox = ({ data = SAMPLE_DATA }) => {
    // State to track which checkboxes are checked
    // Format: { nodeId: boolean, ... }
    const [checkedState, setCheckedState] = useState({});

    /**
     * Recursively updates all children of a node to match the parent's checked state
     * 
     * @param {Object} node - The parent node
     * @param {boolean} isChecked - The checked state to apply to all children
     * @param {Object} currentState - Current state object to update
     */
    const updateAllChildren = (node, isChecked, currentState) => {
        if (!node.children) return;

        node.children.forEach((child) => {
            // Set this child's checked state
            currentState[child.id] = isChecked;
            
            // Recursively update this child's children
            updateAllChildren(child, isChecked, currentState);
        });
    };

    /**
     * Recursively checks if all children of a node are checked
     * If all children are checked, the parent should be checked too
     * 
     * @param {Object} node - The node to check
     * @param {Object} currentState - Current state object
     * @returns {boolean} - Whether all children are checked
     */
    const updateParentState = (node, currentState) => {
        if (!node.children || node.children.length === 0) {
            // Leaf node - return its current state
            return currentState[node.id] || false;
        }

        // Check if ALL children are checked
        const allChildrenChecked = node.children.every((child) =>
            updateParentState(child, currentState)
        );

        // Update this node's state based on children
        currentState[node.id] = allChildrenChecked;
        
        return allChildrenChecked;
    };

    /**
     * Handle checkbox toggle for any node
     * This function manages the complex parent-child synchronization logic
     * 
     * @param {Object} node - The node that was toggled
     * @param {boolean} isChecked - The new checked state
     */
    const handleToggle = (node, isChecked) => {
        setCheckedState((previousState) => {
            // Create a copy of the current state to avoid mutation
            const newState = { ...previousState };
            
            // Step 1: Update the toggled node
            newState[node.id] = isChecked;
            
            // Step 2: Update all children to match the parent's state
            updateAllChildren(node, isChecked, newState);
            
            // Step 3: Update all parent nodes based on their children's state
            // We need to check the entire tree to ensure proper parent-child sync
            data.forEach((rootNode) => {
                updateParentState(rootNode, newState);
            });
            
            return newState;
        });
    };

    /**
     * Helper function to get all checked items
     * Useful for parent components to know what's selected
     */
    const getCheckedItems = () => {
        return Object.entries(checkedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([nodeId, _]) => parseInt(nodeId));
    };

    /**
     * Helper function to clear all selections
     */
    const clearAllSelections = () => {
        setCheckedState({});
    };

    return (
        <div className="nested-checkbox-container">
            <h3>Nested Checkbox Tree</h3>
            
            {/* Control buttons */}
            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={clearAllSelections}
                    style={{
                        padding: '5px 10px',
                        marginRight: '10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear All
                </button>
                <span style={{ fontSize: '14px', color: '#666' }}>
                    Selected: {getCheckedItems().length} items
                </span>
            </div>

            {/* Render the tree structure */}
            <div className="checkbox-tree">
                {data.map((rootNode) => (
                    <CheckboxItem
                        key={rootNode.id}
                        node={rootNode}
                        checkedState={checkedState}
                        onToggle={handleToggle}
                        level={0}
                    />
                ))}
            </div>

            {/* Debug info (you can remove this in production) */}
            <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <details>
                    <summary>Debug: Current State</summary>
                    <pre>{JSON.stringify(checkedState, null, 2)}</pre>
                </details>
            </div>
        </div>
    );
};

export default NestedCheckBox;
