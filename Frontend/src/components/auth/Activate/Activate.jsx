import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Notification from "../../shared/Notification/Notification";
import axios from "axios";

function Activate() {
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { registrationCode } = useParams();

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

  return (
    <div>
      {!activationSuccess ? (
        <Notification message={message} messageType={messageType} />
      ) : (
        <>
          <h2>Cuenta activada con éxito!</h2>
          <h3>
            <Link to="/auth/login">Ingresa a tu cuenta</Link>
          </h3>
        </>
      )}
    </div>
  );
}

export default Activate;
