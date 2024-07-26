import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import Auth from "../utils/auth";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log({ user, isAuthenticated, isAdmin });
  // eslint-disable-next-line no-unused-vars
  // const [tokenExpiredMessage, setTokenExpiredMessage] = useState("");

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
      if (error.response && error.response.status === 401) {
        setTokenExpiredMessage(
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
        );
        logout();
      }
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
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLoading(false);
  };

  const loggedIn = () => Auth.isLoggedIn();

  return (
    <AuthContext.Provider
      value={{
        user,
        token: Auth.getToken(), // Ensure you get the token directly from Auth
        login,
        logout,
        loggedIn,
        isAuthenticated,
        loading,
        isAdmin,
        // setTokenExpiredMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
