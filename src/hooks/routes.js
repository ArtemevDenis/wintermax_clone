import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";

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
import {AuthContext} from "../context/AuthContext";

const AdminRoute = ({children, ...rest}) => {
    const {isAdmin} = useContext(AuthContext)
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
    const {isAuth} = useContext(AuthContext)
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
        <Route path={"/"} exact>
            <Main/>
        </Route>
        <Route path={"/catalog"} exact>
            <Catalog/>
        </Route>
        <Route path={"/catalog/:id"}>
            <Product/>
        </Route>
        <Route path={"/cart"}>
            <Cart/>
        </Route>
        <Route path={"/news/:id"}>
            <News/>
        </Route>
        <Route path={"/login"}>
            <Login/>
        </Route>
        <AdminRoute path={"/admin/orders"}>
            <Orders/>
        </AdminRoute>
        <Route path={"/admin/goods"}>
            <Goods/>
        </Route>
        <AdminRoute path={"/admin/goods/:id"}>
            <AdminProduct/>
        </AdminRoute>
        <AdminRoute path={"/admin/news"}>
            <AdminNews/>
        </AdminRoute>
        <AdminRoute path={"/admin/promo"}>
            <Promo/>
        </AdminRoute>
        <ProtectRoute path={"/profile"}>
            <Profile/>
        </ProtectRoute>
        <Redirect to={"/"}/>
    </>

    return (
        <Switch>
            {defaultRouters}
        </Switch>

    )
}