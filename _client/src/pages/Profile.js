import React, {useContext, useEffect, useState} from "react";
import Order from "../components/profile/Order";
import fakeOrder from "../data/fakeOrder";
import {useHttp} from "../hooks/http.hook";
import {UserContext} from "../context/AuthContext";

function Profile() {
    const [isSubscribe, setIsSubscribe] = useState();
    const {loading, error, request, clearError} = useHttp()
    const auth = useContext(UserContext)


    const getStatusIsSubscribe = async () => {

        try {
            const data = await request('/api/userData/', 'POST', {userID: auth.userID},
                {
                    Authorization: `Bearer ${auth.token}`
                })
            await console.log(data)
            await setIsSubscribe(data.isSubscribe)
            await console.log('isSubscribe:' + isSubscribe)
        } catch (e) {
            console.error(e)
        }
    }
    const sendIsSubscribe = async (isSub) => {
        await request('/api/userData/setSubscribe/', 'PATCH', {userID: auth.userID, isSubscribe: isSub},
            {
                Authorization: `Bearer ${auth.token}`
            }).then(setIsSubscribe(isSub))
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

    useEffect(() => {
        getStatusIsSubscribe()
    }, [])

    return (
        <div className='profile'>
            <h2 className='profile__title'>Пользовательские данные:</h2>
            <p className='profile__title'>email: {auth.email} </p>
            <button
                className='button-primary'
                style={{width: '300px'}}
                onClick={setStatusInSubscribe}
            >
                {isSubscribe === 0 ? 'Подписаться на рассылку' : 'Отписаться от рассылки'}
            </button>
            <h2 className='profile__title'>Ваши заказы:</h2>
            {fakeOrder.map((order) => {
                return <Order key={order.id} order={order}/>
            })}

        </div>
    );
}

export default Profile;
