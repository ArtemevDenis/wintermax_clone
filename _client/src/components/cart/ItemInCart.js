import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";

const ItemInCart = ({productID, deleteItem}) => {

    const [product, setProduct] = useState(null)
    const {request, loading, error} = useHttp()


    const getProduct = async () => {
        try {
            const product = await request(`/api/products/${productID}`, 'GET');
            setProduct(product);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>
            <p>Наименование:{product && product.title}</p>
            <p>Цена:{product && product.cost}</p>
            <button onClick={(e) => {
                e.preventDefault()
                deleteItem(productID)
            }}>удалить товар
            </button>
        </div>
    )
}

export default ItemInCart