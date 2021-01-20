import React from 'react'
import {NavLink} from "react-router-dom";
import Rating from "../rating/Rating";

const ProductCard = ({product}) => {
    const reviewTitle = () => {
        if (product.reviews.length === 0)
            return 'нет отзывов'
        if (product.reviews.length === 1)
            return `${product.reviews.length} отзыв`
        if (product.reviews.length > 1 && product.reviews.length < 5)
            return `${product.reviews.length} отзыва`
        return 'отзывов'
    }

    return (
        <div className='product-card'>
            <NavLink to={`/catalog/${product.id}`}>
                <div className='product-card__img-wrapper'>
                    <img className='product-card__img' src={product.imgSet[0].image}/>
                </div>
                <div className='product__lite'>
                    <p>{product.title}</p>
                    <p>{product.cost}₽</p></div>
                <div className='product__lite'>
                    <p>{reviewTitle()}</p>
                    <Rating rating={product.rating}/>
                </div>
            </NavLink>
        </div>
    )
}

export default ProductCard