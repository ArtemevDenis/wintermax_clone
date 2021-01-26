import React, {useState} from 'react'

const AdminOrder = ({order, updateStatus}) => {
    const [localStatus, setLocaleStatus] = useState(order.status)
    return (
        <div style={{margin: 10 + 'px'}}>
            <p><span>Номер заказа: </span>№{order.ID}</p>
            <p><span>Заказчик:ы </span>{order.ownerID}</p>
            <p><span>Содержание заказа: </span>{order.productsList}</p>
            <p>
                <span>Дата доставки: </span>{new Date(order.dateDelivery).toISOString().slice(0, 10).replace('T', ' ')}
            </p>
            <p><span>Адрес доставки: </span>{order.addressDelivery}</p>
            <select name="cars" id="cars" value={localStatus} onChange={(e) => {
                setLocaleStatus(e.target.value)
            }}>
                <option value="0">Получен менеджером</option>
                <option value="1">В обработке</option>
                <option value="2">Собран</option>
                <option value="3">Передан в доставку</option>
                <option value="4">Выполнен</option>
            </select>
            <button onClick={(e) => {
                e.preventDefault()
                console.log('click')
                updateStatus({orderID: order.ID, status: localStatus})
            }}>Обновить
            </button>
        </div>
    )
}

export default AdminOrder