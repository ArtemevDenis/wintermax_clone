import './App.css';
import Footer from "./components/header&footer/Footer";
import Header from "./components/header&footer/Header";


import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";

import {UserContext} from "./context/AuthContext";
import Loader from "./components/Loader";
import Root from "./components/Root";
import {useHttp} from "./hooks/http.hook";

function App() {
    const {token, login, logout, userID, ready, role, email} = useAuth()
    const [cartSize, setCartSize] = useState(0);
    const isAdmin = !!(role && role.indexOf('admin') === 0);
    const isAuth = !!token;


    const {request} = useHttp()

    useEffect(() => {
        console.log('set token')
        if (token)
            loadCartSize()
    }, [token])

    const loadCartSize = async () => {
        const cartSize = await request('/api/cart/size', 'POST', {userID}, {
            Authorization: `Bearer ${token}`
        })
        setCartSize(cartSize.size);
        console.log('cartSize.size: ' + cartSize.size)
    }

    if (!ready) {
        return <Loader/>
    }


    return (

        <UserContext.Provider value={{token, login, logout, userID, isAuth, isAdmin, email, cartSize, setCartSize}}>
            <Router>
                <Header/>
                <Root/>
                <Footer/>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
