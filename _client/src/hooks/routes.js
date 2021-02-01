import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Main from "../pages/Main";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Orders from "../pages/admin/Orders";
import Goods from "../pages/admin/Goods";
import AdminProduct from "../pages/admin/AdminProduct";
import AdminNews from "../pages/admin/AdminNews";
import Promo from "../pages/admin/Promo";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import News from "../pages/News";
import Login from "../pages/Login";
import {UserContext} from "../context/AuthContext";
import SliderEdit from "../pages/admin/SliderEdit";

const AdminRoute = ({children, ...rest}) => {
    const {isAdmin} = useContext(UserContext)
    return <Route {...rest}
                  render={
                      () => {
                          return isAdmin
                              ? children
                              : <Redirect to='/login'/>
                      }
                  }
    />
}

const ProtectRoute = ({children, ...rest}) => {
    const {isAuth} = useContext(UserContext)
    return <Route {...rest}
                  render={
                      () => {
                          return isAuth
                              ? children
                              : <Redirect to='/login'/>
                      }
                  }
    />
}

export const useRoutes = () => {

    let defaultRouters = <>
        <Route path={"/home"} exact>
            <Main/>
        </Route>
        <Route path={"/catalog"} exact>
            <Catalog/>
        </Route>
        <Route path={"/catalog/:id"} exact>
            <Product/>
        </Route>
        <Route path={"/cart"} exact>
            <Cart/>
        </Route>
        <Route path={"/news/:id"} exact>
            <News/>
        </Route>
        <Route path={"/login"} exact>
            <Login/>
        </Route>
        <AdminRoute path={"/admin/orders"} exact>
            <Orders/>
        </AdminRoute>
        <AdminRoute path={"/admin/goods"} exact>
            <Goods/>
        </AdminRoute>
        <AdminRoute path={"/admin/goods/:id"} exact>
            <AdminProduct/>
        </AdminRoute>
        <AdminRoute path={"/admin/news"} exact>
            <AdminNews/>
        </AdminRoute>
        <AdminRoute path={"/admin/promo"} exact>
            <Promo/>
        </AdminRoute>
        <AdminRoute path={"/admin/slider"} exact>
            <SliderEdit/>
        </AdminRoute>
        <ProtectRoute path={"/profile"} exact>
            <Profile/>
        </ProtectRoute>
        <Redirect to={"/home"}/>
    </>

    return (
        <Switch>
            {defaultRouters}
        </Switch>

    )
}