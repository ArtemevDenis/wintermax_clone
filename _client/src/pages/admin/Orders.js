import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";
import AdminOrder from "../../components/admin/AdminOrder";

function Orders() {

    const user = useContext(UserContext)
    const [orders, setOrders] = useState(null)

    const {request} = useHttp()
    useEffect(() => {
        getOrders()
    }, [])


    const updateStatus = (object) => {
        request(`/api/orders/update/`, 'POST', {ID: object.orderID, status: object.status},
            {
                Authorization: `Bearer ${user.token}`
            })
            .then(getOrders)
    }


    const getOrders = () => {
        request(`/api/orders/all/`, 'GET', null,
            {
                Authorization: `Bearer ${user.token}`
            })
            .then(r => setOrders(r.results))
    }

    return (
        <div className='admin-orders'>
            <div className='admin-orders__order'><h2>Заказы</h2></div>
            {orders &&
            orders.map((order) => {
                return <AdminOrder key={order.ID} order={order} updateStatus={updateStatus}/>
            })}
        </div>
    );
}

export default Orders;
