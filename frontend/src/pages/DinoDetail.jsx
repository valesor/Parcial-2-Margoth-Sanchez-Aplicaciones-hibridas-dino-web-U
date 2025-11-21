import React, { useEffect, useState } from "react";
import { getDino, deleteDino } from "../api/dinosApi";
import { useParams, useNavigate } from "react-router-dom";

const DinoDetail = () => {
  const { id } = useParams();
  const [dino, setDino] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    fetchDino();
  }, []); // ver por que tira error

  const fetchDino = async () => {
    try {
      const res = await getDino(id);
      setDino(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDino(id);
      alert("Dinosaurio eliminado");
      nav("/dinos");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar dinosaurio");
    }
  };

  // Formulario edición
  const handleEdit = () => {
    nav(`/dinos/edit/${id}`, { state: { dino } });
  };

  if (!dino) return <div>Cargando...</div>;

  return (
    <div
      className="card shadow-sm p-4 mb-4"
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      {/* Botón  eliminar */}
      <button
        className="btn btn-sm btn-danger"
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={() => setShowConfirm(true)}
      >
        ×
      </button>

      <div className="card-body">
        <h3 className="card-title mb-4 text-center">{dino.name}</h3>

        <div className="mb-2">
          <b>Era:</b>
          <p className="ms-3">{dino.era}</p>
        </div>

        <div className="mb-2">
          <b>Dieta:</b>
          <p className="ms-3">{dino.diet}</p>
        </div>

        <div className="mb-2">
          <b>Descripción:</b>
          <p className="ms-3">{dino.description || "No hay descripción"}</p>
        </div>

        <div className="mb-3">
          <b>Paleontólogo:</b>
          <p className="ms-3">{dino.paleontologist?.name || "No asignado"}</p>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-3">
          <button className="btn btn-primary" onClick={handleEdit}>
            Editar
          </button>
        </div>

        {showConfirm && (
          <div
            className="mt-4 p-3 border rounded bg-light text-center"
            style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
          >
            <p>¿Eliminar dinosaurio?</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DinoDetail;
