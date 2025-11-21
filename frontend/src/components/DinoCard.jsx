import React from "react";
import { useNavigate } from "react-router-dom";

const DinoCard = ({ dino }) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/dinos/${dino._id}`);
  };

  // Manejo seguro del paleontólogo
  const paleoName =
    typeof dino.paleontologist === "string"
      ? dino.paleontologist
      : dino.paleontologist?.name || "Sin asignar";

  return (
    <div
      className="card h-100 shadow-sm"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        background: "#fafafa",
        border: "1px solid #e5e5e5",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold" style={{ fontSize: "1.25rem" }}>
          {dino.name}
        </h5>

        <h6 className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
          {dino.era} — {dino.diet}
        </h6>

        <p
          className="card-text"
          style={{
            flexGrow: 1,
            fontSize: "0.95rem",
            color: "#444",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {dino.description || "Sin descripción"}
        </p>

        <div className="text-end mt-3" style={{ fontSize: "0.8rem" }}>
          Clic para ver detalles
        </div>
      </div>

      <div
        className="card-footer bg-light text-muted"
        style={{
          fontSize: "0.85rem",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        Paleontólogo: <span className="fw-semibold">{paleoName}</span>
      </div>
    </div>
  );
};

export default DinoCard;
