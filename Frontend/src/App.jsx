import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/auth/Login/Login";
import CreateSpace from "./components/pages/CreateSpace.jsx";

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
      </Routes>
    </>
  );
}

export default App;
