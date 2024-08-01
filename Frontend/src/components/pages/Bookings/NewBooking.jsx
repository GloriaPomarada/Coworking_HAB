import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm.jsx';

function NewBooking() {
  const { id } = useParams(); // Obtén el `spaceId` de la URL

  // Función que se ejecuta cuando la reserva se crea con éxito
  const handleBookingSuccess = () => {
    // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    console.log('Reserva creada con éxito!');
  };

  return (
    <div>
      <BookingForm spaceId={parseInt(id, 10)} onBookingSuccess={handleBookingSuccess} />
    </div>
  );
}

export default NewBooking;
