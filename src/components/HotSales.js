import React from 'react'
import ProductCard from "./product/ProductCard";


const HotSales = () => {

    const hotProducts = [{
        id: 1212,
        title: "Сани",
        cost: "1500",
        countReviews: 12,
        rating: 4,
        img: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1383&q=80'
    }, {
        id: 1212,
        title: "Сани",
        cost: "1500",
        countReviews: 12,
        rating: 4,
        img: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1383&q=80'
    }, {
        id: 1212,
        title: "Сани",
        cost: "1500",
        countReviews: 12,
        rating: 4,
        img: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1383&q=80'
    }, {
        id: 1212,
        title: "Сани",
        cost: "1500",
        countReviews: 12,
        rating: 4,
        img: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1383&q=80'
    }]

    return (
        <div className='hotSales'>
            <h2 className='hotSales__title'>Хит продаж</h2>

            <div className=' hotSales__products'>

                {hotProducts.map((product) => {
                    return <ProductCard product={product}/>
                })}

            </div>
        </div>
    )
}

export default HotSales