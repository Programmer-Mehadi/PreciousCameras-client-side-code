import Main from '../Layout/Main.js';
import Home from '../Pages/Home/Home/Home.js';
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
const { createBrowserRouter } = require("react-router-dom");

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>            
            },
            {
                path: '/login',
                element: <Login></Login>,                
            }
            ,
            {
                path: '/signup',
                element: <Signup></Signup>,                
            }
        ]
    }
])

export default routes;