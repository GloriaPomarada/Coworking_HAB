import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"

function SpacesList() {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get("/api/spaces");
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setSpaces(response.data.data);
        } else {
          console.error("Error en el formato de la data:", response.data);
          setSpaces([]);
        }
      } catch (error) {
        console.error("Error en el fetch de espacios:", error);
      }
    };

    fetchSpaces();
  }, []);

  const handleEditClick = (id) => {
    if (id) {
      navigate(`/space/update-space/${id}`);
    } else {
      console.error("No se proporcionó un ID válido");
    }
  };

  return (
    <>
  {
    isAdmin ? (
      <div>
        <h2>Listado de espacios</h2>
        {console.log("Spaces array:", spaces)}
        <ul>
          {Array.isArray(spaces) && spaces.length > 0 ? (
            spaces.map((space) => (
              <li key={space.id}>
                {console.log("Space object individual:", space)}
                <strong>Nombre:</strong> {space.nombre} <br />
                <button onClick={() => handleEditClick(space.id)}>Editar</button>
              </li>
            ))
          ) : (
            <li>No hay espacios disponibles</li>
          )}
        </ul>
      </div>   
  ) : (
    <div>
    <h2>Listado de espacios</h2>
    {console.log("Spaces array:", spaces)}
    <ul>
      {Array.isArray(spaces) && spaces.length > 0 ? (
        spaces.map((space) => (
          <li key={space.id}>
            {console.log("Space object individual:", space)}
            <strong>Nombre:</strong> {space.nombre} <br />
          </li>
        ))
      ) : (
        <li>No hay espacios disponibles</li>
      )}
    </ul>
  </div>
  )
}

</>
  );
}

export default SpacesList;


