import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

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
      {isAdmin ? (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Listado de espacios</h2>
          {console.log("Spaces array:", spaces)}
          <ul className="space-y-2">
            {Array.isArray(spaces) && spaces.length > 0 ? (
              spaces.map((space) => (
                <li key={space.id} className="text-gray-600">
                  {console.log("objeto espacio individual:", space)}
                  <span className="font-semibold text-gray-700">
                    Nombre:
                  </span>{" "}
                  {space.nombre} <br />
                  <button
                    onClick={() => handleEditClick(space.id)}
                    className="inline-block bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
                  >
                    Editar
                  </button>
                </li>
              ))
            ) : (
              <li>No hay espacios disponibles</li>
            )}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Listado de espacios</h2>
          {console.log("Espacos array:", spaces)}
          <ul>
            {Array.isArray(spaces) && spaces.length > 0 ? (
              spaces.map((space) => (
                <li key={space.id} className="text-gray-600">
                  {console.log("objeto espacio individual:", space)}
                  <strong>Nombre:</strong> {space.nombre} <br />
                </li>
              ))
            ) : (
              <li>No hay espacios disponibles</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default SpacesList;
