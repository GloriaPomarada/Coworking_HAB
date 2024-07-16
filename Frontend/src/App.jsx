import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register.jsx"
import CreateSpace from "./components/pages/CreateSpace.jsx";
import ValidacionUsuario from "./components/auth/Validate/Validation.jsx";
import NavBar from "./components/shared/NavBar/NavBar.jsx";

function App() {
  return (
    <>
      <h1>Coworking HAB</h1>
      <nav>
        <NavBar/>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/create-space" element={<CreateSpace />} />
        <Route
          path="/validate/:registrationCode"
          element={<ValidacionUsuario />}
        />
        <Route path="/activate" element={<ValidacionUsuario />} />
      </Routes>
    </>
  );
}

export default App;
