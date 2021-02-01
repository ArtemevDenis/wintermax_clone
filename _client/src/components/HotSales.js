import React, {useEffect, useState} from 'react'
import ProductCard from "./product/ProductCard";
import {useHttp} from "../hooks/http.hook";


const HotSales = () => {
    const {loading, request} = useHttp()
    const [hotProducts, setHotProducts] = useState([])


    const setPopularProducts = () => {
        request('/api/products/count/4', 'GET')
            .then(setHotProducts)
    }
    useEffect(() => {
        setPopularProducts()
    }, [])

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