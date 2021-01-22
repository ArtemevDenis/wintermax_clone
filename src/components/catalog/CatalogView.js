import React from "react";
import ProductCard from "../product/ProductCard";

const CatalogView = ({products}) => {
    if (products.length === 0)
        return <p>По данному запрросу товаров не найдено</p>
    if (Array.isArray(products)) {
        console.log(products)
        return (
            <>
                {products.map((product) => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </>

        )
    }
    return <p>По данному запрросу товаров не найдено</p>

}

export default CatalogView