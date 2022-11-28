import DashboardLayout from '../Layout/DashboardLayout.js';
import Main from '../Layout/Main.js';
import Blogs from '../Pages/Blogs/Blogs.js';
import CategoryProduct from '../Pages/CategoryProduct/CategoryProduct.js';
import AddProduct from '../Pages/Dashboard/AddProduct/AddProduct.js';
import AllBuyers from '../Pages/Dashboard/AllBuyers/AllBuyers.js';
import AllSellers from '../Pages/Dashboard/AllSellers/AllSellers.js';
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard.js';
import MyOrders from '../Pages/Dashboard/MyOrders/MyOrders.js';
import MyProducts from '../Pages/Dashboard/MyProducts/MyProducts.js';
import Payment from '../Pages/Dashboard/Payment/Payment.js';
import ReportedItems from '../Pages/Dashboard/ReportedItems/ReportedItems.js';
import ErrorPage from '../Pages/ErrorPage/ErrorPage.js';
import Home from '../Pages/Home/Home/Home.js';
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from './AdminRoute.js';
import BuyerRoute from './BuyerRoute.js';
import PaymentRoute from './PaymentRoute.js';
import PrivateRoutes from './PrivateRoutes.js';
import SellerRoute from './SellerRoute.js';
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
                path: '/blogs',
                element: <Blogs></Blogs>,
            }
            ,
            {
                path: '/signup',
                element: <Signup></Signup>,
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`${process.env.REACT_APP_server_api}category/${params.id}`),
                element: <PrivateRoutes><CategoryProduct></CategoryProduct></PrivateRoutes>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute> <AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`, {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `barer ${localStorage.getItem('accessToken')}`
                    }
                }),
                element: <PaymentRoute><Payment></Payment></PaymentRoute>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default routes;