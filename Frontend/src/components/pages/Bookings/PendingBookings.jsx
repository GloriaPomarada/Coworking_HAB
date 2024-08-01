
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PendingBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings/adminBookings`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.data && response.data.data) {
          setBookings(response.data.data);
          const initialRatings = {};
          response.data.data.forEach((booking) => {
            initialRatings[booking.id] = booking.valoracion || 0;
          });
        } else {
          console.error("Error en el formato de la data:", response.data);
          setError("Error en el formato de los datos recibidos.");
          toast.error("Error en el formato de los datos recibidos.");
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setError("No se pudo cargar la información de las reservas.");
        toast.error("No se pudo cargar la información de las reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [apiUrl, token]);

  const updateBookingStatus = async (espacioID, newStatus) => {
    try {
      await axios.post(
        `/api/bookings/reservation/${espacioID}/status`,
        { estado: newStatus },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(`Reserva actualizada a ${newStatus}`);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === espacioID ? { ...booking, estado: newStatus } : booking
        )
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error(`Error al actualizar la reserva: ${errorMessage}`);
      toast.error(`Error al actualizar la reserva: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">No hay reservas pendientes.</h1> 
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Reservas Pendientes</h2>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-full">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
              {booking.espacio_nombre}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Fecha de inicio: </span>
              {booking.fecha_inicio}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Fecha de fin: </span>
              {booking.fecha_fin}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Estado: </span> 
              {booking.estado}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Observaciones: </span> 
              {booking.observaciones}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Usuario: </span> 
              {booking.usuario_username}
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => updateBookingStatus(booking.id, "reservado")}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Aceptar
              </button>
              <button
                onClick={() => updateBookingStatus(booking.id, "cancelada")}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingBookings;

