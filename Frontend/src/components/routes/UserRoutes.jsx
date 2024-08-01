import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import MyBookings from "../pages/Bookings/MyBookings";
import NewBooking from "../pages/Bookings/NewBooking";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/new-booking/:id" element={<NewBooking />} />
    </Routes>
  );
}

export default UserRoutes;
