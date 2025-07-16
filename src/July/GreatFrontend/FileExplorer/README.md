# File Explorer Component

A clean, functional file explorer component perfect for machine coding interviews.

## Features

- ✅ Expand/collapse folders
- ✅ Recursive folder structure
- ✅ Centralized state management
- ✅ Clean, minimal CSS
- ✅ Proper key usage for React lists

## Key Implementation Details

### State Management
- **Single state object** in parent component tracks all expanded items
- **Props drilling** passes state and updater functions to child components
- **Avoids** multiple useState in each recursive component (common mistake)

### Recursion Pattern
```javascript
// Each item renders itself and its children
const FileExplorerItem = ({ item, expandedItems, toggleExpanded }) => {
  // ... render logic
  {hasChildren && isExpanded && (
    <div className="children">
      {item.children.map((child) => (
        <FileExplorerItem 
          key={child.id}
          item={child}
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
        />
      ))}
    </div>
  )}
}
```

### Data Structure
```javascript
const data = [
  {
    id: 1,
    name: "README.md"
  },
  {
    id: 2,
    name: "Documents",
    children: [
      { id: 3, name: "resume.doc" },
      // ... nested structure
    ]
  }
];
```

## Interview Talking Points

1. **Why centralized state?**
   - Prevents memory leaks from multiple useState
   - Easier to control overall expanded state
   - Single source of truth

2. **Why use item.id as key?**
   - More reliable than array index
   - Prevents React reconciliation issues
   - Unique identifier for each item

3. **How to handle deeper nesting?**
   - Current solution works for any depth
   - React handles recursive rendering automatically
   - No maximum depth limitation

4. **Performance considerations:**
   - Could add useMemo for large datasets
   - Could implement virtual scrolling for huge lists
   - Current solution is optimal for typical use cases

## Usage

```javascript
import FileExplorer from './FileExplorer';

function App() {
  return <FileExplorer />;
}
```

## Time Complexity
- **Render**: O(n) where n is number of visible items
- **Toggle**: O(1) for state update
- **Space**: O(d) where d is maximum depth for recursion stack 