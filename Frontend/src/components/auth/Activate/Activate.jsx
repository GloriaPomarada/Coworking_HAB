import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Notification from "../../shared/Notification/Notification";
import axios from "axios";

function Activate() {
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageType, setMessageType] = useState(false);
  const { registrationCode } = useParams();

  useEffect(() => {
    const activateAccount = async () => {
      if (registrationCode) {
        console.log(registrationCode);
        try {
          const response = await axios.put(
            `/api/usuarios/active/${registrationCode}`
          );
          if (response.data.status === "ok") {
            setActivationSuccess(true);
            setMessageType(response.data);
          }
        } catch (error) {
          setMessage(
            error.response.data.message || "Error durante la activación"
          );
          setMessageType("error");
        }
      }
    };
    activateAccount();
  }, [registrationCode]);

  if (!activationSuccess) {
    return <Notification message={message} messageType={messageType} />;
  }

  return (
    <div>
      <h2>Cuent activada con éxito!</h2>
      <h3>
        <Link to="/auth/login">Ingresa a tu cuenta!</Link>{" "}
      </h3>
    </div>
  );
}

export default Activate;
