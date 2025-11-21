import React, { createContext, useState, useEffect, useContext } from "react";
import { setAuthToken } from "../api/authApi";

const AuthContext = createContext();

// Hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Ejecuta cuando cambia el token
  useEffect(() => {
    setAuthToken(token);

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  // Guardo usuario cuando cambie
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // login
  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
  };

  //logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporto
export default AuthContext;
