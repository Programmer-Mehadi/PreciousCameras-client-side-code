import DashboardLayout from '../Layout/DashboardLayout.js';
import Main from '../Layout/Main.js';
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard.js';
import MyOrders from '../Pages/Dashboard/MyOrders/MyOrders.js';
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
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myorders',
                element:<MyOrders></MyOrders>
            }
        ]
    }
])

export default routes;