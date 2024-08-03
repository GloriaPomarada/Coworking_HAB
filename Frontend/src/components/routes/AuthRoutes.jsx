import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import RecoverPass from "../auth/RecoverPass/RecoverPass";
import ResetPass from "../auth/ResetPass/ResetPass";
import Activate from "../auth/Activate/Activate";
import UpdatePass from "../auth/UpdatePass/UpdatePass";
import ProtectedRoute from "../utils/ProtectedRoute";
import Home from "../pages/Home/Home";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/activate/:registrationCode"
        element={<ProtectedRoute element={<Activate />} />}
      />
      <Route path="/recoverPass" element={<RecoverPass />} />
      <Route
        path="/resetPass"
        element={<ProtectedRoute element={<ResetPass />} />}
      />
      <Route
        path="/updatePass"
        element={<ProtectedRoute element={<UpdatePass />} />}
      />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
    </Routes>
  );
}

export default AuthRoutes;
