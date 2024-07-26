import PropTypes from "prop-types";

const FilterForm = ({
  filters,
  categorias,
  equipamientos,
  handleInputChange,
  handleSubmit
}) => (
  <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
  >
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Búsqueda Avanzada
    </h1>
    
    <label>
      Capacidad:
      <input
        name="capacidad"
        type="number"
        value={filters.capacidad}
        onChange={handleInputChange}
        placeholder="Capacidad mínima"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>

    <label>
      Precio Desde:
      <input
        name="precioDesde"
        type="number"
        value={filters.precioDesde}
        onChange={handleInputChange}
        placeholder="Precio desde"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>

    <label>
      Precio Hasta:
      <input
        name="precioHasta"
        type="number"
        value={filters.precioHasta}
        onChange={handleInputChange}
        placeholder="Precio hasta"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>

    <label>
      Estado:
      <select
        name="estado"
        value={filters.estado}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione estado</option>
        <option value="libre">Libre</option>
        <option value="ocupado">Ocupado</option>
      </select>
    </label>

    <label>
      Valoración:
      <input
        name="valoracion_media"
        type="number"
        value={filters.valoracion_media}
        onChange={handleInputChange}
        placeholder="Valoración media mínima"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>

    <label>
      Categoría:
      <select
        name="categoria_nombre"
        value={filters.categoria_nombre}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.nombre}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </label>

    <label>
      Equipamiento:
      <select
        name="equipamiento"
        value={filters.equipamiento}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione equipamiento</option>
        {equipamientos.map((equip) => (
          <option key={equip.id} value={equip.nombre}>
            {equip.nombre}
          </option>
        ))}
      </select>
    </label>

    <label>
      Ordenar Por:
      <select
        name="orderBy"
        value={filters.orderBy}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione columna</option>
        <option value="precio_espacio_completo">Precio</option>
        <option value="capacidad">Capacidad</option>
        <option value="valoracion_media">Valoración</option>
      </select>
    </label>

    <label>
      Dirección de Ordenación:
      <select
        name="orderDirection"
        value={filters.orderDirection}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione dirección</option>
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>
      </select>
    </label>

    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3"
    >
      Filtrar
    </button>
  </form>
);

//*-> El coñazo de tener que validar las props...
FilterForm.propTypes = {
    filters: PropTypes.shape({
      capacidad: PropTypes.string,
      precioDesde: PropTypes.string,
      precioHasta: PropTypes.string,
      estado: PropTypes.string,
      valoracion_media: PropTypes.string,
      categoria_nombre: PropTypes.string,
      equipamiento: PropTypes.string,
      orderBy: PropTypes.string,
      orderDirection: PropTypes.string
    }).isRequired,
    categorias: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired
      })
    ).isRequired,
    equipamientos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired
      })
    ).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

export default FilterForm;
