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
    const {token, login, logout, userID, readyAuth} = useAuth()

    //const isAdmin = false;
    //const isAuth = !!token;
    const isAdmin = true;
    const isAuth = false;

    const readyAdmin = true;


    if (!readyAuth && !readyAdmin) {
        return <Loader/>
    }

    return (

        <AuthContext.Provider value={{token, login, logout, userID, isAuth, isAdmin}}>
            <Router>
                <Header/>
                <Root isAdmin={isAdmin} isAuth={isAuth}/>
                <Footer/>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
