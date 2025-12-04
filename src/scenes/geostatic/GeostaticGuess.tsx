import { useState } from "react";
import "./Geostatic.scss";

const GeostaticGuess: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(1);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === 6 ? 1 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 1 ? 6 : prev - 1));
  };

  return (
    <div className="image-carousel">
      <img
        src={`./assets/geostatic-${currentImage}.jpg`}
        alt={`Geostatic ${currentImage}`}
        className="carousel-image"
      />
      <button className="arrow left-arrow" onClick={prevImage}>
        &#8592;
      </button>
      <button className="arrow right-arrow" onClick={nextImage}>
        &#8594;
      </button>
    </div>
  );
};

export default GeostaticGuess;
