import { createBrowserRouter } from "react-router-dom";
import App from '../Frontend/src/App.jsx'
import ErrorPage from "./src/components/pages/ErrorPage/ErrorPage.jsx";
import Login from "./src/components/auth/Login/Login.jsx";
import Register from "./src/components/auth/Register/Register.jsx";
import CreateSpace from "./src/components/pages/CreateSpace/CreateSpace.jsx";
import Activate from "./src/components/auth/Activate/Activate.jsx"
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
            }
        ]
    }
]);
export default router;