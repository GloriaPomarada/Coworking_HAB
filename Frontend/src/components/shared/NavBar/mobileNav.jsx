

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

  const handleMenuClose = () => {
    setMenuOpen(false);
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
          <nav className="flex flex-col space-y-2 p-4" ref={menuRef}>
            {user ? (
              isAdmin ? (
                <>
                  <Link to="/space/create-space" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/crear_espacios_black.png"
                      alt="Crear espacios"
                      className="h-8 w-8 mr-2"
                    />
                    Crear espacios
                  </Link>
                  <Link to="/space/spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/logo_ver_espacios_black.png"
                      alt="Ver Espacios"
                      className="h-8 w-8 mr-2"
                    />
                    Espacios Disponibles
                  </Link>
                  <Link to="/space/filter-spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      title="Busqueda Avanzada"
                      src="../../../../public/logo_filtrar_espacios_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Busqueda Avanzada
                  </Link>
                  <Link to="/user/adminBookings" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/reserva_pendiente_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Reservas Pendientes
                  </Link>
                  <Link to="/user/my-bookings" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      title="Reservas"
                      src="../../../../public/ver_reservas_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Reservas
                  </Link>
                  <Link to="/user/incident-list" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/ver_incidencias_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    Incidencias
                  </Link>
                  <Link to="/user/profile" className="hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
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
                      src="../../../../public/logo_logout_black.png"
                      alt="Logout Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    Logout
                  </button>
                </>
              ) : (
                <>
                <Link to="/user/my-bookings" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      title="Reservas"
                      src="../../../../public/ver_reservas_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    <p className="pt-1">Mis Reservas</p>
                </Link>
                  <Link to="/user/incident-list" className=" flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/ver_incidencias_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-2"
                    />
                    <p className="pt-1">Incidencias</p>
                  </Link>
                  <Link to="/space/spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/logo_ver_espacios_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-3"
                    />
                    <p className="pt-1">Espacios Disponibles</p>
                  </Link>
                  <Link to="/space/filter-spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/logo_filtrar_espacios_black.png"
                      alt="Admin Icon"
                      className="h-8 w-8 mr-3"
                    />
                    <p className="pt-1">Busqueda Avanzada</p>
                  </Link>
                  <Link to="/user/profile" className=" flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                    <img
                      src="../../../../public/iconoPerfUser.png"
                      alt="Profile Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    <p className="pt-1">Perfil</p>
                  </Link>
                  <button
                    className="hover:bg-gray-200 p-2 rounded focus:outline-none"
                    onClick={() => {
                      logout();
                      handleMenuClose();
                    }}
                  >
                    <img
                      src="../../../../public/logo_logout_black.png"
                      alt="Logout Icon"
                      className="h-8 w-8 inline mr-2"
                    />
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                <Link to="/auth/login" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                  <img
                    src="../../../../public/iniciar-sesion.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Log in</p>
                </Link>
                <Link to="/auth/register" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                  <img
                    src="../../../../public/agregar.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Sign Up</p>
                </Link>
                <Link to="/space/spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                  <img
                    src="../../../../public/logo_ver_espacios_black.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Espacios Disponibles</p>
                </Link>
                <Link to="/space/filter-spaces" className="flex hover:bg-gray-200 p-2 rounded" onClick={handleMenuClose}>
                  <img
                    src="../../../../public/logo_filtrar_espacios_black.png"
                    alt="Admin Icon"
                    className="h-8 w-8 mr-3"
                  />
                  <p className="pt-1">Busqueda Avanzada </p>
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
