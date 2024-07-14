import useInput from "../hooks/UseInput.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import PropTypes from "prop-types";

const SpaceForm = ({ onSubmit }) => {
  const { isAdmin } = useAuth();
  const { value: nombre, bind: bindNombre, reset: resetNombre } = useInput("");
  const {
    value: descripcion,
    bind: bindDescripcion,
    reset: resetDescripcion,
  } = useInput("");
  const {
    value: categoria_id,
    bind: bindCategoria_id,
    reset: resetCategoria_id,
  } = useInput("");
  const {
    value: capacidad,
    bind: bindCapacidad,
    reset: resetCapacidad,
  } = useInput("");
  const {
    value: precio_por_persona,
    bind: bindPrecio_persona,
    reset: resetPrecio_persona,
  } = useInput("");
  const {
    value: precio_espacio_completo,
    bind: bindPrecio_completo,
    reset: resetPrecio_completo,
  } = useInput("");
  const {
    value: direccion,
    bind: bindDireccion,
    reset: resetDireccion,
  } = useInput("");
  const { value: estado, bind: bindEstado, reset: resetEstado } = useInput("");
  const {
    value: incidencias,
    bind: bindIncidencias,
    reset: resetIncidencias,
  } = useInput("");
  const { value: imagen, bind: bindImagen, reset: resetImagen } = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre: nombre,
      descripcion: descripcion,
      categoria_id: categoria_id,
      capacidad: capacidad,
      precio_por_persona: precio_por_persona,
      precio_espacio_completo: precio_espacio_completo,
      direccion: direccion,
      estado: estado,
      incidencias: incidencias,
      imagen: imagen,
    });
    resetForm();
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
    resetIncidencias();
    resetImagen();
  };

  if (!isAdmin) {
    return <p>No estás autorizado para acceder a esta página</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" {...bindNombre} required />
      </label>
      <label>
        Descripcion:
        <textarea {...bindDescripcion} required />
      </label>
      <label>
        Categoría:
        <input type="text" {...bindCategoria_id} required />
      </label>
      <label>
        Capacidad:
        <input type="number" {...bindCapacidad} required />
      </label>
      <label>
        Precio por persona:
        <input type="number" {...bindPrecio_persona} required />
      </label>
      <label>
        Precio espacio completo:
        <input type="number" {...bindPrecio_completo} required />
      </label>
      <label>
        Direccion:
        <input type="text" {...bindDireccion} required />
      </label>
      <label>
        Estado:
        <select {...bindEstado}>
          <option value="" disabled>
            Selecciona un estado
          </option>
          <option value="libre">Libre</option>
          <option value="reservado">Reservado</option>
        </select>
      </label>
      <label>
        Incidencias:
        <input type="text" {...bindIncidencias} />
      </label>
      <label>
        Imagen:
        <input type="file" {...bindImagen} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

SpaceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SpaceForm;
