import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.data && response.data.data) {
          const sortedBookings = response.data.data.sort((a, b) => b.id - a.id);
          setBookings(sortedBookings);
          const initialRatings = {};
          sortedBookings.forEach((booking) => {
            initialRatings[booking.id] = booking.valoracion || 0;
          });
          setRatings(initialRatings);
        } else {
          console.error("Error en el formato de la data:", response.data);
          toast.error("Error en el formato de los datos recibidos.");
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        toast.error("No se pudo cargar la información de las reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleVote = async (bookingId, value) => {
    if (!token || !userId) {
      toast.error("Usuario no autenticado.");
      return;
    }

    try {
      await axios.post(
        `/api/ratings/create`,
        {
          value: value,
          reserva_id: bookingId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Valoración enviada correctamente");
      setRatings((prevRatings) => ({
        ...prevRatings,
        [bookingId]: value,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error al enviar la valoración:", errorMessage);
      toast.error(` ${errorMessage}`);
    }
  };

  const handleCreateIncident = (bookingId, espacioId) => {
    navigate('/space/new-incident', {
      state: { bookingId, espacioId }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Cargando...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        No tienes reservas.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Mis Reservas</h2>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-full">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 sm:mb-0">
                {booking.espacio_nombre}
              </h3>
              {booking.espacio_foto_name && (
                <img
                  src={`${import.meta.env.VITE_API_URL}/${booking.espacio_foto_name}`} 
                  alt="Espacio"
                  className="w-full max-w-xs h-32 object-cover rounded-lg sm:ml-4"
                />
              )}
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Fecha de inicio: </span>
              {booking.fecha_inicio}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Fecha de fin:</span>{" "}
              {booking.fecha_fin}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Estado:</span> {booking.estado}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Observaciones:</span>{" "}
              {booking.observaciones}
            </p>
            
            <div className="flex flex-col items-center mt-4">
              <button
                onClick={() => handleCreateIncident(booking.id, booking.espacio_id)}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Crear Nueva Incidencia
              </button>
              {ratings[booking.id] === 0 ? (
                <>
                  <span className="text-center font-semibold mb-2">
                    Valora tu experiencia
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        onClick={() => handleVote(booking.id, value)}
                        className={`cursor-pointer mx-1 ${
                          ratings[booking.id] >= value
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        size={24}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <span className="text-center font-semibold mb-2">
                    Tu valoración ha sido
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        className={`mx-1 ${
                          ratings[booking.id] >= value
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        size={24}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
