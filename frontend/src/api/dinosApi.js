import API from "./authApi";

// Paleontólogos
export const createPaleo = (data) => API.post("/paleos", data);
export const listPaleos = () => API.get("/paleos");
export const deletePaleo = (id) => API.delete(`/paleos/${id}`);
// Dinosaurios
export const createDino = (data) => API.post("/dinos", data);
export const listDinos = () => API.get("/dinos");
export const getDino = (id) => API.get(`/dinos/${id}`);
export const updateDino = (id, data) => API.put(`/dinos/${id}`, data);
export const deleteDino = (id) => API.delete(`/dinos/${id}`);
