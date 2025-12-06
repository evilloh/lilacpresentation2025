import React from "react";
import "./FullHeightImage.css";

const FullHeightImage: React.FC = () => {
  return (
    <div className="full-height-image-container">
      <img
        src="/assets/ilpostfull.jpg"
        alt="Full Height"
        className="full-height-image"
      />
    </div>
  );
};

export default FullHeightImage;
