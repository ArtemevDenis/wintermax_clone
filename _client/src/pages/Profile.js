import React, {useContext, useEffect, useState} from "react";
import Order from "../components/profile/Order";
import {useHttp} from "../hooks/http.hook";
import {UserContext} from "../context/AuthContext";

function Profile() {
    const [isSubscribe, setIsSubscribe] = useState();
    const {request} = useHttp()
    const [orders, setOrders] = useState(null)
    const user = useContext(UserContext)


    const getStatusIsSubscribe = () => {
        request('/api/userData/', 'POST', {userID: user.userID},
            {
                Authorization: `Bearer ${user.token}`
            }).then(data => setIsSubscribe(data.isSubscribe))

    }

    const sendIsSubscribe = (isSub) => {
        request('/api/userData/setSubscribe/', 'PATCH', {userID: user.userID, isSubscribe: isSub},
            {
                Authorization: `Bearer ${user.token}`
            })
            .then(setIsSubscribe(isSub))
    }

    const setStatusInSubscribe = async () => {
        try {
            isSubscribe === 0 ?
                sendIsSubscribe(1) :
                sendIsSubscribe(0)
        } catch (e) {
            console.error(e)
        }
    }


    const getOrders = () => {
        request(`/api/orders/${user.userID}/`, 'GET', null,
            {
                Authorization: `Bearer ${user.token}`
            })
            .then((r) => setOrders(r.results))
    }


    useEffect(() => {
        getStatusIsSubscribe()
        getOrders()
    }, [])


    return (
        <div className='profile'>
            <div className='profile__body'>
                <h2 className='profile__title'>Пользовательские данные:</h2>
                <p className='profile__title'>email: {user.email} </p>
                <button
                    className='button-primary'
                    style={{width: '300px'}}
                    onClick={setStatusInSubscribe}
                >
                    {isSubscribe === 0 ? 'Подписаться на рассылку' : 'Отписаться от рассылки'}
                </button>
                {orders && <h2 className='profile__title'>Ваши заказы:</h2>
                }
            </div>
            {orders &&
            <div className='profile__orders'>
                {orders.map((order) => {
                    return <Order key={order.ID} order={order}/>
                })}
            </div>
            }
        </div>
    );
}

export default Profile;
