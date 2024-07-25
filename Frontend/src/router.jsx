import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage.jsx";
import Home from "./components/pages/Home/Home.jsx";
import AuthRoutes from "./components/routes/AuthRoutes.jsx";
import SpacesRoutes from "./components/routes/SpacesRoutes.jsx";
import Activate from "./components/auth/Activate/Activate.jsx";
import Login from "./components/auth/Login/Login.jsx";
import Profile from "./components/pages/Profile/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth/*",
        element: <AuthRoutes />,
      },
      {
        path: "/space/*",
        element: <SpacesRoutes />,
      },
      {
        path: "/home",
        element: <Home />,
      },

      { path: "/activate/:registrationCode", element: <Activate /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);
export default router;
