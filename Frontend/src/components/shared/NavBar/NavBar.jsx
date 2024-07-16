import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <img src="./public/logo_coworking.jpg" alt="logo" className="h-8 w-8 mr-4" />
          <h1 className="text-xl font-bold">Coworking HAB</h1>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/create-space" className="hover:text-gray-400">Crear Espacio</Link>
          <div className="relative group">
            <button className="hover:text-gray-400 focus:outline-none">Account</button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg hidden group-hover:block">
              <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">Log in</Link>
              <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">Sign Up</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;