import React, {useEffect, useState} from "react";
import Order from "../components/profile/Order";
import fakeOrder from "../data/fakeOrder";

function Profile() {
    const [user, setUser] = useState( {"email":"useremail@mail.ru","isSubscribe":true})

    const subscribeHandler = () => {

        console.log(user)
        const newUser = user;
        newUser.isSubscribe = !user.isSubscribe;
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(user))
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user)
            setUser(user)
        else
            setUser({"email":"useremail@mail.ru","isSubscribe":true})
    }, [setUser])

    return (
        <div className='profile'>
            <h2 className='profile__title'>Пользовательские данные:</h2>
            <p className='profile__title'>email: {user.email} </p>
            <button
                className='button-primary'
                style={{width: '300px'}}
                onClick={subscribeHandler}
            >
                {user.isSubscribe ? 'Отписаться от рассылки' : 'Подписаться на рассылку'}
            </button>
            <h2 className='profile__title'>Ваши заказы:</h2>
            {fakeOrder.map((order) => {
                return <Order key={order.id} order={order}/>
            })}

        </div>
    );
}

export default Profile;
