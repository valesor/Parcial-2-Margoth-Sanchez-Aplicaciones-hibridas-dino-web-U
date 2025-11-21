import React, { useEffect, useState } from "react";
import { listDinos } from "../api/dinosApi";
import DinoCard from "../components/DinoCard";

const DinosList = () => {
  const [dinos, setDinos] = useState([]);

  useEffect(() => {
    fetchDinos();
  }, []);

  const fetchDinos = async () => {
    try {
      const res = await listDinos();
      setDinos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4 text-center">🦖 Lista de Dinosaurios 🦕</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {dinos.map((d) => (
          <div className="col" key={d._id}>
            <DinoCard dino={d} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DinosList;
