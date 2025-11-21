import React, { useState } from "react";
import { login as apiLogin } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);

  const { login } = useAuth();
  const nav = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email inválido";

    if (!form.password) newErrors.password = "Ingresá tu contraseña";
    else if (form.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await apiLogin(form);
      const token = res.data.token;
      const userData = res.data.user;

      login(token, userData);
      setMsg("Inicio de sesión exitoso");

      setTimeout(() => nav("/"), 800);
    } catch (err) {
      console.log("Error login:", err);
      setMsg(err?.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "16px",
          background: "#ffffff",
        }}
      >
        <h2 className="text-center mb-3">🔐 Iniciar Sesión</h2>

        {msg && (
          <div
            className="alert alert-info text-center"
            style={{ fontSize: "0.95rem" }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={submit} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="fw-bold">Email</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="tuemail@mail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="fw-bold">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Tu contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <button
            className="btn btn-success w-100 py-2 fw-bold"
            style={{ fontSize: "1.1rem", borderRadius: "8px" }}
          >
            Ingresar
          </button>
        </form>

        <p
          className="text-center text-muted mt-4"
          style={{ fontSize: "0.85rem" }}
        >
          ¿No tenés cuenta? <a href="/register">Registrate acá</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
