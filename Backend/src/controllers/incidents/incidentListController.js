import * as incidentsModel from '../../models/incidents/index.js';

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(2); 
  return `${day}/${month}/${year}`;
};

const getIncidentsC = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role; 

    let incidents;

    if (userRole === 'admin') {
      incidents = await incidentsModel.getAllIncidents(); 
    } else {
      incidents = await incidentsModel.getIncidentsByUser(userId);
    }

    // Mensajes para cada incidencia.
    const incidentMessages = await Promise.all(
      incidents.map(async (incident) => {
        const messages = await incidentsModel.getMessagesForIncident(incident.id);

        return {
          ...incident,
          fecha_creacion: formatDate(incident.fecha_creacion), 
          messages: messages.map(msg => ({
            ...msg,
            fecha_creacion: formatDate(msg.fecha_creacion), 
          })),
        };
      })
    );

    res.json(incidentMessages);
  } catch (error) {
    console.error('Error al obtener incidencias y mensajes:', error);
    res.status(500).json({ mensaje: 'Error al obtener incidencias y mensajes' });
  }
};

export default getIncidentsC;
