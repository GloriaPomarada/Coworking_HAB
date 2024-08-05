import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import usePreventNumberInputScroll from "../../hooks/UsePreventScrollNumber.jsx";
import { FaRegTrashAlt } from "react-icons/fa";

// Access the environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

const SpaceForm = ({ onSubmit, onPhotosChange, photos, imagePreview }) => {
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formState, setFormState] = useState({
    nombre: "",
    descripcion: "",
    categoria_id: "",
    capacidad: "",
    precio_por_persona: "",
    precio_espacio_completo: "",
    direccion: "",
    estado: "",
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [spacePhotos, setSpacePhotos] = useState([]); // To store photo URLs and IDs
  usePreventNumberInputScroll();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories", {
          headers: { Authorization: token }, // Use Authorization header
        });
        setCategories(response.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Error al hacer el fetch de las categorías";
        setMessage(errorMessage);
        setMessageType("error");
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (id) {
      const fetchSpace = async () => {
        try {
          const response = await axios.get(`/api/spaces/${id}`, {
            headers: { Authorization: token },
          });
          const space = response.data.data;

          setFormState({
            nombre: space.nombre,
            descripcion: space.descripcion,
            categoria_id: space.categoria_id,
            capacidad: space.capacidad,
            precio_por_persona: space.precio_por_persona,
            precio_espacio_completo: space.precio_espacio_completo,
            direccion: space.direccion,
            estado: space.estado,
          });

          // Construct the full image URLs and IDs
          const photoDetails = space.imagenes.map((image) => ({
            url: `${BASE_URL}/${image.filename}`, // Fixed to use filename for the URL
            id: image.id,
          }));
          setSpacePhotos(photoDetails);
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Error al hacer el fetch de los datos del espacio";
          setMessage(errorMessage);
          setMessageType("error");
        }
      };

      fetchSpace();
    }
  }, [id, token]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const handleDeletePhoto = async (photoId) => {
    if (!photoId) {
      console.error("Sin photoId proporcionado");
      return;
    }

    try {
      console.log(`Attempting to delete photo with ID: ${photoId}`);
      const response = await axios.delete(
        `/api/spaces/${id}/photos/${photoId}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(`Delete response:`, response);
      setSpacePhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId)
      );
    } catch (error) {
      console.error("Error deleting photo:", error);
      const errorMessage =
        error.response?.data?.message || "Error al eliminar la foto";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        throw new Error("Acceso denegado: solo administradores");
      }
      const jsonFormData = JSON.stringify(formState);
      await onSubmit(id, jsonFormData, token, photos);
      resetForm();
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al enviar el formulario";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  const resetForm = () => {
    setFormState({
      nombre: "",
      descripcion: "",
      categoria_id: "",
      capacidad: "",
      precio_por_persona: "",
      precio_espacio_completo: "",
      direccion: "",
      estado: "",
    });
    onPhotosChange([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {id ? "Actualizar Espacio" : "Crear Espacio"}
      </h1>
      <div className="space-y-4">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formState.nombre}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formState.descripcion}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Categoría:
          <select
            name="categoria_id"
            value={formState.categoria_id}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Capacidad:
          <input
            type="number"
            name="capacidad"
            value={formState.capacidad}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Precio por persona:
          <input
            type="number"
            name="precio_por_persona"
            value={formState.precio_por_persona}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Precio espacio completo:
          <input
            type="number"
            name="precio_espacio_completo"
            value={formState.precio_espacio_completo}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formState.direccion}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label>
          Estado:
          <select
            name="estado"
            value={formState.estado}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona un estado
            </option>
            <option value="libre">Libre</option>
            <option value="reservado">Reservado</option>
          </select>
        </label>
        <label>
          Fotos:
          <input
            type="file"
            multiple
            onChange={onPhotosChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-full mt-4" />
          )}
          <div className="mt-4">
            {spacePhotos.map((photo) => (
              <div key={photo.id} className="relative">
                <img
                  src={photo.url} // Updated to use the full URL
                  alt={`Space photo ${photo.id}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-2 right-2 text-white bg-red-500 rounded-md  hover:bg-red-600"
                >
                  <FaRegTrashAlt className="w-8 h-8" />
                </button>
              </div>
            ))}
          </div>
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {id ? "Actualizar Espacio" : "Crear Espacio"}
        </button>
      </div>
      {message && (
        <div
          className={`mt-4 ${
            messageType === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

SpaceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPhotosChange: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  imagePreview: PropTypes.string,
};

export default SpaceForm;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PropTypes from "prop-types";
// import { useAuth } from "../context/AuthContext";
// import usePreventNumberInputScroll from "../../hooks/UsePreventScrollNumber.jsx";

// // Access the environment variable
// const BASE_URL = import.meta.env.VITE_API_URL;

// const SpaceForm = ({ onSubmit, onPhotosChange, photos, imagePreview }) => {
//   const { isAdmin } = useAuth();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useAuth();
//   const [formState, setFormState] = useState({
//     nombre: "",
//     descripcion: "",
//     categoria_id: "",
//     capacidad: "",
//     precio_por_persona: "",
//     precio_espacio_completo: "",
//     direccion: "",
//     estado: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [spacePhotos, setSpacePhotos] = useState([]); // To store photo URLs and IDs
//   usePreventNumberInputScroll();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/categories", {
//           headers: { Authorization: token }, // Use Authorization header
//         });
//         setCategories(response.data);
//       } catch (error) {
//         const errorMessage =
//           error.response?.data?.message ||
//           "Error al hacer el fetch de las categorías";
//         setMessage(errorMessage);
//         setMessageType("error");
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (id) {
//       const fetchSpace = async () => {
//         try {
//           const response = await axios.get(`/api/spaces/${id}`, {
//             headers: { Authorization: token },
//           });
//           const space = response.data.data;

//           setFormState({
//             nombre: space.nombre,
//             descripcion: space.descripcion,
//             categoria_id: space.categoria_id,
//             capacidad: space.capacidad,
//             precio_por_persona: space.precio_por_persona,
//             precio_espacio_completo: space.precio_espacio_completo,
//             direccion: space.direccion,
//             estado: space.estado,
//           });

//           // Construct the full image URLs and IDs
//           const photoDetails = space.imagenes.map((image) => ({
//             url: `${BASE_URL}/${image}`,
//             id: image.id,
//           }));
//           setSpacePhotos(photoDetails);
//         } catch (error) {
//           const errorMessage =
//             error.response?.data?.message ||
//             "Error al hacer el fetch de los datos del espacio";
//           setMessage(errorMessage);
//           setMessageType("error");
//         }
//       };

//       fetchSpace();
//     }
//   }, [id, token]);

//   const handleInputChange = ({ target }) => {
//     const { name, value } = target;
//     setFormState({ ...formState, [name]: value });
//   };

//   const handleDeletePhoto = async (photoId) => {
//     if (!photoId) {
//       console.error("Sin photoId proporcionado");
//       return;
//     }

//     try {
//       console.log(`Attempting to delete photo with ID: ${photoId}`);
//       const response = await axios.delete(
//         `/api/spaces/${id}/photos/${photoId}`,
//         {
//           headers: { Authorization: token },
//         }
//       );
//       console.log(`Delete response:`, response);
//       setSpacePhotos((prevPhotos) =>
//         prevPhotos.filter((photo) => photo.id !== photoId)
//       );
//     } catch (error) {
//       console.error("Error deleting photo:", error);
//       const errorMessage =
//         error.response?.data?.mensaje || "Error al eliminar la foto";
//       setMessage(errorMessage);
//       setMessageType("error");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!isAdmin) {
//         throw new Error("Acceso denegado: solo administradores");
//       }
//       const jsonFormData = JSON.stringify(formState);
//       await onSubmit(id, jsonFormData, token, photos);
//       resetForm();
//       navigate("/");
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Error al enviar el formulario";
//       setMessage(errorMessage);
//       setMessageType("error");
//     }
//   };

//   const resetForm = () => {
//     setFormState({
//       nombre: "",
//       descripcion: "",
//       categoria_id: "",
//       capacidad: "",
//       precio_por_persona: "",
//       precio_espacio_completo: "",
//       direccion: "",
//       estado: "",
//     });
//     setPhotos([]);
//     setImagePreview("");
//     onPhotosChange([]);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
//     >
//       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         {id ? "Actualizar Espacio" : "Crear Espacio"}
//       </h1>
//       <div className="space-y-4">
//         <label>
//           Nombre:
//           <input
//             type="text"
//             name="nombre"
//             value={formState.nombre}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Descripción:
//           <textarea
//             name="descripcion"
//             value={formState.descripcion}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Categoría:
//           <select
//             name="categoria_id"
//             value={formState.categoria_id}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="" disabled>
//               Selecciona una categoría
//             </option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.nombre}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Capacidad:
//           <input
//             type="number"
//             name="capacidad"
//             value={formState.capacidad}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Precio por persona:
//           <input
//             type="number"
//             name="precio_por_persona"
//             value={formState.precio_por_persona}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Precio espacio completo:
//           <input
//             type="number"
//             name="precio_espacio_completo"
//             value={formState.precio_espacio_completo}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Dirección:
//           <input
//             type="text"
//             name="direccion"
//             value={formState.direccion}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Estado:
//           <select
//             name="estado"
//             value={formState.estado}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="" disabled>
//               Selecciona un estado
//             </option>
//             <option value="libre">Libre</option>
//             <option value="reservado">Reservado</option>
//           </select>
//         </label>
//         <label>
//           Fotos:
//           <input
//             type="file"
//             multiple
//             onChange={onPhotosChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {imagePreview && <img src={imagePreview} alt="Preview" />}
//           <div className="mt-4">
//             {spacePhotos.map((photo) => (
//               <div key={photo.id} className="relative">
//                 <img
//                   src={photo.id}
//                   alt={`Space photo ${photo.id}`}
//                   className="w-full h-40 object-cover rounded-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleDeletePhoto(photo.id)}
//                   className="absolute top-2 right-2 text-red-500"
//                 >
//                   Eliminar
//                 </button>
//               </div>
//             ))}
//           </div>
//         </label>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           {id ? "Actualizar Espacio" : "Crear Espacio"}
//         </button>
//       </div>
//       {message && (
//         <div
//           className={`mt-4 ${
//             messageType === "error" ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//     </form>
//   );
// };

// SpaceForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onPhotosChange: PropTypes.func.isRequired,
//   onDeletePhoto: PropTypes.func.isRequired,
//   photos: PropTypes.array.isRequired,
//   imagePreview: PropTypes.string,
// };

// export default SpaceForm;

{
  /* // import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PropTypes from "prop-types";
// import { useAuth } from "../context/AuthContext";
// import usePreventNumberInputScroll from "../../hooks/UsePreventScrollNumber.jsx";

// const SpaceForm = ({ onSubmit, onPhotosChange, imagePreview }) => {
//   const { isAdmin } = useAuth();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useAuth();
//   const [formState, setFormState] = useState({
//     nombre: "",
//     descripcion: "",
//     categoria_id: "",
//     // categoria_nombre: "",
//     capacidad: "",
//     precio_por_persona: "",
//     precio_espacio_completo: "",
//     direccion: "",
//     estado: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [photos, setPhotos] = useState([]);
//   usePreventNumberInputScroll();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/categories", {
//           headers: { Authorization: token },
//         });
//         setCategories(response.data);
//       } catch (error) {
//         const errorMessage =
//           error.response?.data?.message ||
//           "Error al hacer el fetch de las categorías";
//         setMessage(errorMessage);
//         setMessageType("error");
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (id) {
//       const fetchSpace = async () => {
//         try {
//           const response = await axios.get(`/api/spaces/${id}`, {
//             headers: { Authorization: token },
//           });
//           const space = response.data.data;

//           setFormState({
//             nombre: space.nombre,
//             descripcion: space.descripcion,
//             categoria_id: space.categoria_id,
//             // categoria_nombre: space.categoria_nombre,
//             capacidad: space.capacidad,
//             precio_por_persona: space.precio_por_persona,
//             precio_espacio_completo: space.precio_espacio_completo,
//             direccion: space.direccion,
//             estado: space.estado,
//           });
//         } catch (error) {
//           const errorMessage =
//             error.response?.data?.message ||
//             "Error al hacer el fetch de los datos del espacio";
//           setMessage(errorMessage);
//           setMessageType("error");
//         }
//       };

//       fetchSpace();
//     }
//   }, [id, token]);

//   const handleInputChange = ({ target }) => {
//     const { name, value } = target;
//     setFormState({ ...formState, [name]: value });
//     // setImagePreview(URL.createObjectURL(photos));
//   };
//   //Esto va comentado
//   // const handlePhotosChange = ({ target }) => {
//   //   const files = Array.from(target.files);
//   //   setPhotos(files);
//   //   if (files.length > 0) {
//   //     setImagePreview(URL.createObjectURL(files[0]));
//   //   } else {
//   //     setImagePreview("");
//   //   }
//   //   onPhotosChange(files); // Notify parent component of the change
//   // };
//   ///////////////////////

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!isAdmin) {
//         throw new Error("Acceso denegado: solo administradores");
//       }
//       const jsonFormData = JSON.stringify(formState);
//       await onSubmit(id, jsonFormData, token, photos);
//       resetForm();
//       navigate("/");
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Error al enviar el formulario";
//       setMessage(errorMessage);
//       setMessageType("error");
//     }
//   };

//   const resetForm = () => {
//     setFormState({
//       nombre: "",
//       descripcion: "",
//       categoria_id: "",
//       capacidad: "",
//       precio_por_persona: "",
//       precio_espacio_completo: "",
//       direccion: "",
//       estado: "",
//     });
//     setPhotos([]);
//     setImagePreview("");
//     onPhotosChange([]);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
//     >
//       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         {id ? "Actualizar Espacio" : "Crear Espacio"}
//       </h1>
//       <div className="space-y-4">
//         <label>
//           Nombre:
//           <input
//             type="text"
//             name="nombre"
//             value={formState.nombre}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Descripción:
//           <textarea
//             name="descripcion"
//             value={formState.descripcion}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Categoría:
//           <select
//             name="categoria_id"
//             value={formState.categoria_id}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="" disabled>
//               Selecciona una categoría
//             </option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.nombre}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Capacidad:
//           <input
//             type="number"
//             name="capacidad"
//             id="numberInput1"
//             value={formState.capacidad}
//             onChange={handleInputChange}
//             required
//             className="remove-arrow w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Precio por persona:
//           <input
//             type="number"
//             name="precio_por_persona"
//             id="numberInput2"
//             value={formState.precio_por_persona}
//             onChange={handleInputChange}
//             required
//             className="remove-arrow w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Precio espacio completo:
//           <input
//             type="number"
//             name="precio_espacio_completo"
//             id="numberInput3"
//             value={formState.precio_espacio_completo}
//             onChange={handleInputChange}
//             required
//             className="remove-arrow w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Dirección:
//           <input
//             type="text"
//             name="direccion"
//             value={formState.direccion}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//         <label>
//           Estado:
//           <select
//             name="estado"
//             value={formState.estado}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="" disabled>
//               Selecciona un estado
//             </option>
//             <option value="libre">Libre</option>
//             <option value="reservado">Reservado</option>
//           </select>
//         </label>
//         <label>
//           Fotos:
//           <input
//             type="file"
//             multiple
//             onChange={onPhotosChange}
//             // onChange={handlePhotosChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {imagePreview && <img src={imagePreview} alt="preview" />}
//         </label>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
//         >
//           {id ? "Actualizar" : "Crear"}
//         </button>
//       </div>
//     </form>
//   );
// };

// SpaceForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onPhotosChange: PropTypes.func.isRequired,
//   imagePreview: PropTypes.any,
// };

// export default SpaceForm; */
}
