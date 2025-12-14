import { useState } from "react";
import "./Geostatic.scss";
import { useNavigate } from "react-router-dom";

const GeostaticGuess: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [showGuessInput, setShowGuessInput] = useState(false);
  const [guess, setGuess] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentImage((prev) => (prev === 6 ? 1 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 1 ? 6 : prev - 1));
  };

  const handleGuessButtonClick = () => {
    setShowGuessInput(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pressedKey = e.target.value;
    const letters = "SUDAN";
    const nextLetter = letters[guess.length] || "";
    setGuess((prev) => (pressedKey ? prev + nextLetter : prev));
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleClose = () => {
    navigate("/4");
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
      <div className={"guess-container"}>
        <button className="guess-button" onClick={handleGuessButtonClick}>
          Guess
        </button>
        {showGuessInput && (
          <div className="guess-input-container">
            <input
              type="text"
              value={guess}
              onChange={handleInputChange}
              className="guess-input"
            />
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
          </div>
        )}
      </div>
      {showResult && (
        <div className="result-overlay">
          <img
            src="./assets/nigeria.jpg"
            alt="Nigeria"
            className="result-image"
          />
          <div className="result-text">
            The answer was Nigeria, while you selected Sudan, which is not even
            indexed.
          </div>
          <button onClick={handleClose} className="close-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default GeostaticGuess;
