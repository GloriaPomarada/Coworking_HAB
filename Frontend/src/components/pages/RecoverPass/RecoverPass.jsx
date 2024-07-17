import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function RecoverPass() {
    const [credentials, setCredentials] = useState({
        email: "",
      })

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
            const resp = await axios.post('/api/users/password/recover', credentials);
            console.log(resp);
            setMessage("Email de Recuperación enviado , revisa tu correo")
            setTimeout(() => {
                navigate('/resetPass');
            }, 2000);
        } catch (error) {
            console.error("Error al recuperar Contraseña:", error);
            setMessage("Hubo un error al intentar recuperar la contraseña. Por favor, inténtalo de nuevo.");
        }
    }
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <h2 className="text-2xl font-bold mb-6">Recuperación de contraseña</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Introduce tu Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Email"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Recuperar Contraseña
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
   
  )
}

export default RecoverPass;