import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SpacesList() {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get("/api/spaces");
        console.log("API Response:", response.data); // Log the response data

        // Assuming response.data has a structure like { data: [], status: "ok" }
        if (response.data && Array.isArray(response.data.data)) {
          setSpaces(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setSpaces([]);
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/update-space/${id}`);
  };

  return (
    <div>
      <h2>Listado de espacios</h2>
      <ul>
        {Array.isArray(spaces) && spaces.length > 0 ? (
          spaces.map((space) => (
            <li key={space.id}>
              <strong>Nombre:</strong> {space.nombre} <br />
              <button onClick={() => handleEditClick(space.id)}>Editar</button>
            </li>
          ))
        ) : (
          <li>No hay espacios disponibles</li>
        )}
      </ul>
    </div>
  );
}

export default SpacesList;
