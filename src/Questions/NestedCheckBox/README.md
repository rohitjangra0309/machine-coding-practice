# NestedCheckBox Component

A React component for creating hierarchical checkbox trees with automatic parent-child synchronization.

## Features

- ✅ **Hierarchical Structure**: Support for unlimited nesting levels
- ✅ **Parent-Child Sync**: Checking a parent automatically checks all children
- ✅ **Auto-Parent Update**: When all children are checked, parent is automatically checked
- ✅ **Visual Nesting**: Different colored borders for each nesting level
- ✅ **Clear All**: Button to clear all selections
- ✅ **Selection Counter**: Shows total number of selected items
- ✅ **Accessible**: Proper labels and keyboard navigation
- ✅ **Flexible Data**: Works with any hierarchical data structure

## Quick Start

### Basic Usage
```jsx
import NestedCheckBox from './NestedCheckBox';

function App() {
  return (
    <div>
      <NestedCheckBox />
    </div>
  );
}
```

### Custom Data
```jsx
const customData = [
  {
    id: 1,
    label: "Parent Item",
    checked: false,
    children: [
      { id: 2, label: "Child 1", checked: false },
      { id: 3, label: "Child 2", checked: false }
    ]
  }
];

<NestedCheckBox data={customData} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `SAMPLE_DATA` | Hierarchical data structure |

## Data Structure

Each node in the data array should have:

```jsx
{
  id: number,           // Unique identifier
  label: string,        // Display text
  checked: boolean,     // Initial checked state
  children?: Array      // Optional array of child nodes
}
```

### Example Data Structures

#### File System
```jsx
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
      }
    ]
  }
];
```

#### Permission System
```jsx
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
  }
];
```

## How It Works

### Component Structure
The component is split into two main parts:

1. **CheckboxItem**: Renders individual checkbox items recursively
2. **NestedCheckBox**: Manages the overall state and provides the main interface

### State Management
- Uses a single state object `checkedState` with format: `{ nodeId: boolean }`
- All checkbox states are managed centrally for easy synchronization

### Synchronization Logic

#### When a checkbox is toggled:
1. **Update the toggled node** with the new checked state
2. **Update all children** to match the parent's state
3. **Update all parents** based on their children's state

#### Parent-Child Rules:
- When a parent is checked → all children are checked
- When a parent is unchecked → all children are unchecked
- When all children are checked → parent is automatically checked
- When any child is unchecked → parent is automatically unchecked

## API Methods

The component provides several helper methods:

### getCheckedItems()
Returns an array of IDs for all checked items:
```jsx
const checkedIds = getCheckedItems(); // [1, 2, 3]
```

### clearAllSelections()
Clears all selections:
```jsx
clearAllSelections();
```

## Styling

### CSS Classes

| Class | Description |
|-------|-------------|
| `.nested-checkbox-container` | Main container |
| `.checkbox-item` | Individual checkbox wrapper |
| `.checkbox-item.root-level` | Root level items (no border) |
| `.checkbox-item.level-1` | First nesting level (blue border) |
| `.checkbox-item.level-2` | Second nesting level (green border) |
| `.checkbox-item.level-3` | Third nesting level (yellow border) |
| `.checkbox-children` | Container for child items |

### Customization Examples

#### Change nesting colors:
```css
.checkbox-item.level-1 { border-left-color: #ff6b6b; }
.checkbox-item.level-2 { border-left-color: #4ecdc4; }
.checkbox-item.level-3 { border-left-color: #45b7d1; }
```

#### Adjust spacing:
```css
.checkbox-item {
  padding-left: 30px;  /* Increase indentation */
  margin-top: 12px;    /* More space between items */
}
```

#### Custom checkbox styles:
```css
.checkbox-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #007bff;
}
```

## Usage Examples

### Basic Implementation
```jsx
import React from 'react';
import NestedCheckBox from './NestedCheckBox';

function MyComponent() {
  return (
    <div>
      <h2>Select Items</h2>
      <NestedCheckBox />
    </div>
  );
}
```

### With Custom Data
```jsx
import React, { useState } from 'react';
import NestedCheckBox from './NestedCheckBox';

function PermissionManager() {
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      label: "Admin",
      checked: false,
      children: [
        { id: 2, label: "User Management", checked: false },
        { id: 3, label: "System Settings", checked: false }
      ]
    }
  ]);

  return (
    <div>
      <h2>Permission Manager</h2>
      <NestedCheckBox data={permissions} />
    </div>
  );
}
```

### Getting Selected Values
```jsx
import React, { useRef } from 'react';
import NestedCheckBox from './NestedCheckBox';

function SelectionHandler() {
  const checkboxRef = useRef();

  const handleSubmit = () => {
    const selected = checkboxRef.current.getCheckedItems();
    console.log('Selected items:', selected);
  };

  return (
    <div>
      <NestedCheckBox ref={checkboxRef} />
      <button onClick={handleSubmit}>Get Selected</button>
    </div>
  );
}
```

## File Structure

```
NestedCheckBox/
├── NestedCheckBox.jsx       # Main component
├── NestedCheckBox.css       # Styling
├── NestedCheckBoxDemo.jsx   # Demo/examples
└── README.md               # This documentation
```

## Performance Considerations

- **Efficient Updates**: Only updates necessary nodes during state changes
- **Recursive Optimization**: Uses efficient recursive algorithms for tree traversal
- **State Management**: Centralized state prevents unnecessary re-renders
- **Key Props**: Proper key usage ensures efficient React reconciliation

## Accessibility

- **Keyboard Navigation**: Full keyboard support with Tab/Shift+Tab
- **Screen Readers**: Proper labels and ARIA attributes
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Uses proper checkbox inputs and labels

## Common Use Cases

1. **File/Folder Selection**: File managers, directory trees
2. **Permission Management**: Role-based access control
3. **Category Selection**: Product filters, taxonomy selection
4. **Feature Toggles**: Settings panels, feature flags
5. **Menu Systems**: Navigation menus, sidebar trees

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Implementation

1. **Unique IDs**: Always ensure node IDs are unique across the entire tree
2. **Data Immutability**: Don't mutate the original data structure
3. **Performance**: For large trees (1000+ nodes), consider virtualization
4. **Testing**: Test with different nesting levels and data structures
5. **Validation**: Validate data structure before passing to component

## Troubleshooting

### Common Issues

**Q: Parent doesn't update when children change**
A: Ensure all nodes have unique IDs and proper parent-child relationships

**Q: Styling not applying correctly**
A: Check if CSS classes are properly imported and not overridden

**Q: Performance issues with large trees**
A: Consider implementing virtualization for trees with 500+ nodes

**Q: State not persisting**
A: The component manages internal state. Use controlled components if you need external state management 