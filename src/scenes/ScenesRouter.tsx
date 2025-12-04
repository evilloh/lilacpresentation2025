import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TelegramPage from "./telegram/Telegram";
import Geostatic from "./geostatic/Geostatic";
import GeostaticGuess from "./geostatic/GeostaticGuess";

const ScenesRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /1 */}
        <Route path="/" element={<Navigate to="/1" replace />} />
        {/* Render TelegramPage for /1, /2, and /3 */}
        <Route path="/1" element={<TelegramPage />} />
        <Route path="/geostatic" element={<Geostatic />} />
        <Route path="/geostatic-2" element={<GeostaticGuess />} />
        <Route path="/3" element={<TelegramPage />} />
      </Routes>
    </Router>
  );
};

export default ScenesRouter;
