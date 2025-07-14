import React, { Suspense, useState, lazy } from 'react';

// 1. LAZY LOADING WITH React.lazy()
// React.lazy() allows you to render a dynamic import as a regular component
// It automatically loads the component only when it's needed (code splitting)

// Lazy load heavy components
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
const DataTable = lazy(() => import('./components/DataTable'));
const ImageGallery = lazy(() => import('./components/ImageGallery'));

// 2. LAZY LOADING WITH CONDITIONAL RENDERING
// Load components only when user interaction requires them
const LazyModal = lazy(() => import('./components/LazyModal'));

const LazyLoadingDemo = () => {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚀 Lazy Loading Concepts Demo</h1>
      
      {/* CONCEPT 1: Basic Lazy Loading with Suspense */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>1. Basic Lazy Loading</h2>
        <p>Components are loaded only when needed, reducing initial bundle size</p>
        
        <button 
          onClick={() => setShowHeavyComponent(!showHeavyComponent)}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          {showHeavyComponent ? 'Hide' : 'Load'} Heavy Component
        </button>

        {showHeavyComponent && (
          <Suspense fallback={<div>⏳ Loading Heavy Component...</div>}>
            <HeavyComponent />
          </Suspense>
        )}
      </section>

      {/* CONCEPT 2: Route-based Code Splitting */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>2. Feature-based Lazy Loading</h2>
        <p>Load different features/pages on demand</p>
        
        <div style={{ marginBottom: '10px' }}>
          <button 
            onClick={() => setShowDataTable(!showDataTable)}
            style={{ marginRight: '10px', padding: '8px 16px' }}
          >
            {showDataTable ? 'Hide' : 'Load'} Data Table Feature
          </button>
          
          <button 
            onClick={() => setShowImageGallery(!showImageGallery)}
            style={{ padding: '8px 16px' }}
          >
            {showImageGallery ? 'Hide' : 'Load'} Image Gallery Feature
          </button>
        </div>

        {showDataTable && (
          <Suspense fallback={<div>⏳ Loading Data Table...</div>}>
            <DataTable />
          </Suspense>
        )}

        {showImageGallery && (
          <Suspense fallback={<div>⏳ Loading Image Gallery...</div>}>
            <ImageGallery />
          </Suspense>
        )}
      </section>

      {/* CONCEPT 3: Modal/Overlay Lazy Loading */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>3. Modal/Overlay Lazy Loading</h2>
        <p>Load modals only when user wants to open them</p>
        
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 16px' }}
        >
          Open Lazy Modal
        </button>

        {showModal && (
          <Suspense fallback={<div>⏳ Loading Modal...</div>}>
            <LazyModal onClose={() => setShowModal(false)} />
          </Suspense>
        )}
      </section>

      {/* INTERVIEW CONCEPTS EXPLANATION */}
      <section style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h2>📝 Interview Key Points:</h2>
        <ul>
          <li><strong>Code Splitting:</strong> Break large bundles into smaller chunks</li>
          <li><strong>React.lazy():</strong> Dynamically import components</li>
          <li><strong>Suspense:</strong> Handle loading states for lazy components</li>
          <li><strong>Performance:</strong> Faster initial page load, better UX</li>
          <li><strong>Bundle Analysis:</strong> Use webpack-bundle-analyzer to identify heavy components</li>
        </ul>
      </section>
    </div>
  );
};

export default LazyLoadingDemo;

/*
🎯 INTERVIEW QUESTIONS & ANSWERS:

Q: What is lazy loading in React?
A: Lazy loading is a technique to defer loading of components until they're actually needed, 
   reducing initial bundle size and improving app performance.

Q: How does React.lazy() work?
A: React.lazy() takes a function that returns a dynamic import() promise. It returns a React 
   component that can be rendered normally but is loaded only when first rendered.

Q: Why do we need Suspense with lazy components?
A: Suspense provides a fallback UI while the lazy component is being loaded. Without it, 
   React doesn't know what to show during the loading state.

Q: What are the benefits of lazy loading?
A: - Faster initial page load
   - Reduced memory usage
   - Better user experience
   - Smaller initial bundle size
   - Pay-as-you-go loading strategy

Q: When should you use lazy loading?
A: - Large components that aren't immediately visible
   - Route-based code splitting
   - Modals/overlays
   - Admin panels or dashboard sections
   - Heavy third-party libraries
*/ 