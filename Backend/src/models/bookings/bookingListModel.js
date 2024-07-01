import pool from '../../config/connection.js';

const bookingListModel = async () => {
    const [bookings] = await pool.query('SELECT * FROM reservas');
    return bookings;
};

export default bookingListModel;