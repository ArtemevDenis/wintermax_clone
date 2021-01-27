import React from 'react'
import ItemInCart from "./ItemInCart";

const CartList = ({cart, deleteItem}) => {
    if (cart.length !== 0)
        return (
            <div className='cart__list'>
                <p className='cart__item cart__item--header'>#</p>
                <p className='cart__item cart__item--header'>Название</p>
                <p className='cart__item cart__item--header'>Цена</p>
                <p className='cart__item cart__item--header'>Действие</p>
                {cart.map((product, index) => {
                    return <ItemInCart key={product.ID} product={product} deleteItem={deleteItem}
                                       index={index + 1}/>
                })}
            </div>
        )
    return <p>Корзина пустая</p>
}

export default CartList