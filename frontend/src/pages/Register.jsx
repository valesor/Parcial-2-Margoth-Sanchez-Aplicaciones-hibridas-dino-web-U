import React, { useState } from "react";
import { register as apiRegister } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";

    if (!form.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email inválido";

    if (!form.password) newErrors.password = "Ingresá una contraseña";
    else if (form.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    if (form.confirm !== form.password)
      newErrors.confirm = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        email: form.email,
        password: form.password,
        name: form.name,
      };

      await apiRegister(payload);
      setMsg(" Usuario creado con éxito. ¡Ya podés loguearte!");

      setTimeout(() => nav("/login"), 1000);
    } catch (err) {
      setMsg(err?.response?.data?.message || " Error al crear usuario");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow p-4"
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: "16px",
          background: "#ffffff",
        }}
      >
        <h2 className="text-center mb-3">📝 Crear Cuenta</h2>
        <p className="text-muted text-center mb-4">
          Completá tus datos para registrarte
        </p>

        {msg && (
          <div
            className="alert alert-info text-center"
            style={{ fontSize: "0.95rem" }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={submit} noValidate>
          {/* Nombre */}
          <div className="mb-3">
            <label className="fw-bold">Nombre</label>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Tu nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

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
          <div className="mb-3">
            <label className="fw-bold">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* Confirmaciom Password */}
          <div className="mb-4">
            <label className="fw-bold">Confirmar contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
              placeholder="Repetí la contraseña"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
            {errors.confirm && (
              <small className="text-danger">{errors.confirm}</small>
            )}
          </div>

          <button
            className="btn btn-success w-100 py-2 fw-bold"
            style={{ fontSize: "1.1rem", borderRadius: "8px" }}
          >
            Crear cuenta
          </button>
        </form>

        <p
          className="text-center text-muted mt-4"
          style={{ fontSize: "0.85rem" }}
        >
          Ya tenés cuenta? <a href="/login">Iniciá sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
