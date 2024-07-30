import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const CreateSpace = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);

  const handleCreateSubmit = async (id, formData, token) => {
    try {
      const response = await axios.post("/api/spaces", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const spaceId = response.data.data.id;

      if (photos.length > 0) {
        await uploadPhotos(spaceId, photos);
      }

      navigate("/space/spaces");
    } catch (error) {
      console.error(
        "Error al crear o actualizar el espacio:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPhotos(files);
    }
  };

  const uploadPhotos = async (spaceId, photos) => {
    const formData = new FormData();
    photos.forEach((file, index) => formData.append(`photo`, file));
    try {
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
    } catch (error) {
      console.error("Error al subir las fotos:", error);
    }
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

// import SpaceForm from "../../shared/SpaceForm.jsx";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useState } from "react";

// const CreateSpace = () => {
//   const navigate = useNavigate();
//   const { token } = useAuth(); // Se coge el token del contexto
//   const [photos, setPhotos] = useState([]);

//   // Función para majenar el envío
//   const handleCreateSubmit = async (id, formData, token, photos) => {
//     try {
//       // Crear o modificar un espacio
//       const response = await axios.post("/api/spaces", formData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//       });
//       console.log(response);
//       const spaceId = response.data.data.id;
//       console.log(spaceId);

//       // Maneja la subida de fotos
//       await uploadPhotos(spaceId, photos);

//       navigate("/spaces");
//     } catch (error) {
//       console.error(
//         "Error al crear o actualizar el espacio:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   // Función para la subida de fotos
//   const uploadPhotos = async (spaceId, photos) => {
//     try {
//       if (photos.length === 0) return;

//       const formData = new FormData();
//       photos.forEach((photo, index) => formData.append(`foto${index}`, photo));

//       await axios.post(`api/spaces/${spaceId}/photos`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//       });
//     } catch (error) {
//       console.error(
//         "Error al subir las fotos:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   // Función para manejar cambios en las fotos
//   const handlePhotosChange = (newPhotos) => {
//     setPhotos(newPhotos);
//   };

//   return (
//     <>
//       <h2>Actualiza un espacio</h2>
//       <SpaceForm
//         onSubmit={handleCreateSubmit}
//         onPhotosChange={handlePhotosChange}
//       />
//     </>
//   );
// };

// export default CreateSpace;
