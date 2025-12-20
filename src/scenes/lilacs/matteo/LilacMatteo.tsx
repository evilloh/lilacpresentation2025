import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LilacMatteo.scss";

const LilacMatteo: React.FC = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [startDisappearing, setStartDisappearing] = useState(false);
  const [clickedIndices, setClickedIndices] = useState<number[]>([]);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);

  const textSegments = [
    { text: "I come from a small village.", special: false },
    {
      text: "It is so small that my colleagues here in London cannot comprehend it.",
      special: false,
    },
    {
      text: "For the Chinese, a small village has around one million inhabitants, for the Americans around 50 thousand inhabitants, and even my European colleagues fail to imagine a town with only around one thousand inhabitants.",
      special: false,
    },
    {
      text: "You can't imagine how hard it is to find a videogame store that sells you games on day one in a village like mine, and god knows how much I like to buy some games on the very first day they come out.",
      special: true,
    },
    {
      text: "I know that many of you share the same origin, but I believe that our relationship with our hometown is different.",
      special: false,
    },
    { text: "Therefore, I have to start from there.", special: false },
    {
      text: "My hometown is called Fì in the local language or Fino del Monte in Italian, and it is located on the cliff that protects the junction between Val Borlezza and the road that goes to Passo della Presolana and Val di Scalve.",
      special: false,
    },
    {
      text: "The name Fì was created after Figa, the thing everyone wants here in town of which i'm really fond",
      special: true,
    },

    {
      text: "The town was originally just a castle that blocked the entrance to the Val di Scalve from Lovere and Val Borlezza, but now it is just a village compressed between a cliff from the south-east, the mountains from the north and the town that it protected for centuries from the west.",
      special: false,
    },
    {
      text: "Its inhabitants are called Bócc in the local language because, according to legend, they are of strong constitution and stubborn character.",
      special: false,
    },
    {
      text: "That's why I grew up to be a really stubborn consumer that isn't satisfied with the latest regular iphone after it comes out, but I always buy the PRO MAX version of it, whatever the cost.",
      special: true,
    },
    {
      text: "The legend also says that the Bócc de Fì were the only ones in Val Seriana that were not infected by the plague of the XVII century.",
      special: false,
    },
  ];

  const handleTextClick = (index: number) => {
    if (clickedIndices.includes(index)) return;
    if (!textSegments[index].special) return;

    setClickedIndices((prev) => [...prev, index]);

    // After a short delay, trigger the disappearance animation
    setTimeout(() => {
      setHiddenIndices((prev) => [...prev, index]);
    }, 800);
  };

  useEffect(() => {
    const specialSegmentsCount = textSegments.filter((s) => s.special).length;
    if (
      hiddenIndices.length === specialSegmentsCount &&
      specialSegmentsCount > 0
    ) {
      const timer = setTimeout(() => {
        setStartDisappearing(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hiddenIndices, textSegments]);

  useEffect(() => {
    if (startDisappearing) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [startDisappearing]);

  const handleVideoEnd = () => {
    navigate("/9");
  };

  return (
    <div className="lilac-nata-container">
      <div className={`word-document ${startDisappearing ? "disappear" : ""}`}>
        <header className="document-header">
          <h1>Lilac 2023 - Matteo</h1>
        </header>

        <div className="content-area">
          {textSegments.map((segment, index) => (
            <span
              key={index}
              className={`memory-segment ${
                clickedIndices.includes(index) ? "selected" : ""
              } ${hiddenIndices.includes(index) ? "hidden" : ""}`}
              onClick={() => handleTextClick(index)}
            >
              {segment.text}{" "}
            </span>
          ))}
        </div>

        <footer className="document-footer">
          <p>Document Reference: LILAC-MATTEO-2023</p>
          <p>Date: December 27, 2023</p>
          <p>© 2023 LillaCorp. All rights reserved.</p>
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

export default LilacMatteo;
