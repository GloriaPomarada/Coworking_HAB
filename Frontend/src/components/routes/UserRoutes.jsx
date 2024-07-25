import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";


function UserRoutes() {
  return (
    <Routes>
        <Route path="/profile" element={<Profile /> } />
    </Routes>
  )
}

export default UserRoutes