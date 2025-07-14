import React from 'react';
import ImageCarousel from './ImageCarousel';

/**
 * Demo component showing different ImageCarousel configurations
 */
const ImageCarouselDemo = () => {
  // Sample image data for demonstrations
  const sampleImages = [
    {
      src: 'https://picsum.photos/800/400?random=1',
      alt: 'Beautiful landscape with mountains and lake'
    },
    {
      src: 'https://picsum.photos/800/400?random=2',
      alt: 'City skyline at sunset'
    },
    {
      src: 'https://picsum.photos/800/400?random=3',
      alt: 'Forest path in autumn'
    },
    {
      src: 'https://picsum.photos/800/400?random=4',
      alt: 'Ocean waves on sandy beach'
    },
    {
      src: 'https://picsum.photos/800/400?random=5',
      alt: 'Snow-covered mountain peaks'
    }
  ];

  // Smaller image set for compact demo
  const smallImageSet = [
    {
      src: 'https://picsum.photos/400/300?random=6',
      alt: 'Garden with colorful flowers'
    },
    {
      src: 'https://picsum.photos/400/300?random=7',
      alt: 'Cute kitten playing'
    },
    {
      src: 'https://picsum.photos/400/300?random=8',
      alt: 'Fresh fruits on wooden table'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ImageCarousel Component Demo</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Example 1: Basic Carousel (No Loop)</h2>
        <p>
          Basic carousel with navigation buttons and indicator dots. 
          Previous/Next buttons are disabled at boundaries.
        </p>
        <ImageCarousel images={sampleImages} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 2: Looping Carousel</h2>
        <p>
          Carousel with looping enabled - clicking next on the last image 
          goes to the first image, and vice versa.
        </p>
        <ImageCarousel 
          images={sampleImages} 
          loop={true}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 3: Auto-Playing Carousel</h2>
        <p>
          Auto-advances to next image every 2 seconds. 
          Pauses on hover and resumes when mouse leaves.
        </p>
        <ImageCarousel 
          images={smallImageSet} 
          autoPlay={true}
          autoPlayInterval={2000}
          loop={true}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 4: Single Image</h2>
        <p>
          When only one image is provided, navigation buttons and 
          indicators are automatically hidden.
        </p>
        <ImageCarousel 
          images={[{
            src: 'https://picsum.photos/600/400?random=9',
            alt: 'Single demonstration image'
          }]}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Example 5: Error Handling</h2>
        <p>
          Carousel handles missing images gracefully with fallback alt text.
        </p>
        <ImageCarousel 
          images={[
            {
              src: 'https://picsum.photos/600/400?random=10',
              alt: 'Valid image'
            },
            {
              src: 'https://invalid-url.com/nonexistent.jpg',
              alt: 'This image will fail to load'
            },
            {
              src: 'https://picsum.photos/600/400?random=11',
              alt: 'Another valid image'
            }
          ]}
        />
      </div>

      {/* Usage instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>How to Use ImageCarousel:</h3>
        
        <h4>Basic Usage:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`import ImageCarousel from './ImageCarousel';

const images = [
  { src: 'image1.jpg', alt: 'Description 1' },
  { src: 'image2.jpg', alt: 'Description 2' }
];

<ImageCarousel images={images} />`}
        </pre>

        <h4>With All Props:</h4>
        <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px' }}>
{`<ImageCarousel 
  images={images}
  loop={true}
  autoPlay={true}
  autoPlayInterval={3000}
/>`}
        </pre>

        <h4>Props:</h4>
        <ul>
          <li><strong>images</strong> (Array, required): Array of image objects with `src` and `alt` properties</li>
          <li><strong>loop</strong> (boolean, default: false): Enable infinite looping</li>
          <li><strong>autoPlay</strong> (boolean, default: false): Enable auto-advance</li>
          <li><strong>autoPlayInterval</strong> (number, default: 3000): Auto-advance interval in milliseconds</li>
        </ul>

        <h4>Features:</h4>
        <ul>
          <li>✅ Responsive design that works on all screen sizes</li>
          <li>✅ Keyboard navigation (Arrow keys, Home, End)</li>
          <li>✅ Accessibility support (ARIA labels, screen reader friendly)</li>
          <li>✅ Auto-play with pause on hover</li>
          <li>✅ Clickable indicator dots</li>
          <li>✅ Error handling for failed image loads</li>
          <li>✅ Dark mode support</li>
          <li>✅ Smooth transitions and animations</li>
        </ul>

        <h4>Keyboard Shortcuts:</h4>
        <ul>
          <li><strong>←</strong> Previous image</li>
          <li><strong>→</strong> Next image</li>
          <li><strong>Home</strong> First image</li>
          <li><strong>End</strong> Last image</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageCarouselDemo; 