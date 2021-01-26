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


    const updateStatus = async (object) => {
        new Promise(async (resolve, reject) => {
            await request(`/api/orders/update/`, 'POST', {ID: object.orderID, status: object.status},
                {
                    Authorization: `Bearer ${user.token}`
                })
            resolve()
        }).then(getOrders())
    }


    // const getOrders = () => {
    //     new Promise(async (resolve, reject) => {
    //
    //         const data = await request('/api/orders/all', 'GET', null,
    //             {
    //                 Authorization: `Bearer ${user.token}`
    //             })
    //         console.log('##########################################')
    //         console.log(data)
    //         console.log(data.results)
    //         console.log('##########################################')
    //
    //         resolve(data.results)
    //     }).then((r) => {
    //             setOrders(r)
    //         }
    //     )
    // }

    const getOrders = () => {
        new Promise(async (resolve, reject) => {
            console.log(12)
            const data = await request(`/api/orders/all/`, 'GET', null,
                {
                    Authorization: `Bearer ${user.token}`
                })
            resolve(data.results);
            console.log(data)
        }).then((r) => {
            console.log(r)
            setOrders(r)
        })
    }

    return (
        <div>
            Orders
            {orders &&
            <ol>{orders.map((order) => {
                return <li key={order.ID}><AdminOrder order={order} updateStatus={updateStatus}/></li>
            })}</ol>}
        </div>
    );
}

export default Orders;
