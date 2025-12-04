import { useState } from "react";
import "./Stories.scss";

const storiesData = [
  { id: 1, image: "/assets/sample.png" },
  { id: 2, image: "/assets/sample.png" },
  { id: 3, image: "/assets/sample.png" },
  { id: 4, image: "/assets/sample.png" },
  { id: 5, image: "/assets/sample.png" },
  { id: 6, image: "/assets/sample.png" },
  { id: 7, image: "/assets/sample.png" },
  { id: 8, image: "/assets/sample.png" },
  { id: 9, image: "/assets/sample.png" },
  { id: 10, image: "/assets/sample.png" },
];

const Stories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const openStory = (image: string) => {
    setSelectedStory(image);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="stories-container">
      <div className="stories">
        {storiesData.map((story) => (
          <div
            key={story.id}
            className="story-circle"
            onClick={() => openStory(story.image)}
          >
            <img src={story.image} alt={`Story ${story.id}`} />
          </div>
        ))}
      </div>

      {selectedStory && (
        <div className="story-modal" onClick={closeStory}>
          <div className="story-modal-content">
            <img src={selectedStory} alt="Selected Story" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
