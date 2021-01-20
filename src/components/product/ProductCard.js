import React from 'react'
import {NavLink} from "react-router-dom";
import Rating from "../rating/Rating";

const ProductCard = ({product}) => {
    const reviewTitle = () => {
        if (product.countReviews === 0)
            return 'отзывов'
        if (product.countReviews === 1)
            return 'отзыв'
        if (product.countReviews > 1 && product.countReviews < 5)
            return 'отзыва'
        return 'отзывов'
    }

    return (
        <div className='product-card'>
            <NavLink to={`/catalog/${product.id}`}>
                <div className='product-card__img-wrapper'>
                    <img className='product-card__img' src={product.img}/>
                </div>
                <div className='product__lite'><p>{product.title}</p><p>{product.cost}₽</p></div>
                <div className='product__lite'><p>{product.countReviews} {reviewTitle()}</p><Rating
                    rating={product.rating}/></div>
            </NavLink>
        </div>
    )
}

export default ProductCard