import { useState, useEffect, createContext, useContext } from "react";
import api from "../utils/axiosConfig.js";
import Auth from "../utils/auth.js";

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserProfile = async (token) => {
    try {
      const response = await api.get("/users/profile", {
        headers: { Authorization: token },
      });
      const userProfile = response.data;
      if (userProfile && typeof userProfile.isAdmin !== "undefined") {
        setIsAdmin(userProfile.isAdmin);
      } else {
        setIsAdmin(false); // O cualquier valor predeterminado que prefieras
      }
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
      fetchUserProfile(token);
      console.log("Token:", token);
    }
  }, []);

  const login = async (token) => {
    Auth.login(token);
    await fetchUserProfile(token);
    setUser((prevUser) => ({ ...prevUser, token }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLoading(false);
  };

  const loggedIn = () => {
    return Auth.isLoggedIn();
  };

  const updateuser = async (token) => {
    await fetchUserProfile(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token,
        login,
        logout,
        loggedIn,
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
