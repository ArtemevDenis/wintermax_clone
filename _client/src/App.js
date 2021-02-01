import './App.css';
import Footer from "./components/header&footer/Footer";
import Header from "./components/header&footer/Header";


import React, {useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";

import {UserContext} from "./context/AuthContext";
import Root from "./components/Root";

function App() {
    const {token, login, logout, userID, role, email} = useAuth()
    const [cartSize, setCartSize] = useState(0);
    const isAdmin = !!(role && role.indexOf('admin') === 0);
    const isAuth = !!token;

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
