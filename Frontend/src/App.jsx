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
