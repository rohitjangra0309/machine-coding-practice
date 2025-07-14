import React from "react";

const Breadcrumbs = ({ path }) => {
  return (
    <nav style={styles.nav}>
      {path.map((crumb, idx) => {
        const isLast = idx === path.length - 1;
        return (
          <span key={idx} style={styles.crumb}>
            {!isLast ? (
              <a href="#" style={styles.link}>
                {crumb}
              </a>
            ) : (
              <span style={styles.current}>{crumb}</span>
            )}
            {!isLast && <span style={styles.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
};

const styles = {
  nav: {
    fontFamily: "sans-serif",
    fontSize: "14px",
    padding: "12px",
    background: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  crumb: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    cursor: "pointer",
  },
  current: {
    color: "#555",
    fontWeight: "bold",
  },
  separator: {
    margin: "0 6px",
    color: "#aaa",
  },
};

export default Breadcrumbs;
