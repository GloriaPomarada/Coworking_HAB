import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ValidacionUsuario() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();
  const { registrationCode } = useParams();

  useEffect(() => {
    const sendActivate = async () => {
      try {
        const response = await axios.put(
          "/api/users/activate/" + registrationCode
        );
        if (response.status === 200) {
          setMessage("Usuario validado correctamente");
          setMessageType("success");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        console.log(error);
        setMessage(
          error.response?.data?.message || "Error al validar el usuario"
        );
        setMessageType("error");
      }
    };

    sendActivate();
  }, [navigate, registrationCode]);

  return <div className={`message ${messageType}`}>{message}</div>;
}

export default ValidacionUsuario;
