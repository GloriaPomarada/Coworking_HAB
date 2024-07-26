import { useState, useEffect } from "react";
import axios from "axios";
import FilterForm from "../../shared/Filter/FilterForm.jsx";
import SpaceList from "../../shared/Filter/SpaceList.jsx";

const SpaceFilterPage = () => {
  const [filters, setFilters] = useState({
    capacidad: "",
    precioDesde: "",
    precioHasta: "",
    estado: "",
    valoracion_media: "",
    categoria_nombre: "",
    equipamiento: "",
    orderBy: "",
    orderDirection: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [espaciosFiltrados, setEspaciosFiltrados] = useState([]);
  const [equipamientos, setEquipamientos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategorias(response.data);
      } catch (error) {
        setError("Error al cargar categorías: " + error.message);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchEquipamientos = async () => {
      try {
        const response = await axios.get("/api/equipment");
        setEquipamientos(response.data);
      } catch (error) {
        setError("Error al cargar equipamientos: " + error.message);
      }
    };
    fetchEquipamientos();
  }, []);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/spaces/filters", {
        params: {
          ...filters,
          orderBy: filters.orderBy || 'id',
          orderDirection: filters.orderDirection || 'ASC'
        },
      });

      if (response.data && response.data.data) {
        setEspaciosFiltrados(response.data.data);
      } else {
        setError("Datos inesperados en la respuesta.");
      }
    } catch (error) {
      setError("Error al filtrar espacios: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FilterForm
        filters={filters}
        categorias={categorias}
        equipamientos={equipamientos}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {isLoading && <p>Cargando espacios...</p>}
      {error && <p className="error">{error}</p>}
      <SpaceList espaciosFiltrados={espaciosFiltrados} />
    </div>
  );
};

export default SpaceFilterPage;
