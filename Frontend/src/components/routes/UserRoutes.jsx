import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import MyBookings from "../pages/Bookings/MyBookings.jsx";
import NewBooking from "../pages/Bookings/NewBooking.jsx";
import PendingBookings from "../pages/Bookings/PendingBookings.jsx";
import IncidentList from "../pages/Incidents/IncidentList.jsx";
import MessagesPage from "../pages/Incidents/MessagesPage.jsx";
import ProtectedRoute from "../../utils/ProtectedRoute.jsx";

function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/profile"
        element={<ProtectedRoute element={<Profile />} />}
      />

      <Route
        path="/my-bookings"
        element={<ProtectedRoute element={<MyBookings />} />}
      />

      <Route
        path="/new-booking/:id"
        element={<ProtectedRoute element={<NewBooking />} />}
      />

      <Route
        path="/adminBookings"
        element={<ProtectedRoute element={<PendingBookings />} />}
      />

      <Route
        path="/incident-list"
        element={<ProtectedRoute element={<IncidentList />} />}
      />

      <Route
        path="/incident-messages/:id"
        element={<ProtectedRoute element={<MessagesPage />} />}
      />
    </Routes>
  );
}

export default UserRoutes;
