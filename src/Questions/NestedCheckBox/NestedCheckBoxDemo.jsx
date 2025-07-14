import React, { useState } from 'react';
import NestedCheckBox from './NestedCheckBox';

/**
 * Demo component showing different ways to use NestedCheckBox
 */
const NestedCheckBoxDemo = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    // Example 1: File system structure
    const fileSystemData = [
        {
            id: 1,
            label: "Documents",
            checked: false,
            children: [
                {
                    id: 2,
                    label: "Work",
                    checked: false,
                    children: [
                        { id: 3, label: "report.pdf", checked: false },
                        { id: 4, label: "presentation.pptx", checked: false }
                    ]
                },
                {
                    id: 5,
                    label: "Personal",
                    checked: false,
                    children: [
                        { id: 6, label: "photos", checked: false },
                        { id: 7, label: "recipes.txt", checked: false }
                    ]
                }
            ]
        },
        {
            id: 8,
            label: "Downloads",
            checked: false,
            children: [
                { id: 9, label: "software.exe", checked: false },
                { id: 10, label: "music.mp3", checked: false }
            ]
        }
    ];

    // Example 2: Permission structure
    const permissionData = [
        {
            id: 1,
            label: "User Management",
            checked: false,
            children: [
                { id: 2, label: "Create Users", checked: false },
                { id: 3, label: "Edit Users", checked: false },
                { id: 4, label: "Delete Users", checked: false }
            ]
        },
        {
            id: 5,
            label: "Content Management",
            checked: false,
            children: [
                {
                    id: 6,
                    label: "Articles",
                    checked: false,
                    children: [
                        { id: 7, label: "Create Articles", checked: false },
                        { id: 8, label: "Edit Articles", checked: false },
                        { id: 9, label: "Publish Articles", checked: false }
                    ]
                },
                {
                    id: 10,
                    label: "Media",
                    checked: false,
                    children: [
                        { id: 11, label: "Upload Images", checked: false },
                        { id: 12, label: "Delete Images", checked: false }
                    ]
                }
            ]
        }
    ];

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>NestedCheckBox Component Demo</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Example 1: Default fruit/vegetable data */}
                <div>
                    <h2>Example 1: Default Data (Food Categories)</h2>
                    <NestedCheckBox />
                </div>

                {/* Example 2: File system structure */}
                <div>
                    <h2>Example 2: File System Structure</h2>
                    <NestedCheckBox data={fileSystemData} />
                </div>

                {/* Example 3: Permission structure */}
                <div style={{ gridColumn: 'span 2' }}>
                    <h2>Example 3: Permission Management</h2>
                    <NestedCheckBox data={permissionData} />
                </div>
            </div>

            {/* Usage instructions */}
            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3>How to Use NestedCheckBox:</h3>
                <ol>
                    <li><strong>Basic Usage:</strong> <code>&lt;NestedCheckBox /&gt;</code> - Uses default sample data</li>
                    <li><strong>Custom Data:</strong> <code>&lt;NestedCheckBox data={customData} /&gt;</code> - Provide your own hierarchical data</li>
                    <li><strong>Data Structure:</strong> Each node needs <code>id</code>, <code>label</code>, <code>checked</code>, and optional <code>children</code> array</li>
                    <li><strong>Parent-Child Sync:</strong> Checking a parent automatically checks all children</li>
                    <li><strong>Auto-Parent Update:</strong> When all children are checked, parent is automatically checked</li>
                </ol>

                <h4>Features:</h4>
                <ul>
                    <li>✅ Hierarchical checkbox tree with unlimited nesting</li>
                    <li>✅ Parent-child synchronization</li>
                    <li>✅ Visual nesting levels with colored borders</li>
                    <li>✅ Clear all functionality</li>
                    <li>✅ Selection counter</li>
                    <li>✅ Accessible with proper labels</li>
                </ul>
            </div>
        </div>
    );
};

export default NestedCheckBoxDemo; 