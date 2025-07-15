# Link Previewer Component

A React component that displays rich preview cards when hovering over links, similar to social media link previews.

## Features

- ✅ **Hover interaction**: Shows preview cards on mouse hover
- ✅ **Rich previews**: Displays title, description, image, and URL
- ✅ **Single state management**: Efficient hover tracking
- ✅ **Responsive design**: Works on all screen sizes
- ✅ **Clean CSS**: Separate stylesheet for maintainability
- ✅ **Smooth transitions**: CSS transitions for better UX

## Quick Start

### Basic Usage
```jsx
import LinkPreviewer from './LinkPreviewer';

function App() {
  return (
    <div>
      <LinkPreviewer />
    </div>
  );
}
```

## Data Structure

The component uses this data structure for links:

```jsx
const sampleLinks = [
  {
    id: 1,
    text: "Visit React Documentation",
    url: "https://reactjs.org/docs",
    preview: {
      title: "React Documentation",
      description: "Learn React with the official documentation. Build user interfaces with components, props, and state management.",
      image: imageUrl,
      url: "reactjs.org"
    }
  },
  // ... more links
];
```

### Required Fields
- `id` (number): Unique identifier for the link
- `text` (string): Display text for the link
- `url` (string): Actual URL of the link
- `preview` (object): Preview information
  - `title` (string): Title of the preview
  - `description` (string): Description text
  - `image` (string): Image URL or import
  - `url` (string): Domain name for display

## How It Works

### 1. **Hover State Management**
```jsx
const [hoveredLink, setHoveredLink] = useState(null);
```
- Tracks which link is currently being hovered
- `null` means no link is hovered

### 2. **Event Handlers**
```jsx
const handleMouseEnter = (linkId) => {
  setHoveredLink(linkId);
};

const handleMouseLeave = () => {
  setHoveredLink(null);
};
```
- `handleMouseEnter`: Sets the hovered link ID
- `handleMouseLeave`: Clears the hovered state

### 3. **Conditional Rendering**
```jsx
{hoveredLink === link.id && (
  <div className="preview-card">
    {/* Preview content */}
  </div>
)}
```
- Shows preview card only when link is hovered
- Each link has its own preview card

## Component Structure

### Main Elements
- **Container**: Main wrapper with title
- **Links List**: Container for all links
- **Link Item**: Individual link with hover handlers
- **Preview Card**: Rich preview with image, title, description, URL

### CSS Classes
- `.link-previewer-container`: Main wrapper
- `.link-previewer-title`: Page title
- `.links-list`: Links container
- `.link-item`: Individual link wrapper
- `.link-text`: Link text styling
- `.preview-card`: Preview card container
- `.preview-image`: Preview image
- `.preview-title`: Preview title
- `.preview-description`: Preview description
- `.preview-url`: Preview URL

## Customization

### Styling
Modify `LinkPreviewer.css` to change appearance:

```css
.preview-card {
  width: 300px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}

.link-text {
  color: #007bff;
  text-decoration: underline;
}
```

### Adding New Features

#### 1. Delay Timer
```jsx
const [hoveredLink, setHoveredLink] = useState(null);
const [hoverTimer, setHoverTimer] = useState(null);

const handleMouseEnter = (linkId) => {
  const timer = setTimeout(() => {
    setHoveredLink(linkId);
  }, 300); // 300ms delay
  setHoverTimer(timer);
};

const handleMouseLeave = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
  }
  setHoveredLink(null);
};
```

#### 2. Loading States
```jsx
const [loading, setLoading] = useState({});

const handleMouseEnter = async (linkId) => {
  setLoading(prev => ({ ...prev, [linkId]: true }));
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  setLoading(prev => ({ ...prev, [linkId]: false }));
  setHoveredLink(linkId);
};
```

#### 3. Dynamic Data
```jsx
const [links, setLinks] = useState([]);

useEffect(() => {
  fetch('/api/links')
    .then(response => response.json())
    .then(data => setLinks(data));
}, []);
```

## File Structure

```
Link Previewer/
├── LinkPreviewer.jsx        # Main component
├── LinkPreviewer.css        # Styling
├── LinkPreviewerDemo.jsx    # Demo/examples
├── image.png               # Sample image
└── README.md               # This documentation
```

## Common Use Cases

1. **Social media**: Rich link previews in posts
2. **Documentation**: Preview links in articles
3. **E-commerce**: Product link previews
4. **News sites**: Article link previews
5. **Portfolios**: Project link previews

## Best Practices

### Performance
- Use single state for hover tracking
- Avoid creating multiple timers
- Optimize image loading

### User Experience
- Add smooth transitions
- Show loading states for slow content
- Handle broken images gracefully

### Accessibility
- Ensure keyboard navigation works
- Add proper ARIA labels
- Provide alternative text for images

## Troubleshooting

### Common Issues

**Q: Preview not showing on hover**
A: Check that hover event handlers are properly attached

**Q: Images not loading**
A: Verify image imports and paths are correct

**Q: Styling not applying**
A: Ensure CSS file is imported correctly

**Q: Multiple previews showing**
A: Check that only one link ID is stored in state

## License

This component is part of the machine coding practice collection and is intended for educational purposes. 