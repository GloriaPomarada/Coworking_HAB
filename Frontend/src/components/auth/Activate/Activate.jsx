import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../shared/Notification/Notification";
import axios from "axios";

function Activate() {
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { registrationCode } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const activateAccount = async () => {
      if (registrationCode) {
        try {
          const response = await axios.put(
            `/api/users/activate/${registrationCode}`
          );
          if (response.data.status === "ok") {
            setActivationSuccess(true);
            setMessage("Cuenta activada con éxito");
            setMessageType("success");
          }
        } catch (error) {
          setMessage(
            error.response?.data?.message || "Error durante la activación"
          );
          setMessageType("error");
        }
      }
    };
    activateAccount();
  }, [registrationCode]);

  setTimeout(() => {
    navigate("/auth/login");
  }, 3000);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-200">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: "url('../../../../public/fondo_oficina.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-3xl w-full bg-white bg-opacity-90 shadow-lg rounded-lg p-10">
        {!activationSuccess ? (
          <Notification message={message} messageType={messageType} />
        ) : (
          <>
            <h2 className="text-4xl font-bold text-green-600 mb-6 text-center">
              ¡Cuenta activada con éxito!
            </h2>
            <h3 className="text-2xl text-gray-700 mb-4 text-center">
              Redirigiendo a Iniciar Sesion...
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Activate;
