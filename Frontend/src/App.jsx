import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/auth/Login/Login";
import CreateSpace from "./components/pages/CreateSpace.jsx";
import ValidacionUsuario from "./components/auth/Validate/Validation.jsx";

function App() {
  return (
    <>
      <h1>Coworking HAB</h1>
      <nav>
        <a href="/">Home</a>
        {" | "}
        <a href="/login">Login</a>
        {" | "}
        <a href="/create-space">Crear espacio</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
