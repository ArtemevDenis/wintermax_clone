import React from 'react'
import OrderStatus from "./OrderStatus";
import {useHttp} from "../../hooks/http.hook";

const Order = ({order}) => {
    const {loading, error, request, clearError} = useHttp()

    return (
        <div className='order'>
            <div className='order__line'>
                <h2 className='order__title'>Заказ №{order.ID}</h2>
                <p className='order__title order__title--ml50 '>{new Date(order.date).toISOString().slice(0, 10).replace('T', ' ')}</p>
            </div>
            <OrderStatus status={order.status}/>
            <h3 className='order__title'>Содержание заказа:</h3>
            <p className='order__text'>{order.productsList}</p>
            <p><span className='order__title'>Адрес: </span>
                <spam className='order__text'>
                    {order.addressDelivery}</spam>
            </p>
            <p><span className='order__title'>Дата: </span>
                <span className='order__text'>
                    {new Date(order.dateDelivery).toISOString().slice(0, 10).replace('T', ' ')}</span>
            </p>
        </div>
    )
}

export default Order