import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const UpdateSpace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);

  const handleUpdateSubmit = async (id, formData) => {
    try {
      const response = await axios.put(`/api/spaces/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      const spaceId = response.data.id;

      await uploadPhotos(spaceId);

      navigate("/");
    } catch (error) {
      console.error(
        "Error al actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const uploadPhotos = async (spaceId) => {
    try {
      if (photos.length === 0) return;

      const formData = new FormData();
      photos.forEach((photo, index) => formData.append(`photo${index}`, photo));

      await axios.post(`/api/spaces/${spaceId}/photos`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
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
