import { createBrowserRouter } from "react-router-dom";
import { ROUTER } from "../utils/urls";
import Dashboard from "../pages/admin/dashboard";
import Login from "../pages/login";
import Register from "../pages/register";
import User from "../pages/admin/user";
import NotFound from "../pages/admin/notfound";
import Brand from "../pages/admin/brand";
import Category from "../pages/admin/category";
import AdminLayout from "../layout/admin.layout";
import Product from "../pages/admin/product";
import UserLayout from "../layout/user.layout";
import Home from "../pages/user/home";
import Detail from "../pages/user/detail";
import OrderConfirmation from "../pages/user/orderConfirmation"
import Cart from "../pages/user/cart";
import Order from "../pages/user/order";
import Slide from "../pages/admin/slide";
import Shop from "../pages/user/shop";
import Search from "../pages/user/search";
import SalleBill from "../pages/admin/sallebill";


const router = createBrowserRouter([
    {
        element: <AdminLayout/>,
        children: [
            {
                path: ROUTER.ADMIN.DASHBOARD,
                element: <Dashboard/>,
            },
            {
                path: ROUTER.ADMIN.BRAND,
                element: <Brand/>,
            },
            {
                path: ROUTER.ADMIN.CATEGORY,
                element: <Category/>,
            },
            {
                path: ROUTER.ADMIN.PRODUCT,
                element: <Product />,
            },
            {
                path: ROUTER.ADMIN.SLIDE,
                element: <Slide />,
            },
            {
                path: ROUTER.ADMIN.SALE,
                element: <SalleBill/>,
            },
            {
                path: ROUTER.ADMIN.USER,
                element: <User/>,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>,
    },
    {
        path: ROUTER.ADMIN.LOGIN,
        element: <Login/>,
    },
    {
        path: ROUTER.ADMIN.REGISTER,
        element: <Register/>,
    },
    {
        element: <UserLayout/>,
        children: [
            {
                path: ROUTER.USER.HOME,
                element: <Home/>,
            },
            {
                path: ROUTER.USER.DETAIL,
                element: <Detail/>,
            },
            {
                path: ROUTER.USER.SHOP,
                element: <Shop/>,
            },
            {
                path: ROUTER.USER.SEARCH,
                element: <Search/>,
            },
            {
                path: ROUTER.USER.CONFIRMATION,
                element: <OrderConfirmation/>,
            },
            {
                path: ROUTER.USER.CART,
                element: <Cart />,
            },
            {
                path: ROUTER.USER.ORDER,
                element: <Order />,
            },
        ]
    }
])

export default router