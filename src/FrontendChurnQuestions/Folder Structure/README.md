# Folder Structure Component

A React component that displays a file explorer tree view with expandable/collapsible folders, perfect for machine coding interviews.

## Features

- ✅ **Simple text indicators**: Uses "+/-" for folders, "JS/CSS/HTML" for files
- ✅ **Recursive structure**: Clean recursive component pattern
- ✅ **Easy to code**: No complex icons or external dependencies
- ✅ **Expandable folders**: Click to expand/collapse folders
- ✅ **File type detection**: Simple badges for different file types
- ✅ **Interview-friendly**: Easy to explain and implement quickly

## Why Perfect for Interviews

### 🎯 **Simple & Clear**
- No emoji icons that are hard to remember
- Simple text indicators that are easy to type
- Clear logic flow that's easy to explain

### 🎯 **Shows Key Concepts**
- **Recursion**: Demonstrates recursive component patterns
- **State Management**: Each folder manages its own expanded state
- **Conditional Rendering**: Shows children only when expanded
- **Component Composition**: Clean parent-child relationships

### 🎯 **Quick to Implement**
- Can be coded in 30-40 minutes
- No external dependencies
- Minimal setup required

## Quick Start

### Basic Usage
```jsx
import FolderStructure from './FolderStructure';

function App() {
  return (
    <div>
      <FolderStructure />
    </div>
  );
}
```

## Data Structure

The component uses this simple tree structure:

```jsx
const fileSystemData = {
  name: "my-project",
  isFolder: true,
  children: [
    {
      name: "src",
      isFolder: true,
      children: [
        { name: "App.js", isFolder: false },
        { name: "index.js", isFolder: false },
        {
          name: "components",
          isFolder: true,
          children: [
            { name: "Header.js", isFolder: false },
            { name: "Footer.js", isFolder: false },
          ],
        },
      ],
    },
    { name: "package.json", isFolder: false },
  ],
};
```

### Required Fields
- `name` (string): Name of the file or folder
- `isFolder` (boolean): Whether item is a folder or file
- `children` (array): Child items (only for folders)

## How It Works

### 1. **Recursive Component Pattern**
```jsx
const FolderItem = ({ item, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div>
      {/* Current item */}
      <div onClick={toggleFolder}>
        {item.isFolder ? (isExpanded ? '−' : '+') : getFileType(item.name)}
        {item.name}
      </div>
      
      {/* Children (recursive) */}
      {isExpanded && item.isFolder && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FolderItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
```

### 2. **State Management**
```jsx
const [isExpanded, setIsExpanded] = useState(false);
```
- Each folder component has its own expansion state
- Independent state management for each folder level

### 3. **File Type Detection**
```jsx
const getFileType = (fileName) => {
  if (fileName.endsWith(".js")) return "JS";
  if (fileName.endsWith(".css")) return "CSS";
  if (fileName.endsWith(".html")) return "HTML";
  if (fileName.endsWith(".json")) return "JSON";
  if (fileName.endsWith(".md")) return "MD";
  return "FILE";
};
```

### 4. **Simple Indicators**
- **Folders**: "+" (closed) or "−" (open)
- **Files**: "JS", "CSS", "HTML", "JSON", "MD", "FILE"

## Component Structure

### Main Elements
- **Container**: Main wrapper with title
- **FolderItem**: Recursive component for each file/folder
- **Indicators**: Simple text indicators for visual feedback
- **Nesting**: Indentation based on folder depth

### CSS Classes
- `.folder-structure-container`: Main wrapper
- `.folder-structure-title`: Title
- `.folder-tree`: Tree container
- `.folder-item`: Individual file/folder
- `.folder-item.folder`: Folder styling
- `.folder-item.file`: File styling
- `.folder-icon`: Indicator styling
- `.folder-name`: Name styling
- `.folder-children`: Children container

## Interview Talking Points

### When explaining this component in interviews:

1. **"I'm using a recursive component pattern"**
   - Each folder can contain other folders
   - Same component renders all levels

2. **"Each folder manages its own state"**
   - `useState` for expanded/collapsed state
   - Independent state for each folder

3. **"I'm using simple text indicators"**
   - Easy to implement quickly
   - No external icon dependencies

4. **"The data structure is a tree"**
   - Parent-child relationships
   - Recursive data structure

5. **"Conditional rendering for children"**
   - Only show children when expanded
   - Performance optimization

## Implementation Steps (Interview)

### Step 1: Data Structure
```jsx
const data = {
  name: "root",
  isFolder: true,
  children: [/* ... */]
};
```

### Step 2: Recursive Component
```jsx
const FolderItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // ... render logic
};
```

### Step 3: Toggle Function
```jsx
const toggleFolder = () => {
  if (item.isFolder) {
    setIsExpanded(!isExpanded);
  }
};
```

### Step 4: Conditional Rendering
```jsx
{isExpanded && item.children && (
  <div>
    {item.children.map(child => (
      <FolderItem key={child.name} item={child} />
    ))}
  </div>
)}
```

## Customization

### Adding New File Types
```jsx
const getFileType = (fileName) => {
  if (fileName.endsWith(".jsx")) return "JSX";
  if (fileName.endsWith(".ts")) return "TS";
  if (fileName.endsWith(".py")) return "PY";
  // ... more types
};
```

### Custom Styling
```css
.folder-item.folder {
  font-weight: bold;
  color: #007acc;
}

.folder-item.file {
  color: #666;
}
```

### Adding Icons (Advanced)
```jsx
const getFileIcon = (fileName) => {
  if (fileName.endsWith(".js")) return "📄";
  if (fileName.endsWith(".css")) return "🎨";
  // ... more icons
};
```

## Common Extensions

### File Selection
```jsx
const [selectedFile, setSelectedFile] = useState(null);

const handleFileClick = (item) => {
  if (!item.isFolder) {
    setSelectedFile(item);
  }
};
```

### Search Functionality
```jsx
const [searchTerm, setSearchTerm] = useState('');

const filterItems = (items, term) => {
  return items.filter(item => 
    item.name.toLowerCase().includes(term.toLowerCase()) ||
    (item.children && filterItems(item.children, term).length > 0)
  );
};
```

## File Structure

```
Folder Structure/
├── FolderStructure.jsx        # Main component
├── FolderStructure.css        # Minimal styling
├── FolderStructureDemo.jsx    # Demo/examples
└── README.md                  # This documentation
```

## Best Practices for Interviews

### Do:
- ✅ Use simple text indicators
- ✅ Explain the recursive pattern clearly
- ✅ Show how state management works
- ✅ Demonstrate the tree data structure

### Don't:
- ❌ Use complex icons or external libraries
- ❌ Over-engineer with unnecessary features
- ❌ Forget to explain the recursion
- ❌ Make the state management too complex

## Common Interview Questions

**Q: How does the recursion work?**
A: Each FolderItem component can render other FolderItem components for its children, creating a recursive tree structure.

**Q: How do you handle state management?**
A: Each folder has its own useState hook to track if it's expanded or collapsed, allowing independent state management at each level.

**Q: How would you optimize this for large file trees?**
A: Could add lazy loading, virtualization, or memoization to handle large datasets efficiently.

**Q: How would you add file selection?**
A: Add a selectedFile state at the top level and pass down click handlers to update it when files are clicked.

## License

This component is part of the machine coding practice collection and is intended for educational purposes. 