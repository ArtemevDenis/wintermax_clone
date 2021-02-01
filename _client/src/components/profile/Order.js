import React, {useEffect, useState} from 'react';
import OrderStatus from "./OrderStatus";
import {useHttp} from "../../hooks/http.hook";
import SetReview from "./SetReview";

const Order = ({order}) => {
    const {request} = useHttp()
    const [productsListData, setProductsListData] = useState(null)


    const loadProductsListData = () => {
        request('/api/products/list', "POST", {productsList: order.productsList}).then(
            setProductsListData
        )
    }

    useEffect(() => {
        loadProductsListData()
    }, [])

    return (
        <div className='order'>

            <div className='order__line'>
                <h2 className='order__title'>Заказ №{order.ID}</h2>
                <p className='order__title order__title--ml50 '>{new Date(order.date).toISOString().slice(0, 10).replace('T', ' ')}</p>
            </div>
            <OrderStatus status={order.status}/>
            <div className='row'>
                <div><h3 className='order__title'>Содержание заказа:</h3>
                    {productsListData && <ul className='order_text'>{productsListData.map((product, index) =>
                        <li key={index}>{index + 1}. {product.title}</li>)}</ul>}
                    <p><span className='order__title'>Адрес: </span>
                        <span className='order__text'>
                            {order.addressDelivery}</span>
                    </p>
                    <p><span className='order__title'>Дата: </span>
                        <span className='order__text'>
                    {new Date(order.dateDelivery).toISOString().slice(0, 10).replace('T', ' ')}</span>
                    </p>
                </div>
                {order.status === 4 && <div><SetReview productsData={productsListData}/></div>}
            </div>
        </div>
    )
}

export default Order