import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LilacMisoEvilloh.scss";

const LilacMisoEvilloh: React.FC = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [startDisappearing, setStartDisappearing] = useState(false);

  const handleFixTimeline = () => {
    setStartDisappearing(true);
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
    navigate("/7");
  };

  return (
    <div className="lilac-miso-villo-container">
      <div className={`word-document ${startDisappearing ? "disappear" : ""}`}>
        <header className="document-header">
          <h1>Lilac 2025 Miso & Villoh</h1>
          <p>
            Data la nostra grandissima amicizia e incredibile sintonia giocando
            a rematch, abbiamo deciso che il nostro gioco preferito quest'anno é
            stato Rematch. A evilloh ovviamente non poteva non piacere un gioco
            di calcio, mentre miso ha apprezzato tantissimo la possibilitá di
            personalizzare il proprio personaggio per somigliare a Gattuso.
          </p>
          <br />
          <p>
            Ma la cosa che piú ci ha uniti per fare questo lilac insieme é stato
            il fatto che sono le 14:48 e dobbiamo ancora finire la presentazione
            quindi approfittiamo un 2x1. (Sí, é l'11 gennaio 2026 e sto dicendo
            che non abbiamo ancora finito la presentazione, se ancora non hai
            capito come funzionano i crimini temporali a sto punto solo rimane
            farti insultare da Nata)
          </p>
          <br />
          <p>
            D'altronde la pessima organizzazione é quello che piú ci ha uniti,
            quindi abbiamo pensato che questo duetto fosse la miglior forma di
            celebrare questo vincitore insieme.
          </p>
        </header>

        <div className="audio-section">
          <audio controls src="/assets/brividi.wav">
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="action-section">
          <p>
            E: Ho sognato di giocare con te <br />
            Eravamo in diamante
            <br />
            Mi hai detto, "Sei scarsissimo Non vedo
            <br />
            più la palla perchè la perdi"
            <br />
            <br />
            La priorità quale è?
            <br />
            Vincere o ridere con noi dai <br />
            Anche segnare non è<br />
            Proprio la fine del mondo <br />
            Dai, non quittare così
            <br />
            Non lasciarmi così
            <br />
            <br />
            Sono un falso nueveeeeee
            <br />
            A volte non so cosa fareeee
            <br />
            E ti vorrei passare, ma sbaglio sempre
            <br />
            E poi vorrei segnare su una ss
            <br />
            <br />
            E pagherei per andar via <br />
            Accetterei anche una bugia
            <br />
            E ti vorrei passare, ma sbaglio sempre
            <br />
            E mi vengono i brividi, brividi, brividi
            <br />
            <br />
            M: Tu, che non becchi un passaggio
            <br />
            Tu, che riesci a far sempre di peggio
            <br />
            Tu, che perdi tutte le palle
            <br />
            Con quei tuoi dribbling da retard
            <br />
            E tu, sei il contrario di bigolo
            <br />
            E tu, sei come i post di carlo
            <br />
            E tu se scappi da qui, mi lasci così
            <br />
            <br />
            Meglio con le cimiciii
            <br />
            Forse poi un match lo vinciii
            <br />
            E vorrei mi passaste, ma sbaglii sempre
            <br />
            E vorrei che segnaste ma siete peste
            <br />
            <br />
            E pagherei per andar via <br />
            Accetterei anche una bugia
            <br />
            E ti vorrei passare, ma sbaglio sempre
            <br />
            E mi vengono i brividi, brividi, brividi
            <br />
            <br />
            Dimmi che non ho ragione
            <br />
            E gioco con il meridione
            <br />
            E provo a non farvi fuori
            <br />
            Ma scusa se poi mandi tutto a puttane e<br />
            <br />
            Non so dirti ma ci provo, è un mio limite <br />
            Per un "ss" ho mischiato i tasti e lacrime
            <br />
            <br />
            Questo veleno che ci sputiamo ogni giorno
            <br />
            Io non vi voglio più addosso
            <br />
            <br />
            Lo vedi, siamo qui
            <br />
            Una squadra di diamanti, una fra tanti
            <br />
            <br />
            Sono un falso nueveeeeee
            <br />
            A volte non so cosa fareeee
            <br />
            E ti vorrei passare, ma sbaglio sempre
            <br />
            E poi vorrei segnare su una ss
            <br />
            <br />
            E pagherei per andar via <br />
            Accetterei anche una bugia
            <br />
            E ti vorrei passare, ma sbaglio sempre
            <br />
            E mi vengono i brividi, brividi, brividi
            <br />
          </p>
        </div>

        <div className="action-section">
          <button className="fix-button" onClick={handleFixTimeline}>
            Ripristina Linea Temporale
          </button>
        </div>

        <footer className="document-footer">
          <p>Document Reference: LILAC-MISO-VILLO-2025</p>
          <p>Date: January 11, 2026</p>
          <p>© 2026 LillaCorp. All rights reserved.</p>
        </footer>
      </div>

      {showVideo && (
        <div className="video-container disappear">
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

export default LilacMisoEvilloh;
