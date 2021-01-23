import './App.css';
import Footer from "./components/header&footer/Footer";
import Header from "./components/header&footer/Header";


import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";

import {AuthContext} from "./context/AuthContext";
import Loader from "./components/Loader";
import Root from "./components/Root";

function App() {
    const {token, login, logout, userID, ready, role, email} = useAuth()

    const isAdmin = !!(role && role.indexOf('admin') === 0);
    const isAuth = !!token;


    if (!ready) {
        return <Loader/>
    }

    return (

        <AuthContext.Provider value={{token, login, logout, userID, isAuth, isAdmin, email}}>
            <Router>
                <Header/>
                <Root/>
                <Footer/>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
