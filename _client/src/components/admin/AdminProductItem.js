import React from 'react'
import {NavLink} from "react-router-dom";

const AdminProductItem = ({product, deleteHandler, index}) => {

    return (
        <div className='goods__item'>
            <div className='goods__text'>{index}.</div>
            <div className='goods__text'>{product.title}</div>
            <div className='goods__text'>{product.cost}₽</div>
            <NavLink className='button-primary' to={`/admin/goods/${product.ID}`}>Изменить</NavLink>
            <button
                className='button-danger'
                onClick={(e) => {
                    e.preventDefault()
                    deleteHandler(product.ID)
                }}
            >Удалить
            </button>
        </div>
    )
}
export default AdminProductItem