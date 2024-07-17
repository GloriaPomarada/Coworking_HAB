import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import ErrorPage from "./components/pages/ErrorPage/ErrorPage.jsx";
import Login from "./components/auth/Login/Login.jsx";
import Register from "./components/auth/Register/Register.jsx";
import CreateSpace from "./components/pages/CreateSpace/CreateSpace.jsx";
import Activate from "./components/auth/Activate/Activate.jsx"
import RecoverPass from "./components/pages/RecoverPass/RecoverPass.jsx";
import ResetPass from "./components/pages/ResetPass/ResetPass.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/create-space",
                element:<CreateSpace/>
            },
            {
                path:"/activate/*",
                element:<Activate/>
            },
            {
                path:"/recoverPass",
                element:<RecoverPass/>
            },
            {
                path:"/resetPass",
                element:<ResetPass/>
            }
        ]
    }
]);
export default router;