import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSpace = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const handleUpdateSubmit = async (id, formData, token, photos) => {
    try {
      const response = await axios.put(`/api/spaces/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log("Response:", response);
      const spaceId = response.data.data.id;
      console.log("Space Id:", spaceId);

      await uploadPhotos(spaceId, photos);

      navigate("/space/spaces");
    } catch (error) {
      console.error(
        "Error al actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error al actualizar el espacio: " + error.response.data.mensaje
      );
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Archivos seleccionados:", files);
    if (files.length > 0) {
      setPhotos((prevPhotos) => {
        const updatedPhotos = [...prevPhotos, ...files];
        console.log("Estado de las fotos actualizadas:", updatedPhotos);
        return updatedPhotos;
      });
    }
    if (files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setImagePreview("");
    }
  };

  const uploadPhotos = async (spaceId, files) => {
    console.log("spaceId para actualizar:", spaceId);
    console.log("Fotos para actualizar:", files);
    if (!photos || !Array.isArray(files) || photos.files === 0) return;
    const formData = new FormData();
    photos.forEach((file) => formData.append(`photo`, file));
    try {
      console.log("Subiendo fotos a:", spaceId);
      await axios.post(`/api/spaces/${spaceId}/photos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      console.log("Fotos subidas");
      toast.success("Fotos subidas");
    } catch (error) {
      console.error("Error subiendo las fotos:", error);
      toast.error("Error subiendo las fotos: " + error.response.data.mensaje);
    }
  };

  return (
    <>
      <SpaceForm
        onSubmit={handleUpdateSubmit}
        onPhotosChange={handlePhotosChange}
        imagePreview={imagePreview}
      />
    </>
  );
};

export default UpdateSpace;
