import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import Auth from "../utils/auth.js";

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserProfile = async (token) => {
    try {
      console.log("Token:", token);
      const response = await axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userProfile = response.data.data.token;
      setUser((prevUser) => ({ ...prevUser, ...userProfile }));
      setIsAuthenticated(true);
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
