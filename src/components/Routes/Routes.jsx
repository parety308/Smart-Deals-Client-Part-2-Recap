import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import Root from "../../Root/Root";
import AllProducts from "../AllProducts/AllProducts";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import MyBids from '../../MyBids/MyBids';
import MyProducts from "../MyProducts/MyProducts";
import CreateProducts from '../CreateProducts/CreateProducts'
import ProductDetails from "../ProductDetails/ProductDetails";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true, Component: Home
            },
            {
                path: '/allproducts',
                Component: AllProducts
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/mybids',
                element: <PrivateRoutes><MyBids /></PrivateRoutes>
            },
            {
                path: '/myproducts',
                element: <PrivateRoutes><MyProducts/>  </PrivateRoutes>
            },
            {
                path: '/createproducts',
                element: <PrivateRoutes><CreateProducts /></PrivateRoutes>
            }
            ,{
                path:'/productsdetails/:id',
                loader:({params})=>fetch(`http://localhost:3000/products/${params.id}`),
                element:<PrivateRoutes><ProductDetails/></PrivateRoutes>
            }

        ]

    }
]);