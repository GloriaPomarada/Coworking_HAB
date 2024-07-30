import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const UpdateSpace = () => {
  // const { id } = useParams();
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
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, ...files]);
      console.log("Fotos actualizadas:", files);
      console.log("Estado actual de photos:", [...photos, ...files]);
    }
  };

  // const handlePhotosChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length > 0) {
  //     setPhotos(files);
  //     console.log("Fotos actualizadas:", files);
  //   }
  // };

  const uploadPhotos = async (spaceId, photos) => {
    console.log("spaceId:", spaceId);
    console.log("photos:", photos);
    if (!photos || !Array.isArray(photos) || photos.length === 0) return;
    const formData = new FormData();
    photos.forEach((file, index) => formData.append(`photo`, file));
    try {
      console.log("Intentado subir las fotos del spaceId:", spaceId);
      await axios.post(
        `http://localhost:3001/api/spaces/${spaceId}/photos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log("Fotos subidas correctamente");
    } catch (error) {
      console.error("Error al subir las fotos:", error);
    }
  };
  // console.log("Photos:", photos);

  // const uploadPhotos = async (spaceId, photos) => {
  //   try {
  //     if (photos.length === 0) return;

  //     const formData = new FormData();
  //     photos.forEach((photo, index) => formData.append(`foto${index}`, photo));

  //     await axios.post(`/api/spaces/${spaceId}/photos`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: token,
  //       },
  //     });
  //   } catch (error) {
  //     console.error(
  //       "Error al subir las fotos:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  // const handlePhotosChange = (newPhotos) => {
  //   setPhotos(newPhotos);
  // };

  return (
    <>
      <h2>Modifica un espacio</h2>
      <SpaceForm
        onSubmit={handleUpdateSubmit}
        onPhotosChange={handlePhotosChange}
      />
    </>
  );
};

export default UpdateSpace;
