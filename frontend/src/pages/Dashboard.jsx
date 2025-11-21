import React, { useState } from "react";
import DinosauriosTable from "../components/Dashboard/DinosauriosTable";
import PaleontologosTable from "../components/Dashboard/PaleontologosTable";
import PaisesTable from "../components/Dashboard/PaisesTable";

const Dashboard = () => {
  // activa
  const [activeTab, setActiveTab] = useState("dinosaurios");

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Dashboard: Panel de Administración
      </h1>

      {/* nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveTab("dinosaurios")}
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor:
              activeTab === "dinosaurios" ? "#4caf50" : "#e0e0e0",
            color: activeTab === "dinosaurios" ? "white" : "black",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Dinosaurios
        </button>
        <button
          onClick={() => setActiveTab("paleontologos")}
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor:
              activeTab === "paleontologos" ? "#4caf50" : "#e0e0e0",
            color: activeTab === "paleontologos" ? "white" : "black",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Paleontólogos
        </button>
        <button
          onClick={() => setActiveTab("paises")}
          style={{
            padding: "10px",
            backgroundColor: activeTab === "paises" ? "#4caf50" : "#e0e0e0",
            color: activeTab === "paises" ? "white" : "black",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Países
        </button>
      </div>

      {/* según la pestaña activa */}
      <div>
        {activeTab === "dinosaurios" && <DinosauriosTable />}
        {activeTab === "paleontologos" && <PaleontologosTable />}
        {activeTab === "paises" && <PaisesTable />}
      </div>
    </div>
  );
};

export default Dashboard;
