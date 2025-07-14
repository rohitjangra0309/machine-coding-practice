# ImageCarousel Component

A fully-featured, accessible, and responsive React image carousel component with navigation controls, keyboard support, and auto-play functionality.

## Features

- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ✅ **Keyboard Navigation**: Full keyboard support (Arrow keys, Home, End)
- ✅ **Accessibility**: ARIA labels, screen reader support, proper focus management
- ✅ **Auto-Play**: Optional auto-advance with pause on hover
- ✅ **Looping**: Optional infinite scrolling
- ✅ **Error Handling**: Graceful handling of failed image loads
- ✅ **Dark Mode**: Automatic dark mode support
- ✅ **Touch Support**: Swipe gestures on mobile devices
- ✅ **Smooth Animations**: CSS transitions for smooth user experience
- ✅ **Loading Spinner**: Visual feedback during image transitions

## Quick Start

### Basic Usage
```jsx
import ImageCarousel from './ImageCarousel';

const images = [
  { src: 'image1.jpg', alt: 'Description 1' },
  { src: 'image2.jpg', alt: 'Description 2' },
  { src: 'image3.jpg', alt: 'Description 3' }
];

function App() {
  return (
    <div>
      <ImageCarousel images={images} />
    </div>
  );
}
```

### Advanced Usage
```jsx
<ImageCarousel 
  images={images}
  loop={true}
  autoPlay={true}
  autoPlayInterval={3000}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `Array` | **Required** | Array of image objects with `src` and `alt` properties |
| `loop` | `boolean` | `false` | Enable infinite looping between first and last image |
| `autoPlay` | `boolean` | `false` | Enable auto-advance to next image |
| `autoPlayInterval` | `number` | `3000` | Auto-advance interval in milliseconds |

## Image Object Structure

Each image object in the `images` array should have:

```jsx
{
  src: string,    // Image URL (required)
  alt: string     // Alt text for accessibility (required)
}
```

### Example:
```jsx
const images = [
  {
    src: 'https://example.com/image1.jpg',
    alt: 'Beautiful sunset over mountains'
  },
  {
    src: 'https://example.com/image2.jpg',
    alt: 'City skyline at night'
  }
];
```

## Usage Examples

### Basic Carousel
```jsx
<ImageCarousel images={images} />
```

### Looping Carousel
```jsx
<ImageCarousel 
  images={images} 
  loop={true}
/>
```

### Auto-Playing Carousel
```jsx
<ImageCarousel 
  images={images}
  autoPlay={true}
  autoPlayInterval={2000}
  loop={true}
/>
```

### Single Image Display
```jsx
<ImageCarousel 
  images={[{
    src: 'single-image.jpg',
    alt: 'Single image display'
  }]}
/>
```

## Features in Detail

### Navigation Controls
- **Previous/Next Buttons**: Navigate between images
- **Indicator Dots**: Click to jump to specific image
- **Auto-disable**: Buttons are disabled at boundaries (when not looping)

### Keyboard Support
- **Arrow Left (←)**: Previous image
- **Arrow Right (→)**: Next image
- **Home**: Jump to first image
- **End**: Jump to last image

### Auto-Play Behavior
- Auto-advances to next image at specified interval
- Pauses when mouse hovers over carousel
- Resumes when mouse leaves carousel
- Automatically stops at last image (unless looping is enabled)

### Accessibility Features
- **ARIA Labels**: Proper labeling for all interactive elements
- **Screen Reader Support**: Announcements for image changes
- **Focus Management**: Proper focus indicators and keyboard navigation
- **Semantic HTML**: Uses proper roles and attributes

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adjusted sizing for tablet screens
- **Desktop Enhancement**: Full-featured desktop experience

### Loading States
- **Transition Spinner**: Shows animated spinner during image switches
- **Minimum Display Time**: Prevents flickering on fast image loads
- **Accessible Loading**: Screen reader announcements for loading states
- **Error Handling**: Spinner hides gracefully on image load errors

## Styling and Customization

### CSS Classes

| Class | Description |
|-------|-------------|
| `.carousel` | Main container |
| `.carousel__content` | Content wrapper with image and buttons |
| `.carousel__image-wrapper` | Image container |
| `.carousel__image` | The actual image element |
| `.carousel__button` | Navigation buttons |
| `.carousel__button--prev` | Previous button |
| `.carousel__button--next` | Next button |
| `.carousel__counter` | Image counter display |
| `.carousel__indicators` | Indicator dots container |
| `.carousel__indicator` | Individual indicator dot |
| `.carousel__indicator--active` | Active indicator dot |
| `.carousel__spinner-overlay` | Loading spinner overlay |
| `.carousel__spinner` | Spinner container |
| `.carousel__spinner-ring` | Individual spinner ring |

### Custom Styling Examples

#### Change button colors:
```css
.carousel__button {
  background: #007bff;
  color: white;
}

.carousel__button:hover {
  background: #0056b3;
}
```

#### Customize indicator dots:
```css
.carousel__indicator {
  width: 15px;
  height: 15px;
  background-color: #ddd;
}

.carousel__indicator--active {
  background-color: #007bff;
}
```

#### Adjust carousel size:
```css
.carousel {
  max-width: 1200px;
}

.carousel__image-wrapper {
  height: 500px;
}
```

#### Customize loading spinner:
```css
.carousel__spinner-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.carousel__spinner {
  width: 50px;
  height: 50px;
}

.carousel__spinner-ring {
  border-top-color: #ff6b6b;
}
```

## Error Handling

The carousel handles various error scenarios gracefully:

### Invalid Images
- Failed image loads show fallback alt text
- Console warnings for debugging
- Carousel continues to function normally

### Empty Image Array
- Shows informative message
- Prevents JavaScript errors
- Maintains component structure

### Invalid Props
- Fallback to default values
- Graceful degradation
- Type checking in development

## Performance Considerations

- **Lazy Loading**: Images use `loading="lazy"` attribute
- **Efficient Re-renders**: Uses `useCallback` for optimal performance
- **Memory Management**: Proper cleanup of intervals and event listeners
- **Optimized CSS**: Hardware-accelerated transitions

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: Screen readers and keyboard navigation
- **Progressive Enhancement**: Graceful degradation for older browsers

## File Structure

```
ImageCarousel/
├── ImageCarousel.jsx          # Main component
├── ImageCarousel.css          # Styling
├── ImageCarouselDemo.jsx      # Demo/examples
└── README.md                 # This documentation
```

## Development Tips

### Testing Different Scenarios
1. **Single Image**: Test with one image
2. **Multiple Images**: Test with 3-5 images
3. **Failed Images**: Test with invalid URLs
4. **Empty Array**: Test with no images
5. **Large Images**: Test with high-resolution images

### Customization Ideas
1. **Thumbnails**: Add thumbnail navigation
2. **Zoom**: Add image zoom functionality
3. **Fullscreen**: Add fullscreen mode
4. **Captions**: Add image captions
5. **Slideshow**: Add slideshow mode

### Performance Optimization
1. **Image Optimization**: Use WebP format when possible
2. **Preloading**: Preload next/previous images
3. **Virtual Scrolling**: For large image sets
4. **Lazy Loading**: Load images only when needed

## Troubleshooting

### Common Issues

**Q: Images not displaying**
A: Check image URLs and ensure they're accessible. Check browser console for errors.

**Q: Carousel not responsive**
A: Ensure CSS is properly imported and no conflicting styles exist.

**Q: Auto-play not working**
A: Check that `autoPlay` is set to `true` and `autoPlayInterval` is a positive number.

**Q: Keyboard navigation not working**
A: Ensure the carousel is focused or click on it first.

**Q: Indicators not clickable**
A: Check for CSS z-index issues or overlapping elements.

## Migration Guide

If upgrading from an older version:

1. **Props Changes**: Check if any prop names have changed
2. **CSS Classes**: Update any custom CSS class names
3. **Event Handlers**: Update any custom event handlers
4. **Dependencies**: Ensure React version compatibility

## Contributing

When contributing to this component:

1. **Follow JSDoc**: Add proper documentation for all functions
2. **Test Accessibility**: Ensure ARIA labels and keyboard navigation work
3. **Mobile Testing**: Test on various mobile devices
4. **Performance**: Consider performance implications of changes
5. **Backward Compatibility**: Avoid breaking existing APIs

## License

This component is part of the GreatFrontend practice collection and is intended for educational purposes. 