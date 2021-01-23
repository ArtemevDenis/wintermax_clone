import React from "react";
import ProductCard from "../product/ProductCard";

const CatalogView = ({products}) => {
    if (Array.isArray(products) && products.length !== 0) {
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