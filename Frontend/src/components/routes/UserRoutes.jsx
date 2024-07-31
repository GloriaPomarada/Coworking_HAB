import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import MyBookings from "../pages/Bookings/MyBookings";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
}

export default UserRoutes;
