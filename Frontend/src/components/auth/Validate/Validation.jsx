import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../../shared/Notification/Notification";

function ValidacionUsuario() {
  const [codigo, setCodigo] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/usuarios/activate", { codigo });
      if (response.data.status === "ok") {
        setMessage("Usuario validado con éxito");
        setMessageType("success");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en la validación");
      setMessageType("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Validación de Usuario
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código de validación"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Validar
        </button>
      </form>
      <Notification
        message={message}
        messageType={messageType}
        className="mt-4"
      />
    </div>
  );
}

export default ValidacionUsuario;
