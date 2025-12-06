import { useState, useEffect } from "react";
import "./Lab.scss";

const Lab: React.FC = () => {
  const [showInitialImage, setShowInitialImage] = useState(true);
  const [startDisappearing, setStartDisappearing] = useState(false);

  const handleImageClick = () => {
    setStartDisappearing(true);
  };

  useEffect(() => {
    if (startDisappearing) {
      setTimeout(() => {
        setShowInitialImage(false); // Remove the image after the animation
      }, 5000); // Match the duration of the animation
    }
  }, [startDisappearing]);

  return (
    <div className="lab-scene">
      {showInitialImage && (
        <div
          className={`full-height-image-container ${
            startDisappearing ? "disappear" : ""
          }`}
        >
          <img
            src="/assets/ilpostfull.jpg"
            alt="Full Height"
            className="full-height-image"
            onClick={handleImageClick}
          />
        </div>
      )}
    </div>
  );
};

export default Lab;
