import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm.jsx';

function NewBooking() {
  const { id } = useParams();
  const navigate = useNavigate(); 

  // Función que se ejecuta cuando la reserva se crea con éxito.
  const handleBookingSuccess = () => {
    navigate('/user/my-bookings');
    console.log('Reserva creada con éxito!');
  };

  return (
    <div>
      <BookingForm spaceId={parseInt(id, 10)} onBookingSuccess={handleBookingSuccess} />
    </div>
  );
}

export default NewBooking;
