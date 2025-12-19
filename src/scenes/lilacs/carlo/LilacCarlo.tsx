import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LilacCarlo.scss";

const LilacCarlo: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>(
    "da questa tua scelta dipende il destino di questa linea temporale."
  );
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState(false);
  const [startDisappearing, setStartDisappearing] = useState(false);

  const handleRightClick = () => {
    setMessage(
      "Ottimo! Era una scelta facile dato che era abbastanza ovvio, ma hai scelto correttamente la consolina oled!"
    );
    setIsCompleted(true);
    setHasClicked(true);
    setTimeout(() => {
      setStartDisappearing(true);
    }, 4000);
  };

  useEffect(() => {
    if (startDisappearing) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [startDisappearing]);

  const handleVideoEnd = () => {
    navigate("/5");
  };

  return (
    <div className="lilac-carlo-container">
      <div className={`word-document ${startDisappearing ? "disappear" : ""}`}>
        <header className="document-header">
          <h1>CarLilac2024</h1>
          <p>
            Scrivendo il lilac stavo cercando la foto che avevo fatto del gioco
            sulla mia consolina oled ma non la trovo. Vi do intanto la foto
            della stessa scena peró da un'altra consolina. Si vede come i colori
            cambiano, é evidente ad occhio nudo ma é meglio portare le prove. Se
            solo potessi trovare l'altra foto della oled lo vedreste anche voi.
            Ah eccola la foto della caverna. Come potete notare si vede davvero
            poco sull’oled…evabbe’ ogni cosa ha i suoi pregi e i suoi difetti.
          </p>
        </header>

        <div className="image-selection">
          <div
            className={
              hasClicked ? "image-wrapper" : "image-wrapper selectable"
            }
            onClick={hasClicked ? undefined : handleRightClick}
          >
            <img src="/assets/lilac_carlo.png" alt="Lilac Carlo Left" />
          </div>
          <div
            className={
              hasClicked ? "image-wrapper" : "image-wrapper selectable"
            }
            onClick={hasClicked ? undefined : handleRightClick}
          >
            <img src="/assets/lilac_carlo.png" alt="Lilac Carlo Right" />
          </div>
        </div>
        <p>
          Ora che avete visto le due immagini a confronto, potete capire come la
          scelta del dispositivo influenzi la percezione dei colori e dei
          dettagli. Vediamo se siete stati attenti, scegliete con un click sopra
          l'immagine che é stata scattata con la consolina oled.
        </p>
        <p
          style={{
            fontWeight: "bold",
            color: isCompleted ? "#28a745" : "#dc3545",
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          Attento: {message}
        </p>
        <footer className="document-footer">
          <p>Document Reference: LILAC-CARLO-2024</p>
          <p>Date: December 15, 2024</p>
          <p>© 2024 LillaCorp. All rights reserved.</p>
        </footer>
      </div>
      {showVideo && (
        <div className="video-container disappear">
          <h1>In a different time...</h1>
          <video
            src="/assets/timeTravel.mp4"
            className="intro-video disappear"
            autoPlay
            onEnded={handleVideoEnd}
          />
        </div>
      )}
    </div>
  );
};

export default LilacCarlo;
