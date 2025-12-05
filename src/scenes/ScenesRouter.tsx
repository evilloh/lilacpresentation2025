import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TelegramPage from "./telegram/Telegram";
import Geostatic from "./geostatic/Geostatic";
import GeostaticGuess from "./geostatic/GeostaticGuess";
import { lillaChannel } from "./telegram/chats/scene1/lillaChannel";
import { lillacorp } from "./telegram/chats/scene1/lillacorp";
import { rosy } from "./telegram/chats/scene1/rosy";
import { stories1 } from "./telegram/chats/scene1/stories";

const ScenesRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/1" replace />} />
        <Route
          path="/1"
          element={
            <TelegramPage
              lillaChannel={lillaChannel}
              lillaCorp={lillacorp}
              rosy={rosy}
              stories={stories1}
            />
          }
        />
        <Route path="/geostatic" element={<Geostatic />} />
        <Route path="/geostatic-2" element={<GeostaticGuess />} />
        <Route
          path="/3"
          element={
            <TelegramPage
              lillaChannel={lillaChannel}
              lillaCorp={lillacorp}
              rosy={rosy}
              stories={[]}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default ScenesRouter;
