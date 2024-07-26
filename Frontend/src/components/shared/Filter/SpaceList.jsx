import PropTypes from "prop-types";
import SpaceCard from "./SpaceCard.jsx";

const SpaceList = ({ espaciosFiltrados }) => (
  <div className="espacios-grid mt-10">
    <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
      Resultados de la búsqueda
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2 w-4/5 md:w-full mx-auto">
      {espaciosFiltrados.map((espacio) => (
        <SpaceCard key={espacio.id} espacio={espacio} />
      ))}
    </div>
  </div>
);

SpaceList.propTypes = {
    espaciosFiltrados: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired
  };

export default SpaceList;
