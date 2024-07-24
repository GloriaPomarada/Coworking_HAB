
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef, useEffect } from "react";

function NavBar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <img
            src="./public/LogoCoworking.jpg"
            alt="logo"
            className="h-8 w-8 mr-4"
          />
          <h1 className="text-xl font-bold">Coworking HAB</h1>
        </div>

        <nav className="flex space-x-4">
          {user ? (
            isAdmin ? (
              <>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
                <Link to="/space/create-space" className="hover:text-gray-400">
                  Crear Espacio
                </Link>
                <Link to="/space/spaces" className="hover:text-gray-400">
                  Ver Espacios
                </Link>
                <button
                  className="hover:text-gray-400 focus:outline-none"
                  onClick={() => {
                    navigate("/");
                    logout();
                  }}
                >
                  <img
                    src="./public/logo_logout.png"
                    alt=""
                    className="h-8 w-8 mr-4"
                  />
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
                <Link to="/space/spaces" className="hover:text-gray-400">
                  Ver Espacios
                </Link>
                <button
                  className="hover:text-gray-400 focus:outline-none"
                  onClick={logout}
                >
                  <img
                    src="./public/logo_logout.png"
                    alt=""
                    className="h-8 w-8 mr-4"
                  />
                </button>
              </>
            )
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                className="hover:text-gray-400 focus:outline-none"
                onClick={handleMenuToggle}
              >
                Account
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                  <Link
                    to="/auth/login"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
