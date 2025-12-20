import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LilacNata.scss";

interface NataItem {
  id: string;
  img: string;
  text: string;
  className: string;
}

const ITEMS: NataItem[] = [
  {
    id: "almohada",
    img: "/assets/almohada.png",
    text: "have a sleepy nap while playing?",
    className: "item-almohada",
  },
  {
    id: "lilac1",
    img: "/assets/lilacnata1.png",
    text: "this adorable satanic dog?",
    className: "item-lilac1",
  },
  {
    id: "lilac2",
    img: "/assets/lilacnata2.png",
    text: "all the beer without any of the alcohol?",
    className: "item-lilac2",
  },
  {
    id: "lilac3",
    img: "/assets/lilacnata3.png",
    text: "Granolitaaaa?",
    className: "item-lilac3",
  },
  {
    id: "lilac4",
    img: "/assets/lilacnata4.jpg",
    text: "Venezuela siempre primero",
    className: "item-lilac4",
  },
];

const LilacNata: React.FC = () => {
  const navigate = useNavigate();
  const [removedItems, setRemovedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<NataItem | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const handleItemClick = (item: NataItem) => {
    if (removedItems.includes(item.id)) return;
    setActiveItem(item);
  };

  const handleSelection = () => {
    if (!activeItem) return;

    const itemId = activeItem.id;
    setActiveItem(null);

    // Add to removed list to trigger animation
    setRemovedItems((prev) => [...prev, itemId]);
  };

  useEffect(() => {
    if (removedItems.length === ITEMS.length) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [removedItems]);

  const handleVideoEnd = () => {
    navigate("/9");
  };

  return (
    <div className="lilac-nata-scene-container">
      <div className="content-wrapper">
        <img
          src="/assets/lilacnata0.png"
          alt="Background"
          className="main-bg"
        />

        {ITEMS.map((item) => (
          <div
            key={item.id}
            className={`overlay-item ${item.className} ${
              removedItems.includes(item.id) ? "disappearing" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <img src={item.img} alt={item.id} />
          </div>
        ))}
      </div>

      {activeItem && (
        <div className="selection-modal">
          <h3>{activeItem.text}</h3>
          <div className="button-group">
            <button onClick={handleSelection}>tu madre!</button>
            <button onClick={handleSelection}>chuta!</button>
          </div>
        </div>
      )}

      {showVideo && (
        <div className="video-container">
          <video
            src="/assets/timeTravel.mp4"
            autoPlay
            onEnded={handleVideoEnd}
          />
        </div>
      )}
    </div>
  );
};

export default LilacNata;
