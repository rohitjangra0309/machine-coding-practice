import React, { useState, useEffect, useCallback } from 'react';
import './ImageCarousel.css';

/**
 * ImageCarousel Component - A responsive image carousel with navigation controls
 * 
 * Features:
 * - Previous/Next navigation buttons
 * - Clickable indicator dots
 * - Keyboard navigation support
 * - Auto-disable buttons at boundaries
 * - Accessibility features (ARIA labels, focus management)
 * - Responsive design
 * 
 * @param {Array} images - Array of image objects with src and alt properties
 * @param {boolean} loop - Whether to loop from last to first image (default: false)
 * @param {boolean} autoPlay - Whether to auto-advance slides (default: false)
 * @param {number} autoPlayInterval - Auto-play interval in milliseconds (default: 3000)
 */
const ImageCarousel = ({ 
  images, 
  loop = false, 
  autoPlay = false, 
  autoPlayInterval = 3000 
}) => {
  // State to track the currently displayed image index
  const [currentImage, setCurrentImage] = useState(0);
  
  // State to track if auto-play is paused (on hover)
  const [isPaused, setIsPaused] = useState(false);
  
  // State to track if image is loading during transitions
  const [isLoading, setIsLoading] = useState(false);
  
  // State to track if spinner should be shown (with minimum display time)
  const [showSpinner, setShowSpinner] = useState(false);
  
  // Calculate total number of images
  const totalImages = images.length;
  
  // Validate that images array is provided and not empty
  if (!images || images.length === 0) {
    return (
      <div className="carousel" role="alert">
        <p>No images provided to display.</p>
      </div>
    );
  }

  /**
   * Navigate to the next image
   * Uses modulo operator to wrap around if looping is enabled
   */
  const nextImage = useCallback(() => {
    setIsLoading(true); // Show spinner during transition
    setCurrentImage((prev) => {
      if (loop) {
        // Loop back to first image if we're at the last one
        return (prev + 1) % totalImages;
      } else {
        // Stop at last image if looping is disabled
        return Math.min(prev + 1, totalImages - 1);
      }
    });
  }, [totalImages, loop]);

  /**
   * Navigate to the previous image
   * Uses modulo operator to wrap around if looping is enabled
   */
  const prevImage = useCallback(() => {
    setIsLoading(true); // Show spinner during transition
    setCurrentImage((prev) => {
      if (loop) {
        // Loop to last image if we're at the first one
        return (prev - 1 + totalImages) % totalImages;
      } else {
        // Stop at first image if looping is disabled
        return Math.max(prev - 1, 0);
      }
    });
  }, [totalImages, loop]);

  /**
   * Navigate directly to a specific image by index
   * @param {number} index - The image index to navigate to
   */
  const goToImage = useCallback((index) => {
    // Validate index is within bounds
    if (index >= 0 && index < totalImages) {
      setIsLoading(true); // Show spinner during transition
      setCurrentImage(index);
    }
  }, [totalImages]);

  /**
   * Handle keyboard navigation
   * Arrow Left: Previous image
   * Arrow Right: Next image
   * Home: First image
   * End: Last image
   */
  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prevImage();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextImage();
        break;
      case 'Home':
        event.preventDefault();
        goToImage(0);
        break;
      case 'End':
        event.preventDefault();
        goToImage(totalImages - 1);
        break;
      default:
        break;
    }
  }, [prevImage, nextImage, goToImage, totalImages]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || totalImages <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, autoPlayInterval);

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, nextImage, totalImages]);

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Handle spinner display with minimum show time to prevent flickering
  useEffect(() => {
    let timer;
    
    if (isLoading) {
      // Show spinner immediately when loading starts
      setShowSpinner(true);
    } else {
      // Hide spinner after a minimum display time (300ms) to prevent flickering
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, 300);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  /**
   * Determine if previous button should be disabled
   * Disabled when at first image and not looping
   */
  const isPrevDisabled = !loop && currentImage === 0;

  /**
   * Determine if next button should be disabled
   * Disabled when at last image and not looping
   */
  const isNextDisabled = !loop && currentImage === totalImages - 1;

  /**
   * Get the current image data with fallback values
   */
  const getCurrentImageData = () => {
    const image = images[currentImage];
    return {
      src: image?.src || '',
      alt: image?.alt || `Carousel image ${currentImage + 1} of ${totalImages}`
    };
  };

  const currentImageData = getCurrentImageData();

  return (
    <div 
      className="carousel" 
      role="region"
      aria-label="Image carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel content with image and navigation */}
      <div className="carousel__content">
        {/* Previous button */}
        <button 
          className="carousel__button carousel__button--prev"
          onClick={prevImage}
          disabled={isPrevDisabled}
          aria-label="Previous image"
          title="Previous image (Left arrow key)"
        >
          &#9664;
        </button>
        
        {/* Image wrapper with loading state */}
        <div 
          className="carousel__image-wrapper"
          role="img"
          aria-label={currentImageData.alt}
        >
          <img 
            src={currentImageData.src} 
            alt={currentImageData.alt}
            className="carousel__image"
            loading="lazy"
            onLoad={() => setIsLoading(false)} // Hide spinner when image loads
            onError={(e) => {
              // Handle image loading errors
              setIsLoading(false); // Hide spinner even on error
              e.target.alt = `Failed to load image ${currentImage + 1}`;
              console.warn(`Failed to load image: ${currentImageData.src}`);
            }}
          />
          
          {/* Loading spinner overlay */}
          {showSpinner && (
            <div className="carousel__spinner-overlay">
              <div className="carousel__spinner" aria-label="Loading image">
                <div className="carousel__spinner-ring"></div>
                <div className="carousel__spinner-ring"></div>
                <div className="carousel__spinner-ring"></div>
                <div className="carousel__spinner-ring"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Next button */}
        <button 
          className="carousel__button carousel__button--next"
          onClick={nextImage}
          disabled={isNextDisabled}
          aria-label="Next image"
          title="Next image (Right arrow key)"
        >
          &#9654;
        </button>
      </div>
      
      {/* Image counter display */}
      <div className="carousel__counter" aria-live="polite">
        {currentImage + 1} / {totalImages}
      </div>
      
      {/* Indicator dots - only show if there are multiple images */}
      {totalImages > 1 && (
        <div 
          className="carousel__indicators"
          role="tablist"
          aria-label="Image indicators"
        >
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel__indicator ${
                index === currentImage ? 'carousel__indicator--active' : ''
              }`}
              onClick={() => goToImage(index)}
              role="tab"
              aria-selected={index === currentImage}
              aria-label={`Go to image ${index + 1}`}
              title={`Image ${index + 1} of ${totalImages}`}
            />
          ))}
        </div>
      )}
      
      {/* Status information for screen readers */}
      <div 
        className="carousel__status"
        aria-live="polite"
        aria-atomic="true"
        style={{ 
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      >
        {isLoading ? 'Loading image...' : `Showing image ${currentImage + 1} of ${totalImages}`}
        {autoPlay && !isPaused && ', auto-playing'}
        {isPaused && ', paused'}
      </div>
    </div>
  );
};

export default ImageCarousel;