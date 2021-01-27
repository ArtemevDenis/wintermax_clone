import React from 'react'

const ItemInCart = ({product, deleteItem, index}) => {


    return (
        <>
            <p className='cart__item'>{index}</p>
            <p className='cart__item'>{product && product.title}</p>
            <p className='cart__item' s>{product && product.cost}₽</p>
            <button
                className='button-danger'
                onClick={(e) => {
                    e.preventDefault()
                    deleteItem(product.ID)
                }}>удалить товар
            </button>
        </>
    )
}

export default ItemInCart