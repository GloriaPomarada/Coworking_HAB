import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateSpace = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Se coge el token del contexto

  // Función para majenar el envío
  const handleCreateSubmit = async (id, formData, token, photos) => {
    try {
      // Crear o modificar un espaco
      const response = await axios.post("/api/spaces", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(response);
      const spaceId = response.data.id;

      // Maneja la subida de fotos
      await uploadPhotos(spaceId, photos);

      navigate("/");
    } catch (error) {
      console.error(
        "Error al crear el espacio:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Función para la subida de fotos
  const uploadPhotos = async (spaceId, photos) => {
    try {
      if (photos.length === 0) return;

      const formData = new FormData();
      photos.forEach((photo, index) => formData.append(`name/${index}`, photo));

      await axios.post(`api/spaces/${spaceId}/photos`, formData, {
        headers: {
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
      <h2>Add a Space</h2>
      <SpaceForm
        onSubmit={handleCreateSubmit}
        onPhotosChange={handlePhotosChange}
      />
    </>
  );
};

export default CreateSpace;
