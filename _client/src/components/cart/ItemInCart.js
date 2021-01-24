import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";

const ItemInCart = ({product, deleteItem}) => {


    return (
        <div>
            <p>Наименование:{product && product.title}</p>
            <p>Цена:{product && product.cost}</p>
            <button onClick={(e) => {
                e.preventDefault()
                deleteItem(product.ID)
            }}>удалить товар
            </button>
        </div>
    )
}

export default ItemInCart