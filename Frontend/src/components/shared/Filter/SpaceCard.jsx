import PropTypes from "prop-types";

const SpaceCard = ({ espacio }) => {
  return (
    
    <div className="bg-white rounded-lg shadow-md p-6 m-4 ">
      <h3 className="text-xl font-bold mb-2 text-gray-800">{espacio.nombre}</h3>
      <p className="text-gray-600 mb-4">{espacio.descripcion}</p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Categoría:</span>{" "}
        {espacio.categorias_nombre}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Capacidad:</span> {espacio.capacidad}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Precio espacio completo:</span> $
        {espacio.precio_espacio_completo}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Estado:</span> {espacio.estado}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Valoración media:</span>{" "}
        {espacio.valoracion_media}
      </p>
    </div>
  );
};

SpaceCard.propTypes = {
  espacio: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    categorias_nombre: PropTypes.string.isRequired,
    capacidad: PropTypes.number.isRequired,
    precio_espacio_completo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    estado: PropTypes.string.isRequired,
    valoracion_media: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
};

export default SpaceCard;
