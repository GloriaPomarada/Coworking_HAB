import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function UpdatePassword() {
  const { token } = useAuth();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");

      const payload = {
        userId: userId,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      };

      const resp = await axios.post("/api/users/password/update", payload, {
        headers: {
          Authorization: token,
        },
      });
      console.log(resp);
      setMessage("Contraseña actualizada con éxito");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setMessage(
        "Hubo un error al actualizar la contraseña. Inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <h2 className="text-2xl font-bold mb-6">Actualizar Contraseña</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700">
            Contraseña Anterior
          </label>
          <input
            type="password"
            name="oldPassword"
            value={passwords.oldPassword}
            placeholder="Introduce tu contraseña anterior"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-gray-700">
            Nueva Contraseña
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            placeholder="Introduce nueva contraseña"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Actualizar Contraseña
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}

export default UpdatePassword;
