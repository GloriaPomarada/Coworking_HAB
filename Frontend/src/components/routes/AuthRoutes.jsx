import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import RecoverPass from "../auth/RecoverPass/RecoverPass";
import ResetPass from "../auth/ResetPass/ResetPass";
import Activate from "../auth/Activate/Activate";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activate/:registrationCode" element={<Activate />} />
      <Route path="/recoverPass" element={<RecoverPass />} />
      <Route path="/resetPass" element={<ResetPass />} />
    </Routes>
  );
}

export default AuthRoutes;
