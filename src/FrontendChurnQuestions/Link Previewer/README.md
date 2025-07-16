# Link Previewer Component

A clean, functional link previewer component perfect for machine coding interviews.

## Features

- ✅ Hover interaction to show/hide preview cards
- ✅ Rich preview with image, title, description, URL
- ✅ Single state management for hover tracking
- ✅ Clean, minimal CSS styling
- ✅ Proper event handling with mouse events

## Key Implementation Details

### State Management
```javascript
const [hoveredLink, setHoveredLink] = useState(null);
```
- **Single state** tracks which link is currently hovered
- `null` means no link is hovered
- Each link has unique ID for tracking

### Event Handlers
```javascript
onMouseEnter={() => setHoveredLink(link.id)}
onMouseLeave={() => setHoveredLink(null)}
```
- **onMouseEnter**: Sets the hovered link ID
- **onMouseLeave**: Clears the hovered state
- Direct inline handlers for simplicity

### Conditional Rendering
```javascript
{hoveredLink === link.id && (
  <div className="preview-card">
    {/* Preview content */}
  </div>
)}
```
- Shows preview only when specific link is hovered
- Clean conditional rendering pattern

### Data Structure
```javascript
const links = [
  {
    id: 1,
    text: "Visit React Documentation",
    preview: {
      title: "React Documentation",
      description: "Learn React with the official documentation...",
      image: imageUrl,
      url: "reactjs.org"
    }
  }
];
```

## Interview Talking Points

1. **Why single state instead of multiple states?**
   - Only one preview can be shown at a time
   - Simpler state management
   - Prevents multiple cards from showing simultaneously

2. **How does hover interaction work?**
   - Mouse events trigger state changes
   - Conditional rendering based on current state
   - Clean separation of concerns

3. **Why use positioning for preview cards?**
   - Absolute positioning allows overlay display
   - Doesn't affect document flow
   - Easy to position relative to link

4. **How to handle edge cases?**
   - Links at screen edges could be clipped
   - Could add position detection logic
   - Could implement delay for better UX

## Usage

```javascript
import LinkPreviewer from './LinkPreviewer';

function App() {
  return <LinkPreviewer />;
}
```

## Possible Enhancements

- **Delay timer**: Add hover delay before showing preview
- **Loading states**: Show spinner while fetching preview data
- **Error handling**: Handle broken images gracefully
- **Keyboard navigation**: Support tab/enter interactions
- **Dynamic positioning**: Adjust position based on screen edges

## Time Complexity
- **Render**: O(n) where n is number of links
- **Hover**: O(1) for state update
- **Space**: O(1) for state storage 