import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; // Importa la URL base desde las variables de entorno

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
        await axios.put(`/api/users/avatar`, formData, {
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

  const avatarUrl = userData.avatar
    ? `${apiUrl}/${userData.avatar}`
    : "/avatarDefault.png";

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src={avatarUrl}
            alt={userData?.avatar || "Avatar"}
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
        <div className="mt-6 flex justify-center space-x-4">
          <div>
            <button
              onClick={() => navigate("/user/my-bookings")}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Mis Reservas
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/auth/updatePass")}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Cambiar Contraseña
            </button>
          </div>
          <div>
            <label
              htmlFor="avatar-upload"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300 text-center"
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
    </div>
  );
};

export default Profile;
