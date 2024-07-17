import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Validate from "../auth/Validate/Validation";


function AuthRouter() {
  return (
    <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/activate/:registrationCode" element={<Validate/>} /> 
    </Routes>
)
}

export default AuthRouter