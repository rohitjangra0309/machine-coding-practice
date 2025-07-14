import React from "react";

const HolyGrailLayout = () => {
  return (
    <div style={styles.layout}>
      <header style={styles.header}>Header</header>
      <div style={styles.content}>
        <nav style={styles.nav}>Navigation</nav>
        <main style={styles.main}>
          Main Content<br />
          {[...Array(50)].map((_, i) => (
            <p key={i}>Scrollable line {i + 1}</p>
          ))}
        </main>
        <aside style={styles.aside}>Sidebar</aside>
      </div>
      <footer style={styles.footer}>Footer</footer>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "sans-serif",
    fontSize: "12px",
    fontWeight: "bold",
    margin: 0,
  },
  header: {
    padding: "12px",
    backgroundColor: "tomato",
  },
  footer: {
    padding: "12px",
    backgroundColor: "slategray",
  },
  content: {
    display: "flex",
    flex: 1,
    minHeight: 0, // allows scroll in child
  },
  nav: {
    width: "150px",
    padding: "12px",
    backgroundColor: "coral",
    flexShrink: 0,
  },
  main: {
    flex: 1,
    padding: "12px",
    backgroundColor: "moccasin",
    overflowY: "auto",
  },
  aside: {
    width: "150px",
    padding: "12px",
    backgroundColor: "sandybrown",
    flexShrink: 0,
  },
};

export default HolyGrailLayout;
