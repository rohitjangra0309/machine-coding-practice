# Multiple Filters Component

A React component for filtering items by multiple categories with an intuitive toggle interface.

## Features

- ✅ **Multi-select filtering**: Users can select multiple categories simultaneously
- ✅ **Dynamic categories**: Filter buttons are automatically generated from data
- ✅ **Real-time updates**: Results update immediately as filters change
- ✅ **Clear all option**: Easy way to reset all filters at once
- ✅ **Results count**: Shows filtered vs total items count
- ✅ **Empty state**: Helpful message when no items match filters
- ✅ **Responsive design**: Works perfectly on all screen sizes

## Quick Start

### Basic Usage
```jsx
import MultipleFilters from './MultipleFilters';

function App() {
  return (
    <div>
      <MultipleFilters />
    </div>
  );
}
```

## Data Structure

The component reads from `items.js` with this structure:

```jsx
export const items = [
  {
    name: 'Prada',
    category: 'Bags',
  },
  {
    name: 'Rolex',
    category: 'Watches',
  },
  {
    name: 'Nike',
    category: 'Sports',
  },
  // ... more items
];
```

### Required Fields
- `name` (string): Display name of the item
- `category` (string): Category used for filtering

## How It Works

### 1. **Filter State Management**
```jsx
const [activeFilters, setActiveFilters] = useState([]);
```
- Tracks which categories are currently active
- Empty array means show all items

### 2. **Dynamic Category Generation**
```jsx
const availableCategories = [...new Set(items.map(item => item.category))].sort();
```
- Automatically extracts unique categories from items
- Sorts them alphabetically

### 3. **Filtering Logic**
```jsx
const filteredItems = activeFilters.length === 0 
  ? items 
  : items.filter(item => activeFilters.includes(item.category));
```
- Shows all items when no filters are active
- Shows items that match ANY active filter (OR logic)

### 4. **Toggle Behavior**
```jsx
const toggleFilter = (filterCategory) => {
  setActiveFilters(prevFilters => {
    if (prevFilters.includes(filterCategory)) {
      return prevFilters.filter(filter => filter !== filterCategory);
    } else {
      return [...prevFilters, filterCategory];
    }
  });
};
```
- Clicking active filter removes it
- Clicking inactive filter adds it

## Component Structure

### Main Elements
- **Filter Buttons**: Toggle categories on/off
- **Clear All Button**: Appears when filters are active
- **Results Count**: Shows current vs total items
- **Items Grid**: Displays filtered results
- **Empty State**: Shown when no items match

### CSS Classes
- `.filters-container`: Main wrapper
- `.filters-title`: Page title
- `.filter-buttons`: Button container
- `.filter-button`: Individual filter button
- `.filter-button.active`: Active filter button
- `.results-count`: Results counter
- `.items-container`: Items grid
- `.item-card`: Individual item card
- `.item-name`: Item name
- `.item-category`: Item category
- `.empty-state`: No results message

## Customization

### Styling
Modify `MultipleFilters.css` to change appearance:

```css
.filter-button {
  padding: 12px 24px;
  background-color: #f8f9fa;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.filter-button.active {
  background-color: #007bff;
  color: white;
}
```

### Adding New Features

#### 1. Search Functionality
```jsx
const [searchTerm, setSearchTerm] = useState('');

const filteredItems = items.filter(item => {
  const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = activeFilters.length === 0 || activeFilters.includes(item.category);
  return matchesSearch && matchesCategory;
});
```

#### 2. Sorting Options
```jsx
const [sortBy, setSortBy] = useState('name');

const sortedItems = [...filteredItems].sort((a, b) => {
  if (sortBy === 'name') {
    return a.name.localeCompare(b.name);
  }
  if (sortBy === 'category') {
    return a.category.localeCompare(b.category);
  }
  return 0;
});
```

#### 3. External Data Integration
```jsx
const [items, setItems] = useState([]);

useEffect(() => {
  fetch('/api/items')
    .then(response => response.json())
    .then(data => setItems(data));
}, []);
```

## File Structure

```
Multiple Filters/
├── MultipleFilters.jsx       # Main component
├── MultipleFilters.css       # Styling
├── MultipleFiltersDemo.jsx   # Demo/examples
├── items.js                  # Sample data
└── README.md                 # This documentation
```

## Common Use Cases

1. **E-commerce**: Product filtering by category
2. **Job boards**: Filter jobs by type, location
3. **Real estate**: Filter by property type, price range
4. **Content management**: Filter articles by tags
5. **User management**: Filter by roles, departments

## Troubleshooting

### Common Issues

**Q: Filters not updating correctly**
A: Check that items have consistent `category` field names

**Q: Styling not applying**
A: Ensure `MultipleFilters.css` is imported correctly

**Q: Categories not showing**
A: Verify that items array contains valid category fields

## License

This component is part of the machine coding practice collection and is intended for educational purposes. 