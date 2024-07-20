import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Registrando Usuario...");
      const resp = await axios.post('/api/users/register', credentials);
      console.log(resp);
      setMessage("Registro exitoso. Revise su correo para la activacion. Redirigiendo a la página de inicio de sesión...");
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000); 
    } catch (error) {
      console.error("Error registrando usuario:", error);
      setMessage("Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Registro Usuario</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Usuario</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Ingresa tu usuario"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Correo</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Ingresa tu correo"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Registrar
        </button>
        <p className="mt-4 text-center text-gray-700">¿Ya tienes una cuenta? <Link className="text-blue-800 underline" to="/auth/login">Inicia Sesion</Link></p>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}

export default Register;
