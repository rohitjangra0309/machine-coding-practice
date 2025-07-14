import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log('🖼️ Image Gallery Feature Loaded');
    
    // Simulate loading images (in real app, these would be heavy image assets)
    const mockImages = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/300/200?random=${i + 1}`,
      title: `Beautiful Image ${i + 1}`,
      description: `This is a beautiful landscape photo #${i + 1}`
    }));
    setImages(mockImages);
  }, []);

  const galleryStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '10px'
  };

  const imageCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    backgroundColor: 'white'
  };

  const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    maxHeight: '80%',
    overflow: 'auto'
  };

  return (
    <div style={{ 
      border: '2px solid #ff9500', 
      padding: '15px', 
      margin: '10px 0',
      backgroundColor: '#fff5e6' 
    }}>
      <h3>🖼️ Image Gallery Feature</h3>
      <p>This represents a media-heavy feature that includes:</p>
      <ul>
        <li>Large image assets and media files</li>
        <li>Image processing libraries</li>
        <li>Lightbox/modal functionality</li>
        <li>Image optimization and lazy loading</li>
      </ul>
      
      <div style={galleryStyle}>
        {images.map(image => (
          <div
            key={image.id}
            style={imageCardStyle}
            onClick={() => setSelectedImage(image)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <img
              src={image.url}
              alt={image.title}
              style={imageStyle}
              loading="lazy" // Native lazy loading for images
            />
            <div style={{ padding: '10px' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{image.title}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div style={modalStyle} onClick={() => setSelectedImage(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
            <h3>{selectedImage.title}</h3>
            <p>{selectedImage.description}</p>
            <button 
              onClick={() => setSelectedImage(null)}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#ff9500', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Performance Note:</strong> Images use native lazy loading with the `loading="lazy"` attribute</p>
        <p><strong>Bundle Impact:</strong> This component would typically include heavy dependencies like image manipulation libraries</p>
      </div>
    </div>
  );
};

export default ImageGallery; 