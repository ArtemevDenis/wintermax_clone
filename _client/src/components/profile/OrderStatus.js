import React from 'react'

const OrderStatus = ({status=0}) => {

    const complete = {
        background: '#15FF00',
        borderColor: '#15FF00'
    }
    const inProgress = {
        background: '#CBEEFC',
        borderColor: '#3A96FF',
    }
    return (
        <div className='order-status'>
            <div className='order-status__item'>
                <span className='order-status__bubble' style={parseInt(status, 10) >= 0 ? complete : inProgress}/>
                <p className='order-status__description'>получен<br/>менеджером</p>
            </div>
            <div className='order-status__item'>
                <span className='order-status__bubble' style={parseInt(status, 10) >= 1 ? complete : inProgress}/>
                <p className='order-status__description'>в обработке</p>
            </div>
            <div className='order-status__item'>
                <span className='order-status__bubble' style={parseInt(status, 10) >= 2 ? complete : inProgress}/>
                <p className='order-status__description'>собран</p>
            </div>
            <div className='order-status__item'>
                <span className='order-status__bubble' style={parseInt(status, 10) >= 3 ? complete : inProgress}/>
                <p className='order-status__description'>передан<br/>в доставку</p>
            </div>
            <div className='order-status__item'>
                <span className='order-status__bubble' style={parseInt(status, 10) >= 4 ? complete : inProgress}/>
                <p className='order-status__description'>выполнен</p>
            </div>

        </div>
    )
}

export default OrderStatus