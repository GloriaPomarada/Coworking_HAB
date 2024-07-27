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
  const [categories, setCategories] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories", {
          headers: { Authorization: token },
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

      let spaceId;
      if (id) {
        console.log("Space ID:", id);
        await onSubmit(id, jsonFormData, token);
      } else {
        const response = await onSubmit(null, jsonFormData, token, photos, id);
        spaceId = response.data.data.id;
        console.log("Nuevo space ID:", spaceId);
      }

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
    console.log("Space ID en uploadPhotos:", spaceId);
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
