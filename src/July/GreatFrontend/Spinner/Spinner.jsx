import React from 'react';
import './Spinner.css';

export default function Spinner() {
    const [loading, setLoading] = React.useState(true);
  
    React.useEffect(() => {
      // simulate loading
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div>
        {loading ? <div className="spinner"></div> : <div>Content Loaded ✅</div>}
      </div>
    );
  }
  

  