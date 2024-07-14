import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import Auth from "../utils/auth.js";

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isAutenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/usuarios/profile", {
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: `Bearer ${token}`,
        },
      });
      const userProfile = response.data.data.user;
      setUser(userProfile);
      setisAuthenticated(true);
      setIsAdmin(userProfile.isAdmin);
    } catch (error) {
      console.log(error);
      // Auth.logout(); // opcional, paso de seguridad
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Auth.getToken();
    if (token) {
      fetchUser(token);
    }
  }, []);

  const login = async (token) => {
    Auth.login(token);
    await fetchUser(token);
    // setisAuthenticated(true);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setisAuthenticated(false);
    setIsAdmin(false);
    setLoading(false);
  };

  const loggedIn = () => {
    return Auth.isLoggedIn();
  };

  const updateuser = async (token) => {
    await fetchUser(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loggedIn,
        // eslint-disable-next-line no-undef
        isAutenticated,
        updateuser,
        loading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
