import PropTypes from 'prop-types';
import RatingStars from '../Filter/RatingStars.jsx';

const SpaceCard = ({ space, apiUrl, goToSpace, handleEditClick, isAdmin }) => (
  <li className="p-4 bg-white rounded-lg shadow-lg flex flex-col">
    <div className="mb-4">
      <img
        src={space.imagen ? `${apiUrl}/${space.imagen}` : "https://via.placeholder.com/300x200"}
        alt={space.imagen}
        className="w-full h-48 rounded-lg object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Nombre</h3>
        <p className="text-gray-600">{space.nombre}</p>
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Descripción</h3>
        <p className="text-gray-600">{space.descripcion}</p>
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Categoría</h3>
        <p className="text-gray-600">{space.categorias_nombre}</p>
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Valoración</h3>
        <RatingStars rating={parseFloat(space.valoracion_media)} />
      </div>
    </div>
    <div className="mt-auto flex justify-center flex-col gap-2">
      <button
        onClick={() => goToSpace(space.id)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Ir
      </button>
      {isAdmin && (
        <button
          onClick={() => handleEditClick(space.id)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Editar
        </button>
      )}
    </div>
  </li>
);

SpaceCard.propTypes = {
  space: PropTypes.object.isRequired,
  apiUrl: PropTypes.string.isRequired,
  goToSpace: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default SpaceCard;
