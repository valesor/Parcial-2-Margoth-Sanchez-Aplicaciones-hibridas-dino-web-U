import axios from "axios";

// Axios con la URL base del backend
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
});

// Registro usuario
export const register = (data) => API.post("/auth/register", data);

// Login usuario
export const login = (data) => API.post("/auth/login", data);

//token en headers
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
