import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const SpaceForm = ({ onSubmit }) => {
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); // Se coge el token del contexto
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
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (id) {
      const fetchSpace = async () => {
        try {
          const response = await axios.get(`/api/spaces/${id}`, {
            headers: { Authorization: token },
          });
          const space = response.data;

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

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        throw new Error("Acceso denegado: solo administradores");
      }
      const jsonFormData = JSON.stringify(formState);

      let spaceId = id;
      if (id) {
        await onSubmit(id, jsonFormData, token);
      } else {
        const response = await onSubmit(null, jsonFormData, token, photos);
        console.log(token);
        spaceId = response.data.id;
      }

      // Upload photos separately
      await uploadPhotos(spaceId);

      resetForm();
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al enviar el formulario";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  const uploadPhotos = async (spaceId) => {
    if (photos.length === 0) return;

    const photoData = new FormData();
    photos.forEach((photo, index) => {
      photoData.append(`photo${index}`, photo);
    });

    try {
      await axios.post(`/api/spaces/${spaceId}/photos`, photoData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al subir las fotos";
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
    setPhotos([]);
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
          <input
            type="text"
            name="categoria_id"
            value={formState.categoria_id}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {photos.length > 0 && (
          <div>
            <p>Fotos seleccionadas:</p>
            <ul>
              {photos.map((photo, index) => (
                <li key={index}>{photo.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {id ? "Actualizar" : "Crear"}
        </button>
        {message && (
          <div
            className={`mt-4 p-4 rounded-md ${
              messageType === "error" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {message}
          </div>
        )}
      </div>
    </form>
  );
};

SpaceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SpaceForm;

// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import useInput from "../hooks/UseInput";
// import PropTypes from "prop-types";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const SpaceForm = ({ onSubmit }) => {
//   const { isAdmin } = useAuth();
//   const { id } = useParams();

//   const {
//     value: nombre,
//     bind: bindNombre,
//     setValue: setNombre,
//     reset: resetNombre,
//   } = useInput("");
//   const {
//     value: descripcion,
//     bind: bindDescripcion,
//     setValue: setDescripcion,
//     reset: resetDescripcion,
//   } = useInput("");
//   const {
//     value: categoria_id,
//     bind: bindCategoria_id,
//     setValue: setCategoria_id,
//     reset: resetCategoria_id,
//   } = useInput("");
//   const {
//     value: capacidad,
//     bind: bindCapacidad,
//     setValue: setCapacidad,
//     reset: resetCapacidad,
//   } = useInput("");
//   const {
//     value: precio_por_persona,
//     bind: bindPrecio_persona,
//     setValue: setPrecio_persona,
//     reset: resetPrecio_persona,
//   } = useInput("");
//   const {
//     value: precio_espacio_completo,
//     bind: bindPrecio_completo,
//     setValue: setPrecio_completo,
//     reset: resetPrecio_completo,
//   } = useInput("");
//   const {
//     value: direccion,
//     bind: bindDireccion,
//     setValue: setDireccion,
//     reset: resetDireccion,
//   } = useInput("");
//   const {
//     value: estado,
//     bind: bindEstado,
//     setValue: setEstado,
//     reset: resetEstado,
//   } = useInput("");

//   useEffect(() => {
//     if (id) {
//       const fetchSpace = async () => {
//         try {
//           const response = await axios.get(`/api/spaces/${id}`);
//           const space = response.data;

//           setNombre(space.nombre);
//           setDescripcion(space.descripcion);
//           setCategoria_id(space.categoria_id);
//           setCapacidad(space.capacidad);
//           setPrecio_persona(space.precio_por_persona);
//           setPrecio_completo(space.precio_espacio_completo);
//           setDireccion(space.direccion);
//           setEstado(space.estado);
//         } catch (error) {
//           if (error.response) {
//             console.error("Response error:", error.response.data);
//             console.error("Status:", error.response.status);
//             console.error("Headers:", error.response.headers);
//           } else if (error.request) {
//             console.error("Request error:", error.request);
//           } else {
//             console.error("Error message:", error.message);
//           }
//           console.error("Config:", error.config);
//         }
//       };

//       fetchSpace();
//     }
//   }, [
//     id,
//     setNombre,
//     setDescripcion,
//     setCategoria_id,
//     setCapacidad,
//     setPrecio_persona,
//     setPrecio_completo,
//     setDireccion,
//     setEstado,
//   ]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (!isAdmin) {
//         throw new Error("Acceso denegado: solo administradores");
//       }

//       const formData = new FormData();
//       formData.append("nombre", nombre);
//       formData.append("descripcion", descripcion);
//       formData.append("categoria_id", categoria_id);
//       formData.append("capacidad", capacidad);
//       formData.append("precio_por_persona", precio_por_persona);
//       formData.append("precio_espacio_completo", precio_espacio_completo);
//       formData.append("direccion", direccion);
//       formData.append("estado", estado);

//       await onSubmit(id, formData);

//       resetForm();
//     } catch (error) {
//       console.error("Error al enviar el formulario:", error);
//     }
//   };

//   const resetForm = () => {
//     resetNombre();
//     resetDescripcion();
//     resetCategoria_id();
//     resetCapacidad();
//     resetPrecio_persona();
//     resetPrecio_completo();
//     resetDireccion();
//     resetEstado();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
//     >
//       <label>
//         Nombre:
//         <input
//           type="text"
//           {...bindNombre}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </label>
//       <label>
//         Descripción:
//         <textarea
//           {...bindDescripcion}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </label>
//       <label>
//         Categoría:
//         <input
//           type="text"
//           {...bindCategoria_id}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </label>
//       <label>
//         Capacidad:
//         <input
//           type="number"
//           {...bindCapacidad}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </label>
//       <label>
//         Precio por persona:
//         <input
//           type="number"
//           {...bindPrecio_persona}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </label>
//       <label>
//         Precio espacio completo:
//         <input
//           type="number"
//           {...bindPrecio_completo}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </label>
//       <label>
//         Dirección:
//         <input
//           type="text"
//           {...bindDireccion}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </label>
//       <label>
//         Estado:
//         <select
//           {...bindEstado}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="" disabled>
//             Selecciona un estado
//           </option>
//           <option value="libre">Libre</option>
//           <option value="reservado">Reservado</option>
//         </select>
//       </label>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
//       >
//         {id ? "Actualizar" : "Crear"}
//       </button>
//     </form>
//   );
// };

// SpaceForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default SpaceForm;
