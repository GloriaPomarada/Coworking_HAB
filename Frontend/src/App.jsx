import NavBar from "./components/shared/NavBar/NavBar.jsx";
import Footer from "./components/shared/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer/>
    </main>
  );
}

export default App;
