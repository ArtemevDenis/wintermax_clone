import React, {useEffect, useState} from 'react';
import OrderStatus from "./OrderStatus";
import {useHttp} from "../../hooks/http.hook";
import SetReview from "./SetReview";

const Order = ({order}) => {
    const {loading, error, request, clearError} = useHttp()
    const [productsListData, setProductsListData] = useState(null)


    const loadProductsListData = () => {
        new Promise(async (resolve, reject) => {
            const data = await request('/api/products/list', "POST", {productsList: order.productsList})
            console.log(data)
            if (data)
                resolve(data)
        }).then(r =>
            setProductsListData(r)
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
                        <li>{index+1}. {product.title}</li>)}</ul>}
                    <p><span className='order__title'>Адрес: </span>
                        <spam className='order__text'>
                            {order.addressDelivery}</spam>
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