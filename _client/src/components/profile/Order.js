import React from 'react'
import OrderStatus from "./OrderStatus";

const Order = ({order}) => {
    return (
        <div className='order'>
            <div className='order__line'>
                <h2 className='order__title'>Заказ №{order.id}</h2>
                <p className='order__title order__title--ml50 '>{order.orderDate}</p>
            </div>
            <OrderStatus status={order.status}/>
            <h3 className='order__title'>Содержание заказа:</h3>
            <p className='order__text'>{order.orderContent}</p>
            <h3 className='order__title'>Адрес и время:</h3>
            <p className='order__text'>{order.deliveryAddress}</p>
            <p className='order__text'>{order.deliveryDate}</p>
        </div>
    )
}

export default Order