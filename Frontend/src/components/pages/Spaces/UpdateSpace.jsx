import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const UpdateSpace = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);

  const handleUpdateSubmit = async (id, formData, token, photos) => {
    try {
      const response = await axios.put(`/api/spaces/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const spaceId = response.data.id;

      await uploadPhotos(spaceId, photos);

      navigate("/");
    } catch (error) {
      console.error(
        "Error al actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const uploadPhotos = async (spaceId, photos) => {
    try {
      if (photos.length === 0) return;

      const formData = new FormData();
      photos.forEach((photo, index) => formData.append(`name/${index}`, photo));

      await axios.post(`/api/spaces/${spaceId}/photos`, formData, {
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

  const handlePhotosChange = (newPhotos) => {
    setPhotos(newPhotos);
  };

  return (
    <>
      <h2>Update Space</h2>
      <SpaceForm
        onSubmit={handleUpdateSubmit}
        onPhotosChange={handlePhotosChange}
      />
    </>
  );
};

export default UpdateSpace;
