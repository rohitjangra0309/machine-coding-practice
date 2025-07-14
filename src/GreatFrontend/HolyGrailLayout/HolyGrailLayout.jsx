import React from 'react'
// Choose which CSS implementation to use:
// import './HolyGrailLayout-grid.css'      // CSS Grid approach
import './HolyGrailLayout-flexbox.css'     // Flexbox approach

const HolyGrailLayout = () => {
  return (
    <div className="layout">
      <header>Header</header>
      
      {/* For Flexbox approach, we need the content wrapper */}
      <div className="content">
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>
      
      <footer>Footer</footer>
    </div>
  )
}

export default HolyGrailLayout
