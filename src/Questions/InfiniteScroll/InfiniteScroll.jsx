import React, { useState, useEffect, useCallback } from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
      );
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

// The handleScroll function will be called when the user scrolls the page
const handleScroll = useCallback(() => {
  // Get the current scroll position from the top of the page
  const scrollTop = window.scrollY; // scrollY: The number of pixels that the document is currently scrolled vertically

  // Get the height of the visible area of the window (viewport)
  const clientHeight = window.innerHeight; // innerHeight: The height of the window's viewport (i.e., visible part of the browser)

  // Get the total height of the document (the entire content of the page, including content that is not visible)
  const scrollHeight = document.documentElement.scrollHeight; // scrollHeight: The total height of the document, including content that isn't visible in the viewport

  // Check if the user has scrolled close to the bottom of the page (within 20px) and ensure that:
  // 1. `loading` is false (no data is being fetched)
  // 2. `hasMore` is true (there is more data to load)
  if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
    // If the conditions are met, trigger the fetchData function to load more content
    fetchData();
  }
}, [loading, hasMore, fetchData]); // The dependencies array ensures that the effect is recalculated when any of these variables change



  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Infinite Scroll Demo</h1>
      {items.map(item => (
        <div 
          key={item.id}
          style={{
            padding: '20px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
      {error && <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>}
      {!hasMore && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          No more items to load
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;