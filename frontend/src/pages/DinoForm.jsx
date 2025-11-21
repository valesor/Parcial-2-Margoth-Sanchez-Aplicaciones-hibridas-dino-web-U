import React, { useState, useEffect } from "react";
import { listPaleos, createDino, updateDino } from "../api/dinosApi";
import API from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

// Paleontólogos argentinos
const argPaleos = [
  "Ricardo Fortosaurio 💪🦖",
  "Mirta Legrandopteryx 👵✨",
  "Susana VelociraptORO 💛",
  "Moria Casandrosaurus 👑",
  "Marcelo Tinellisaurio 📺",
];

const erasOptions = [
  "Jurásico Porteño 🏙️",
  "Cretácico del Asado 🔥",
  "Triásico del Mate 🍵",
  "Mesozoico del Tango 🎶",
  "Paleolítico del Choripán 🌭",
];

const dietOptions = [
  "Carnívoro del Choripán 🌭",
  "Herbívoro del Dulce de Leche 🍮",
  "Omnívoro del Fernet 🍹",
  "Frugívoro de la Empanada 🥟",
  "Insectívoro de Alfajor 🥮",
];

const DinoForm = () => {
  const { token } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const dinoToEdit = location.state?.dino || null;

  const [paleos, setPaleos] = useState([]);

  const [form, setForm] = useState({
    name: dinoToEdit?.name || "",
    era: dinoToEdit?.era || "",
    diet: dinoToEdit?.diet || "",
    description: dinoToEdit?.description || "",
    paleontologist: dinoToEdit?.paleontologist?._id || "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchPaleos();
  }, []);

  const fetchPaleos = async () => {
    try {
      const res = await listPaleos();

      if (res.data.length === 0) {
        const fake = argPaleos.map((p, i) => ({
          _id: `falso${i}`, // NO  en DB
          name: p,
        }));
        setPaleos(fake);
      } else {
        setPaleos(res.data);
      }
    } catch (err) {
      console.error("Error cargando paleontólogos:", err);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Debe ingresar un nombre";
    if (!form.era) newErrors.era = "Debe seleccionar una era";
    if (!form.diet) newErrors.diet = "Debe seleccionar una dieta";

    // Paleontólogo debe ser un ObjectId r
    if (form.paleontologist.startsWith("falso"))
      newErrors.paleontologist =
        "Este paleontólogo no existe en la base de datos";

    if (!form.paleontologist)
      newErrors.paleontologist = "Debe seleccionar un paleontólogo real";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!token) return setMsg("Debes iniciar sesión");

    try {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (dinoToEdit) {
        await updateDino(dinoToEdit._id, form);
        setMsg("Dinosaurio actualizado");
      } else {
        await createDino(form);
        setMsg("Dinosaurio creado");
      }

      setTimeout(() => nav("/dinos"), 800);
    } catch (err) {
      console.error(err);
      setMsg("Error guardando datos");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card shadow p-4"
        style={{
          width: "100%",
          maxWidth: "550px",
          borderRadius: "14px",
          background: "#fdfdfd",
        }}
      >
        <h3 className="text-center mb-3">
          {dinoToEdit ? "📝 Editar Dinosaurio" : "🦖 Crear Dinosaurio"}
        </h3>

        <p
          className="text-muted text-center mb-4"
          style={{ fontSize: "0.95rem" }}
        >
          Acá cargás tu dinosaurio argentinizado. Solo seleccionás un
          paleontólogo, no se pueden agregar nuevos desde acá.
        </p>

        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={submit} noValidate>
          {/* Nombre */}
          <div className="mb-3">
            <label className="fw-bold">Nombre</label>
            <input
              placeholder="Ej: DinoChori, MateRaptor…"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          {/* Era */}
          <div className="mb-3">
            <label className="fw-bold">Era</label>
            <select
              className={`form-select ${errors.era ? "is-invalid" : ""}`}
              value={form.era}
              onChange={(e) => setForm({ ...form, era: e.target.value })}
            >
              <option value="">Seleccioná una era</option>
              {erasOptions.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
            {errors.era && <small className="text-danger">{errors.era}</small>}
          </div>

          {/* Dieta */}
          <div className="mb-3">
            <label className="fw-bold">Dieta</label>
            <select
              className={`form-select ${errors.diet ? "is-invalid" : ""}`}
              value={form.diet}
              onChange={(e) => setForm({ ...form, diet: e.target.value })}
            >
              <option value="">Seleccioná la dieta</option>
              {dietOptions.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.diet && (
              <small className="text-danger">{errors.diet}</small>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-3">
            <label className="fw-bold">Descripción</label>
            <textarea
              placeholder="Detalles del dino…"
              className="form-control"
              value={form.description}
              rows={3}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Paleontólogo */}
          <div className="mb-4">
            <label className="fw-bold">Paleontólogo</label>
            <select
              className={`form-select ${
                errors.paleontologist ? "is-invalid" : ""
              }`}
              value={form.paleontologist}
              onChange={(e) =>
                setForm({ ...form, paleontologist: e.target.value })
              }
            >
              <option value="">Seleccioná uno</option>
              {paleos.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.paleontologist && (
              <small className="text-danger">{errors.paleontologist}</small>
            )}
          </div>

          <button
            className="btn btn-success w-100 fw-bold py-2"
            style={{ borderRadius: "8px", fontSize: "1.1rem" }}
          >
            {dinoToEdit ? "Actualizar Dinosaurio" : "Crear Dinosaurio"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DinoForm;
