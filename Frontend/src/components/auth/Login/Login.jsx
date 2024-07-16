import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [messageType, setMessageType] = useState("");
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", formState);
      const { token, email } = response.data;
      login(token, email);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error en el inicio de sesión";
      setMessage(errorMessage);
      setMessageType("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Iniciar sesión
      </h1>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Login;
