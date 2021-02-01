import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";

const AdminOrder = ({order, updateStatus}) => {
    const [localStatus, setLocaleStatus] = useState(order.status)

    const [productsListData, setProductsListData] = useState(null)

    const {request} = useHttp()
    const [userData, setUserData] = useState(null)

    const user = useContext(UserContext)

    const loadProductsListData = () => {
        request('/api/products/list', "POST", {productsList: order.productsList},
            {
                Authorization: `Bearer ${user.token}`
            }).then(r => setProductsListData(r))
    }

    const loadUser = () => {
        request(`/api/userData/${order.ownerID}`, "GET", null,
            {
                Authorization: `Bearer ${user.token}`
            }).then(r => setUserData(r))
    }

    useEffect(() => {
        loadProductsListData()
        loadUser()
    }, [])

    return (
        <div className='admin-orders__order'>
            <div className='admin-orders__line'><p className='admin-orders__title'>Номер заказа: </p><p>№{order.ID}</p>
            </div>
            <div className='admin-orders__line'><p className='admin-orders__title'>Заказчик:</p>
                <p>{userData && userData.email}</p></div>
            <div className='admin-orders__line'><p className='admin-orders__title'>Содержание заказа:</p>
                {productsListData &&
                <ol>{productsListData.map(product =>
                    <li>{product.title}</li>)}</ol>}
            </div>
            <div className='admin-orders__line'>
                <p className='admin-orders__title'>Дата доставки: </p>
                <p>{new Date(order.dateDelivery).toISOString().slice(0, 10).replace('T', ' ')}</p>
            </div>
            <div className='admin-orders__line'><p className='admin-orders__title'>Адрес доставки: </p>
                <p>{order.addressDelivery}</p></div>
            <div className='admin-orders__line' style={{gap: 30+'px'}}>
                <select
                    className='select'
                    name="cars"
                    id="cars"
                    value={localStatus}
                    onChange={(e) => {
                        setLocaleStatus(e.target.value)
                    }}>
                    <option value="0">Получен менеджером</option>
                    <option value="1">В обработке</option>
                    <option value="2">Собран</option>
                    <option value="3">Передан в доставку</option>
                    <option value="4">Выполнен</option>
                </select>
                <button
                    className='button-primary'
                    onClick={(e) => {
                        e.preventDefault()
                        updateStatus({orderID: order.ID, status: localStatus})
                    }}>Обновить
                </button>
            </div>
        </div>
    )
}

export default AdminOrder