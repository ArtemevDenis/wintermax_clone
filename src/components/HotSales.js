import React, {useEffect, useState} from 'react'
import ProductCard from "./product/ProductCard";
import {useHttp} from "../hooks/http.hook";


const HotSales = () => {
    const {loading, error, request, clearError} = useHttp()
    const [hotProducts, setHotProducts] = useState([])


    const setPopularProducts = async () => {
        const data = await request('/api/products/count/4', 'GET')
        setHotProducts(data)
    }
    useEffect(() => {
        setPopularProducts()
    }, [])

    //TODO добавить загрузку 4 товаров с сервера
    return (
        <div className='hotSales'>
            <h2 className='hotSales__title'>Хит продаж</h2>
            <div className=' hotSales__products'>
                {!loading && hotProducts.map((product) => {
                    return <ProductCard key={product.ID} product={product}/>
                })}

            </div>
        </div>
    )
}

export default HotSales