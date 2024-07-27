import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [userReservations, setUserReservations] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/users/profile`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Datos recibidos:", response.data);
      setUserData(response.data.data.user);
      console.log("Actualizando userData:", response.data);

      // const reservationsResponse = await axios.get(`/api/reservations/user`, {
      //   headers: {
      //     Authorization: token,
      //   },
      // });

      //   setUserReservations(reservationsResponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        const token = localStorage.getItem("token");
        await axios.put("/api/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        fetchUserData();
      } catch (error) {
        console.error("Error al subir el avatar:", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (isLoading) return <div>Cargando...</div>;
  if (!userData) return <div>No se encontraron datos del usuario</div>;

  // Construimos la URL para acceder al avatar
  const avatarUrl = userData.avatar
    ? `http://localhost:3001/uploads/${userData.avatar}`
    : "/avatarDefault.png";

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <img
          //Pasamos el avatarUrl a la etiqueta img
          src={avatarUrl}
          alt={userData?.avatar}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Perfil de Usuario
      </h1>
      <div className="space-y-4">
        <p className="flex justify-between">
          <span className="font-semibold text-gray-700">
            Nombre de usuario:
          </span>
          <span className="text-gray-600">
            {userData?.username || "No disponible"}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">
            {userData?.email || "No disponible"}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-700">Rol:</span>
          <span className="text-gray-600">
            {userData?.role || "No disponible"}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-700">
            Fecha de creación:
          </span>
          <span className="text-gray-600">
            {userData?.createdAt || "No disponible"}
          </span>
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Reservas</h2>
        {userReservations.length > 0 ? (
          <ul className="space-y-2">
            {userReservations.map((reservation) => (
              <li key={reservation.id} className="text-gray-600">
                {reservation.date} - {reservation.service}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No tienes reservas activas.</p>
        )}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <Link to="/auth/recoverPass">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Cambiar Contraseña
            </button>
          </Link>
        </div>
        <div>
          <label
            htmlFor="avatar-upload"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Cambiar Avatar
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
