import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./components/context/AuthContext.jsx";
// import Validation from "./components/auth/Activate/Activate.jsx";

import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
