import React, { useState } from "react";
import image from "./image.png"

const LinkPreviewer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);

  const containerStyle = {
    position: "relative",
    // display: "inline-block",
  };

  const previewStyle = {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 50,
    width: "256px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "8px",
  };

  const imageStyle = {
    width: "20%",
    height: "28px",
    objectFit: "cover",
    borderRadius: "4px",
  };


  return (
    <>
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      hover
      {isHovered && (
        <div style={previewStyle}>
          <img
            src={image}
            alt="Website Preview"
            style={imageStyle}
          />
        </div>
      )}
    </div>
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered1(true)}
      onMouseLeave={() => setIsHovered1(false)}
    >
      hover
      {isHovered1 && (
        <div style={previewStyle}>
          <img
            src={image}
            alt="Website Preview"
            style={imageStyle}
          />
        </div>
      )}
    </div>
    </>
  );
};

export default LinkPreviewer;
