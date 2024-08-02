import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage.jsx";
import Home from "./components/pages/Home/Home.jsx";
import AuthRoutes from "./components/routes/AuthRoutes.jsx";
import SpacesRoutes from "./components/routes/SpacesRoutes.jsx";
import UserRoutes from "./components/routes/UserRoutes.jsx";
// import BookingForm from "./components/pages/Booking/BookingCreate.jsx";

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
      {
        path: "/user/*",
        element: <UserRoutes />,
      },
      // { path: "/booking/create/:id", element: <BookingForm /> },
    ],
  },
]);

export default router;
