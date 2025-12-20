import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import "./LilacVisinoskij.scss";

const dataLine = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
];

const dataBar = [
  { name: "A", value: 2400 },
  { name: "B", value: 4567 },
  { name: "C", value: 1398 },
  { name: "D", value: 9800 },
];

const dataPie = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const dataRadar = [
  { subject: "Centimeters", A: 120, B: 110, fullMark: 150 },
  { subject: "USB plugs", A: 98, B: 130, fullMark: 150 },
  { subject: "Cuor of apples", A: 86, B: 130, fullMark: 150 },
  { subject: "A Monster's Expedition", A: 99, B: 100, fullMark: 150 },
  { subject: "Balatro", A: 85, B: 90, fullMark: 150 },
  { subject: "Evilloh", A: 65, B: 85, fullMark: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const LilacVisinoskij: React.FC = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [startDisappearing, setStartDisappearing] = useState(false);
  const [buttonStates, setButtonStates] = useState<
    Record<string, "correct" | "incorrect" | null>
  >({});

  const correctAnswers = [1, 2, 1, 1];

  const handleGuess = (chartIndex: number, buttonIndex: number) => {
    const isCorrect = buttonIndex === correctAnswers[chartIndex];
    const key = `${chartIndex}-${buttonIndex}`;
    setButtonStates((prev) => ({
      ...prev,
      [key]: isCorrect ? "correct" : "incorrect",
    }));
  };

  const allCorrect = correctAnswers.every(
    (correctIdx, chartIdx) =>
      buttonStates[`${chartIdx}-${correctIdx}`] === "correct"
  );

  const handleFinalize = () => {
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
    navigate("/8");
  };

  return (
    <div className="lilac-visinoskij-container">
      <div className={`word-document ${startDisappearing ? "disappear" : ""}`}>
        <header className="document-header">
          <h1>Lilac 2024 - Visinoskij</h1>
          <p style={{ textAlign: "left" }}>
            With no real qualitative data to make my point, I turned to mining
            raw numbers. Munching fours, crunching eights, chomping fifteens,
            chewing sixteens, mashing twentythrees, and smashing fourtytwos as
            if they were Kellogg's Special K Red Berries Cereal.
          </p>

          <p style={{ textAlign: "left" }}>
            Something seems off though, I kinda need some participation from you
            to make up my mind over what these charts are of.
          </p>
        </header>

        <div className="chart-section">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="guess-buttons">
            <button
              className={buttonStates["0-0"] || ""}
              onClick={() => handleGuess(0, 0)}
            >
              Quantity of lieviti in games over time
            </button>
            <button
              className={buttonStates["0-1"] || ""}
              onClick={() => handleGuess(0, 1)}
            >
              Crossing of the data among all the roguelites i played in the last
              3 years
            </button>
            <button
              className={buttonStates["0-2"] || ""}
              onClick={() => handleGuess(0, 2)}
            >
              Photos of bigolo in AAA games in a span of months
            </button>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="guess-buttons">
            <button
              className={buttonStates["1-0"] || ""}
              onClick={() => handleGuess(1, 0)}
            >
              Amount of damage made with skills in football manager
            </button>
            <button
              className={buttonStates["1-1"] || ""}
              onClick={() => handleGuess(1, 1)}
            >
              How many times Schilpario appeared in my minimaps
            </button>
            <button
              className={buttonStates["1-2"] || ""}
              onClick={() => handleGuess(1, 2)}
            >
              Cuor di mele found in chests in four different games
            </button>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataPie}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataPie.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="guess-buttons">
            <button
              className={buttonStates["2-0"] || ""}
              onClick={() => handleGuess(2, 0)}
            >
              A square chart of the types of fur in furry games I played
            </button>
            <button
              className={buttonStates["2-1"] || ""}
              onClick={() => handleGuess(2, 1)}
            >
              The different ways evilloh will fail soccer shots in a futuristic
              4v4 soccer game
            </button>
            <button
              className={buttonStates["2-2"] || ""}
              onClick={() => handleGuess(2, 2)}
            >
              How many colors can fit in a four bars circle charts
            </button>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="guess-buttons">
            <button
              className={buttonStates["3-0"] || ""}
              onClick={() => handleGuess(3, 0)}
            >
              Blue
            </button>
            <button
              className={buttonStates["3-1"] || ""}
              onClick={() => handleGuess(3, 1)}
            >
              Orange
            </button>
            <button
              className={buttonStates["3-2"] || ""}
              onClick={() => handleGuess(3, 2)}
            >
              Red
            </button>
          </div>
        </div>

        <p style={{ textAlign: "left" }}>
          Thanks for participating, this year's game has meant so much for me
          and show appreciation for it with all those data charts shows how much
          it moved me. Gg A monster's expedition.
        </p>

        {allCorrect && (
          <div className="action-section">
            <button className="finalize-button" onClick={handleFinalize}>
              Fix the linea temporal
            </button>
          </div>
        )}

        <footer className="document-footer">
          <p>Document Reference: LILAC-VISINOSKIJ-2024</p>
          <p>Date: December 26, 2024</p>
          <p>© 2024 LillaCorp. All rights reserved.</p>
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

export default LilacVisinoskij;
