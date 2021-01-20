import React from 'react'
import ProductCard from "./product/ProductCard";
import hotProducts from "../data/fakeProducts";


const HotSales = () => {
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