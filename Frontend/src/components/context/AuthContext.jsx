/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import Auth from "../utils/auth";

//*-> Creando el contexto (Estado Global).
const AuthContext = createContext();

//*-> Proveedor de Estado Global.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get("/api/users/profile", {
        headers: { Authorization: token },
      });

      const userProfile = response.data.data.user;
      setUser(userProfile);
      setIsAuthenticated(true);
      setIsAdmin(userProfile.role === "admin");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Auth.getToken();
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const login = async (token) => {
    Auth.login(token);
    await fetchUserProfile(token);
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

  const updateUser = async (token) => {
    await fetchUserProfile(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: Auth.getToken(), 
        login,
        logout,
        loggedIn,
        isAuthenticated,
        updateUser,
        loading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
