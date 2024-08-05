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

      // Validación de response status y data
      if (response.status === 200 && response.data && response.data.data) {
        const spaceId = response.data.data.id;
        console.log("Response:", response);
        console.log("Space Id:", spaceId);

        // Sube las fotos si la actualización de espacios se realizó con éxito
        await uploadPhotos(spaceId, photos);
        toast.success("Espacio actualizado");
        navigate("/space/spaces");
      } else {
        // Maneja una respuesta inesperada del servidor
        toast.error("Respuesta inesperada del servidor");
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error(
        "Error al actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error al actualizar el espacio: " +
          (error.response?.data?.mensaje ||
            error.message ||
            "Error desconocido")
      );
    }
  };
  //   try {
  //     const response = await axios.put(`/api/spaces/${id}`, formData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       },
  //     });

  //     console.log("Response:", response);
  //     const spaceId = response.data.data.id;
  //     console.log("Space Id:", spaceId);

  //     await uploadPhotos(spaceId, photos);
  //     toast.success("Espacio actualizado");
  //     navigate("/space/spaces");
  //   } catch (error) {
  //     console.error(
  //       "Error al actualizar el espacio:",
  //       error.response ? error.response.data : error.message
  //     );
  //     toast.error(
  //       "Error al actualizar el espacio: " + error.response.data.mensaje
  //     );
  //   }
  // };

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

  //Añadimos la lógica para borrar fotos
  const handleDeletePhoto = async (spaceId, photoId) => {
    try {
      await axios.delete(`/api/spaces/${spaceId}/photos/${photoId}`, {
        headers: {
          Authorization: token,
        },
      });

      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId)
      );
      toast.success("Foto borrada");
    } catch (error) {
      console.error("Error borrando la foto:", error);
      toast.error("Error al borrar la foto: " + error.response.data.message);
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
        onDeletePhoto={handleDeletePhoto}
        photos={photos}
        imagePreview={imagePreview}
      />
    </>
  );
};

export default UpdateSpace;
