import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import RecoverPass from "../auth/RecoverPass/RecoverPass";
import ResetPass from "../auth/ResetPass/ResetPass";
import Activate from "../auth/Activate/Activate.jsx";
import UpdatePass from "../auth/UpdatePass/UpdatePass";
import ProtectedRoute from "../../utils/ProtectedRoute.jsx";
import Home from "../pages/Home/Home";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activate" element={<Activate />} />
      <Route path="/recoverPass" element={<RecoverPass />} />
      <Route path="/resetPass" element={<ResetPass />} />
      <Route
        path="/updatePass"
        element={<ProtectedRoute element={<UpdatePass />} />}
      />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
    </Routes>
  );
}

export default AuthRoutes;
