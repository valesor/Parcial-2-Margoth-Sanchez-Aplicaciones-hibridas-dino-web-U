import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="text-center container py-5">
      <h1 className="mb-4 display-4">Bienvenidx a DinoApp</h1>

      <p className="lead fs-4 mb-5 px-3">
        🦖 Esta página es para cargar y ver dinos. Podés crear uno nuevo,
        editarlo o revisar la lista. Todo está medio “argentinizado” para que no
        sea tan aburrido.
      </p>

      {!token && (
        <div className="alert alert-secondary mt-4 p-5 rounded fs-5 text-center">
          🌿 ¡Bienvenidx a DinoApp! 🦕 <br />
          Para usar todas las funciones, por favor registrate o iniciá sesión.
        </div>
      )}

      {token && (
        <div className="d-flex flex-column flex-md-row justify-content-center gap-4 mt-5">
          <Link className="btn btn-success btn-lg px-5 py-3" to="/dinos/new">
            Cargar Dinosaurio
          </Link>
          <Link
            className="btn btn-outline-success btn-lg px-5 py-3"
            to="/dinos"
          >
            Ver Dinosaurios
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
