import {UserMenuData} from "../../data/UserMenuData";
import {NavLink, useHistory} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const Menu = ({listOrientation}) => {
    const history = useHistory()
    const {logout, isAuth} = useContext(AuthContext)
    const cartSize = 0

    const logoutHandler = event => {
        event.preventDefault()
        logout()
        history.push('/')
    }
    return (
        <nav>
            <ul className={`nav nav--${listOrientation}`}>
                {UserMenuData.map((item, index) => {
                    return <li className={`nav__item nav__item--${listOrientation}`} key={index}><NavLink
                        to={item.path}>{item.title}</NavLink></li>
                })}
                <li className={`nav__item nav__item--${listOrientation}`}><NavLink
                    to="/cart">Корзина {cartSize}</NavLink></li>
                <li className={`nav__item nav__item--${listOrientation}`}>{isAuth
                    ? <a href="/" onClick={logoutHandler}>Выйти</a>
                    : <NavLink to="/login">Вход</NavLink>}</li>
            </ul>
        </nav>
    )
}

export default Menu