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
import { evilloh } from "./telegram/chats/scene1/evilloh";
import {
  stories1,
  stories2,
  stories3,
  stories5,
  stories7,
  stories8,
  storiesPezzo,
} from "./telegram/chats/scene1/stories";
import Lab from "./lab/Lab";
import Rematch from "./rematch/Rematch";
import LilacCarlo from "./lilacs/carlo/LilacCarlo";
import LilacMisoEvilloh from "./lilacs/miso_evilloh/LilacMisoEvilloh";
import { lillaChannel2 } from "./telegram/chats/scene1/lillaChannel2";
import { lillaChannel3 } from "./telegram/chats/scene1/lillaChannel3";
import { lillaChannel4 } from "./telegram/chats/scene1/lillaChannel4";
import { lillacorp2 } from "./telegram/chats/scene1/lillacorp2";
import { lillaChannel5 } from "./telegram/chats/scene1/lillaChannel5";
import { lillacorp3 } from "./telegram/chats/scene1/lillacorp3";
import { pezzoChat } from "./telegram/chats/scene1/pezzoChat";
import { lillaChannel6 } from "./telegram/chats/scene1/lillaChannel6";
import { lillacorp4 } from "./telegram/chats/scene1/lillacorp4";
import { lillaChannel7 } from "./telegram/chats/scene1/lillaChannel7";
import LilacVisinoskij from "./lilacs/visinoskij/LilacVisinoskij";
import LilacMatteo from "./lilacs/matteo/LilacMatteo";
import LilacNata from "./lilacs/nata/LilacNata";
import { lillaChannel8 } from "./telegram/chats/scene1/lillaChannel8";
import { lillaChannel9 } from "./telegram/chats/scene1/lillaChannel9";

const ScenesRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TelegramPage
              lillaChannel={lillaChannel}
              lillaCorp={lillacorp}
              rosy={rosy}
              stories={stories1}
            />
          }
        />
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
        <Route path="/rematch" element={<Rematch />} />
        <Route
          path="/2"
          element={
            <TelegramPage
              lillaChannel={lillaChannel2}
              lillaCorp={lillacorp2}
              stories={stories1}
              evilloh={evilloh}
            />
          }
        />
        <Route path="/geostatic" element={<Geostatic />} />
        <Route path="/geostatic-2" element={<GeostaticGuess />} />
        <Route
          path="/3"
          element={
            <TelegramPage
              lillaChannel={lillaChannel3}
              lillaCorp={lillacorp2}
              stories={stories2}
              evilloh={evilloh}
            />
          }
        />
        <Route
          path="/4"
          element={
            <TelegramPage
              lillaChannel={lillaChannel4}
              lillaCorp={lillacorp2}
              stories={stories3}
            />
          }
        />
        <Route path="/lab" element={<Lab />} />
        <Route path="/lilac_carlo" element={<LilacCarlo />} />
        <Route
          path="/5"
          element={
            <TelegramPage
              lillaChannel={lillaChannel5}
              lillaCorp={lillacorp3}
              stories={stories5}
            />
          }
        />
        <Route
          path="/lilac_pezzo"
          element={
            <TelegramPage
              key="lilac_pezzo"
              pezzo={pezzoChat}
              stories={storiesPezzo}
            />
          }
        />
        <Route
          path="/6"
          element={
            <TelegramPage
              key="6"
              lillaChannel={lillaChannel6}
              lillaCorp={lillacorp4}
            />
          }
        />

        <Route path="/lilac_villo_miso" element={<LilacMisoEvilloh />} />

        <Route
          path="/7"
          element={
            <TelegramPage
              lillaChannel={lillaChannel7}
              lillaCorp={lillacorp4}
              stories={stories7}
            />
          }
        />

        <Route path="/lilac_visinoskij" element={<LilacVisinoskij />} />

        <Route
          path="/8"
          element={
            <TelegramPage
              lillaChannel={lillaChannel8}
              lillaCorp={lillacorp4}
              stories={stories8}
            />
          }
        />

        <Route path="/lilac_matteo" element={<LilacMatteo />} />
        <Route path="/lilac_nata" element={<LilacNata />} />

        <Route
          path="/9"
          element={
            <TelegramPage
              lillaChannel={lillaChannel9}
              lillaCorp={lillacorp4}
              last
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default ScenesRouter;
