import React, {useContext} from "react";
import {useRoutes} from "../hooks/routes";
import {AdminMenuData} from "../data/AdminMenuData";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function Root() {
    const routes = useRoutes();
    const {isAdmin} = useContext(AuthContext)
    return (
        <main className='container inner'>
            {isAdmin &&
            <ul>
                {AdminMenuData.map((item, index) => {
                    return <li key={index}><NavLink to={item.path}>{item.title}</NavLink></li>
                })}
            </ul>}
            {routes}
        </main>
    );
}

export default Root;
