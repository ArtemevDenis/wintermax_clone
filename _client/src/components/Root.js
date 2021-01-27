import React, {useContext} from "react";
import {useRoutes} from "../hooks/routes";
import {UserContext} from "../context/AuthContext";
import AdminMenu from "./admin/AdminMenu";

function Root() {
    const routes = useRoutes();
    const {isAdmin} = useContext(UserContext)
    return (
        <main className='container inner'>
            {isAdmin && <AdminMenu/>}
            {routes}
        </main>
    );
}

export default Root;
