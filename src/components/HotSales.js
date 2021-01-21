import React from 'react'
import ProductCard from "./product/ProductCard";
import hotProducts from "../data/fakeProducts";


const HotSales = () => {

    //TODO добавить загрузку 4 товаров с сервера
    return (
        <div className='hotSales'>
            <h2 className='hotSales__title'>Хит продаж</h2>
            <div className=' hotSales__products'>
                {hotProducts.map((product) => {
                    return <ProductCard key={product.id} product={product}/>
                })}

            </div>
        </div>
    )
}

export default HotSales