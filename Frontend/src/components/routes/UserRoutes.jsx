import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import MyBookings from "../pages/Bookings/MyBookings";
import NewBooking from "../pages/Bookings/NewBooking";
import PendingBookings from "../pages/Bookings/PendingBookings";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/new-booking/:id" element={<NewBooking />} />
      <Route path="/adminBookings" element={ <PendingBookings/> }/>
    </Routes>
  );
}

export default UserRoutes;
