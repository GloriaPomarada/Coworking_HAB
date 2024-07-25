// import { Route, Routes } from "react-router-dom";
// import Home from "./components/pages/Home/Home";
// import Login from "./components/auth/Login/Login";
// import Register from "./components/auth/Register/Register.jsx";
// import CreateSpace from "./components/pages/CreateSpace.jsx";
// import ValidacionUsuario from "./components/auth/Validate/Validation.jsx";

import NavBar from "./components/shared/NavBar/NavBar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;
