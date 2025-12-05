import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Geostatic.scss";

const Geostatic: React.FC = () => {
  const [showAdditionalImage, setShowAdditionalImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowAdditionalImage(true);
  };

  const handleSecondImageClick = () => {
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    navigate("/geostatic-2");
  };

  return (
    <div className="geostatic-container">
      <div className="image-container">
        <img src="./assets/geostatic.jpg" alt="Main" className="geostatic" />
        <div className="hover-area" onClick={handleClick}></div>
      </div>
      {showAdditionalImage && (
        <img
          src="./assets/geostatic-ad.png"
          alt="Additional"
          className="geostatic-ad"
          onClick={handleSecondImageClick}
        />
      )}
      {showVideo && (
        <div className="video-container">
          <video
            width="560"
            height="315"
            src="./assets/orologio.mp4"
            controls
            onEnded={handleVideoEnd}
          ></video>
        </div>
      )}
    </div>
  );
};

export default Geostatic;
