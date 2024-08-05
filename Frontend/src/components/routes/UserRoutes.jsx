import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import MyBookings from "../pages/Bookings/MyBookings.jsx";
import NewBooking from "../pages/Bookings/NewBooking.jsx";
import PendingBookings from "../pages/Bookings/PendingBookings.jsx";
import IncidentList from "../pages/Incidents/IncidentList.jsx";
import MessagesPage from "../pages/Incidents/MessagesPage.jsx";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/new-booking/:id" element={<NewBooking />} />
      <Route path="/adminBookings" element={<PendingBookings />} />
      <Route path="/incident-list" element={<IncidentList />} />
      <Route path="/incident-messages/:id" element={<MessagesPage />} />
    </Routes>
  );
}

export default UserRoutes;
