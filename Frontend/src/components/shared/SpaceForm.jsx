import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useInput from "../hooks/UseInput";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SpaceForm = ({ onSubmit }) => {
  const { isAdmin } = useAuth();
  const { id } = useParams();

  const {
    value: nombre,
    bind: bindNombre,
    setValue: setNombre,
    reset: resetNombre,
  } = useInput("");
  const {
    value: descripcion,
    bind: bindDescripcion,
    setValue: setDescripcion,
    reset: resetDescripcion,
  } = useInput("");
  const {
    value: categoria_id,
    bind: bindCategoria_id,
    setValue: setCategoria_id,
    reset: resetCategoria_id,
  } = useInput("");
  const {
    value: capacidad,
    bind: bindCapacidad,
    setValue: setCapacidad,
    reset: resetCapacidad,
  } = useInput("");
  const {
    value: precio_por_persona,
    bind: bindPrecio_persona,
    setValue: setPrecio_persona,
    reset: resetPrecio_persona,
  } = useInput("");
  const {
    value: precio_espacio_completo,
    bind: bindPrecio_completo,
    setValue: setPrecio_completo,
    reset: resetPrecio_completo,
  } = useInput("");
  const {
    value: direccion,
    bind: bindDireccion,
    setValue: setDireccion,
    reset: resetDireccion,
  } = useInput("");
  const {
    value: estado,
    bind: bindEstado,
    setValue: setEstado,
    reset: resetEstado,
  } = useInput("");

  useEffect(() => {
    if (id) {
      const fetchSpace = async () => {
        try {
          const response = await axios.get(`/api/spaces/${id}`);
          const space = response.data;

          setNombre(space.nombre);
          setDescripcion(space.descripcion);
          setCategoria_id(space.categoria_id);
          setCapacidad(space.capacidad);
          setPrecio_persona(space.precio_por_persona);
          setPrecio_completo(space.precio_espacio_completo);
          setDireccion(space.direccion);
          setEstado(space.estado);
        } catch (error) {
          if (error.response) {
            console.error("Response error:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request error:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
          console.error("Config:", error.config);
        }
      };

      fetchSpace();
    }
  }, [
    id,
    setNombre,
    setDescripcion,
    setCategoria_id,
    setCapacidad,
    setPrecio_persona,
    setPrecio_completo,
    setDireccion,
    setEstado,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isAdmin) {
        throw new Error("Acceso denegado: solo administradores");
      }

      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("categoria_id", categoria_id);
      formData.append("capacidad", capacidad);
      formData.append("precio_por_persona", precio_por_persona);
      formData.append("precio_espacio_completo", precio_espacio_completo);
      formData.append("direccion", direccion);
      formData.append("estado", estado);

      await onSubmit(id, formData);

      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    resetNombre();
    resetDescripcion();
    resetCategoria_id();
    resetCapacidad();
    resetPrecio_persona();
    resetPrecio_completo();
    resetDireccion();
    resetEstado();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <label>
        Nombre:
        <input
          type="text"
          {...bindNombre}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label>
        Descripción:
        <textarea
          {...bindDescripcion}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label>
        Categoría:
        <input
          type="text"
          {...bindCategoria_id}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label>
        Capacidad:
        <input
          type="number"
          {...bindCapacidad}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label>
        Precio por persona:
        <input
          type="number"
          {...bindPrecio_persona}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label>
        Precio espacio completo:
        <input
          type="number"
          {...bindPrecio_completo}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label>
        Dirección:
        <input
          type="text"
          {...bindDireccion}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label>
        Estado:
        <select
          {...bindEstado}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Selecciona un estado
          </option>
          <option value="libre">Libre</option>
          <option value="reservado">Reservado</option>
        </select>
      </label>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        {id ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

SpaceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SpaceForm;
