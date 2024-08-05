import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewMessage from "./NewMessaje.jsx";

const MessagesPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/incidents/messages/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setMessages(response.data);
        toast.success("Mensajes cargados correctamente");
        setLoading(false);
      } catch (err) {
        toast.error("Hubo un error al obtener los mensajes");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [id, token]);

  const handleNewMessageClick = () => {
    setShowNewMessage(!showNewMessage);
  };

  const handleNewMessageSent = async () => {
    setShowNewMessage(false);
    try {
      const response = await axios.get(`/api/incidents/messages/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setMessages(response.data);
      toast.success("Nuevo mensaje enviado correctamente");
    } catch (err) {
      console.error("Error al obtener los mensajes después de enviar uno nuevo:", err);
      toast.error("Hubo un error al actualizar los mensajes");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando mensajes...</div>;
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Mensajes de Incidencia
      </h2>
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl relative">
        {messages.length > 0 ? (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li
                key={message.mensaje_id}
                className="p-4 border-b border-gray-200 bg-white rounded shadow-sm"
              >
                <p className="text-center font-bold">{message.espacio_nombre}</p>
                <p>
                  <strong>Fecha:</strong> {message.fecha_creacion} {message.hora_creacion}
                </p>
                <p>
                  <strong>Mensaje:</strong> {message.mensaje}
                </p>
                <p>
                  <strong>Autor:</strong> {message.username}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div>No hay mensajes para esta incidencia.</div>
        )}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleNewMessageClick}
            className={`px-4 py-2 text-white rounded ${showNewMessage ? 'bg-gray-400' : 'bg-blue-500'}`}
          >
            {showNewMessage ? "Ocultar " : "Nuevo Mensaje"}
          </button>
        </div>
        {showNewMessage && (
          <div className="fixed bottom-16 right-6 w-full max-w-lg p-4 bg-white shadow-lg rounded">
            <NewMessage incidentId={id} onMessageSent={handleNewMessageSent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
