import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useRef, useEffect } from "react";

function DesktopNav() {
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
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          window.removeEventListener("scroll", handleScroll);
        };
      }, [])
  
  
  return (
<div className="flex items-center space-x-4">
         
         {/* Desktop navigation */}
         <nav className="hidden sm:flex space-x-4">
           {user ? (
             isAdmin ? (
               <>
                 {/* <Link to="/space/create-space" className="hover:text-gray-400">
                   Crear Espacio
                 </Link>
                 <Link to="/space/spaces" className="hover:text-gray-400">
                   Ver Espacios
                 </Link> */}
                 {/*  */}
                 <div className="relative" ref={menuRef}>
                   <button
                     className="hover:text-gray-400 focus:outline-none"
                     onClick={handleMenuToggle}
                     >
                         Espacios
                   </button>
                   {menuOpen && (
                     <div className="absolute right-0 mt-4 w-48 bg-white text-black rounded-md shadow-lg">
                       <Link
                         to="/space/create-space"
                         className="block px-4 py-2 hover:bg-gray-200"
                       >
                         Crear espacios
                       </Link>
                       <Link
                         to="/space/spaces"
                         className="block px-4 py-2 hover:bg-gray-200"
                       >
                         Ver Espacios
                       </Link>
                 </div>
               )}
                 </div>
                 <Link to="/user/profile" className="hover:text-gray-400 focus:outline-none">
                   <img
                     src="../../../../public/iconoPerfUser.png"
                     alt="Profile Icon"
                     className="h-7 w-7"
                   />
                 </Link>
                 <button
                   className="hover:text-gray-400 focus:outline-none"
                   onClick={() => {
                     navigate("/");
                     logout();
                   }}
                 >
                   <img
                     src="../../../../public/logo_logout.png"
                     alt="Logout Icon"
                     className="h-8 w-8"
                   />
                 </button>
               </>
             ) : (
               <>
                 <Link to="/space/spaces" className="hover:text-gray-400">
                   Ver Espacios
                 </Link>
                 <Link to="/user/profile" className="hover:text-gray-400 focus:outline-none">
                   <img
                     src="../../../../public/iconoPerfUser.png"
                     alt="Profile Icon"
                     className="h-7 w-7"
                   />
                 </Link>
                 <button
                   className="hover:text-gray-400 focus:outline-none"
                   onClick={logout}
                 >
                   <img
                     src="../../../../public/logo_logout.png"
                     alt="Logout Icon"
                     className="h-8 w-8"
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
       </div>  )
}

export default DesktopNav