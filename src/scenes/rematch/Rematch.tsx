import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Rematch: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
        Meanwhile durante quella sessione di rematch...
      </h1>
      <video
        src="/assets/rematch1.mp4"
        controls
        autoPlay
        style={{ maxWidth: "80%", maxHeight: "60vh", borderRadius: "10px" }}
        onEnded={() => setShowButton(true)}
      />
      {showButton && (
        <button
          onClick={() => navigate("/2")}
          style={{
            marginTop: "30px",
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#8774e1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go back to chat
        </button>
      )}
    </div>
  );
};

export default Rematch;
