import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Validate from "../auth/Validate/Validation";
import RecoverPass from "../auth/RecoverPass/RecoverPass";
import ResetPass from "../auth/ResetPass/ResetPass";


function AuthRoutes() {
  return (
    <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/activate/:registrationCode" element={<Validate/>} /> 
        <Route path="/recoverPass" element={<RecoverPass/>} />
        <Route path="/resetPass" element={<ResetPass/>} />
    </Routes>
)
}

export default AuthRoutes