import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const CreateSpace = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Se coge el token del contexto
  const [photos, setPhotos] = useState([]);

  // Función para majenar el envío
  const handleCreateSubmit = async (id, formData, token, photos) => {
    try {
      // Crear o modificar un espacio
      const response = await axios.post("/api/spaces", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(response);
      const spaceId = response.data.data.id;
      console.log(spaceId);

      // Maneja la subida de fotos
      await uploadPhotos(spaceId, photos);

      navigate("/");
    } catch (error) {
      console.error(
        "Error al crear o actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Función para la subida de fotos
  const uploadPhotos = async (spaceId, photos) => {
    try {
      if (photos.length === 0) return;

      const formData = new FormData();
      photos.forEach((photo, index) => formData.append(`foto${index}`, photo));

      await axios.post(`api/spaces/${spaceId}/photos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    } catch (error) {
      console.error(
        "Error al subir las fotos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Función para manejar cambios en las fotos
  const handlePhotosChange = (newPhotos) => {
    setPhotos(newPhotos);
  };

  return (
    <>
      <h2>Actualiza un espacio</h2>
      <SpaceForm
        onSubmit={handleCreateSubmit}
        onPhotosChange={handlePhotosChange}
      />
    </>
  );
};

export default CreateSpace;
