
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef, useEffect } from "react";

function MobileNav() {
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

  // eslint-disable-next-line no-unused-vars
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center ml-auto">
      {/* Button for mobile menu */}
      <button
        className="sm:hidden text-white focus:outline-none"
        onClick={handleMenuToggle}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white text-black shadow-lg">
          <nav className="flex flex-col space-y-2 p-4">
            {user ? (
              isAdmin ? (
                <>
                  <Link to="/space/create-space" className="hover:bg-gray-200 p-2 rounded">
                    Crear Espacio
                  </Link>
                  <Link to="/space/spaces" className="hover:bg-gray-200 p-2 rounded">
                    Ver Espacios
                  </Link>
                  <Link to="/user/profile" className="hover:bg-gray-200 p-2 rounded">
                    <img
                      src="../../../../public/iconoPerfUser.png"
                      alt="Profile Icon"
                      className="h-7 w-7 inline mr-2"
                    />
                    Perfil
                  </Link>
                  <button
                    className="hover:bg-gray-200 p-2 rounded focus:outline-none"
                    onClick={() => {
                      navigate("/");
                      logout();
                    }}
                  >
                    <img
                      src="../../../../public/logo_logout.png"
                      alt="Logout Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/space/spaces" className="hover:bg-gray-200 p-2 rounded">
                    Ver Espacios
                  </Link>
                  <Link to="/user/profile" className="hover:bg-gray-200 p-2 rounded">
                    <img
                      src="../../../../public/iconoPerfUser.png"
                      alt="Profile Icon"
                      className="h-7 w-7 inline mr-2"
                    />
                    Perfil
                  </Link>
                  <button
                    className="hover:bg-gray-200 p-2 rounded focus:outline-none"
                    onClick={logout}
                  >
                    <img
                      src="../../../../public/logo_logout.png"
                      alt="Logout Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                <Link to="/auth/login" className="hover:bg-gray-200 p-2 rounded">
                  Log in
                </Link>
                <Link to="/auth/register" className="hover:bg-gray-200 p-2 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
