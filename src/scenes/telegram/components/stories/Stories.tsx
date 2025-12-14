import { useState } from "react";
import "./Stories.scss";

const getUserImg = (user: string) => {
  return `/assets/${user}.jpg`;
};

export interface Story {
  id: number;
  user: string;
  image: string;
}

const Stories: React.FC<{ stories?: Story[] }> = ({ stories }) => {
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
        {stories?.map((story) => (
          <div
            key={story.id}
            className="story-circle"
            onClick={() => openStory(story.image)}
          >
            <img src={getUserImg(story.user)} alt={`Story ${story.user}`} />
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
