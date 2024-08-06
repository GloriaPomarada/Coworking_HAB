import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return element;
};

export default ProtectedRoute;
