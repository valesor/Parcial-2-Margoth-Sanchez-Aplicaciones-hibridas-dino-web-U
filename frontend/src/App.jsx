import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DinoForm from "./pages/DinoForm";
import DinosList from "./pages/DinosList";
import DinoDetail from "./pages/DinoDetail";

const App = () => {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Crear Dino */}
          <Route
            path="/dinos/new"
            element={
              <ProtectedRoute>
                <DinoForm />
              </ProtectedRoute>
            }
          />

          {/* Lista de Dinosaurios */}
          <Route
            path="/dinos"
            element={
              <ProtectedRoute>
                <DinosList />
              </ProtectedRoute>
            }
          />

          {/* Detalle dino */}
          <Route
            path="/dinos/:id"
            element={
              <ProtectedRoute>
                <DinoDetail />
              </ProtectedRoute>
            }
          />

          {/* Editar dino */}
          <Route
            path="/dinos/edit/:id"
            element={
              <ProtectedRoute>
                <DinoForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

const Header = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DinoApp 🌋
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-5" to="/dinos/new">
                    Cargar Dino
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-5" to="/dinos">
                    Ver Dinosaurios
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-5" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-5" to="/register">
                    Registro
                  </Link>
                </li>
              </>
            )}
            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-lg px-4 py-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return (
      <div className="alert alert-secondary mt-4 p-5 rounded fs-4 text-center">
        🦖 Por favor iniciar sesión para acceder a esta sección. 🌿
      </div>
    );
  }
  return children;
};

export default App;
