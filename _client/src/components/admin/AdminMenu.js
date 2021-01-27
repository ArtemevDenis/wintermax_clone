import {AdminMenuData} from "../../data/AdminMenuData";
import {NavLink} from "react-router-dom";
import React from "react";


const AdminMenu = () => {
    return (
        <div className='admin-menu'>
            <p className='admin-menu__title'>Панель Администратора</p>
            <ul className='admin-menu__nav'>
                {AdminMenuData.map((item, index) => {
                    return <li key={index} className='admin-menu__nav-item'><NavLink
                        to={item.path}>{item.title}</NavLink></li>
                })}
            </ul>
        </div>
    )
}

export default AdminMenu