import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const NewMessage = ({ incidentId, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/incidents/postmessage`, {
        incidencia_id: incidentId,
        mensaje: message,
         
      }, {
        headers: {
          Authorization: token,
        },
      });
      setMessage('');
      onMessageSent(); 
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Escribe tu mensaje aquí..."
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500  hover:bg-blue-700 text-white rounded">
        Enviar Mensaje
      </button>
    </form>
  );
};

NewMessage.propTypes = {
  incidentId: PropTypes.string.isRequired,
  onMessageSent: PropTypes.func.isRequired,
};

export default NewMessage;
