import NavBar from "./components/shared/NavBar/NavBar.jsx";
import Footer from "./components/shared/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
