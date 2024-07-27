import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import RecoverPass from "../auth/RecoverPass/RecoverPass";
import ResetPass from "../auth/ResetPass/ResetPass";
import Activate from "../auth/Activate/Activate";
import UpdatePass from "../auth/UpdatePass/UpdatePass";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activate/:registrationCode" element={<Activate />} />
      <Route path="/recoverPass" element={<RecoverPass />} />
      <Route path="/resetPass" element={<ResetPass />} />
      <Route path="/updatePass" element={<UpdatePass />} />
    </Routes>
  );
}

export default AuthRoutes;
