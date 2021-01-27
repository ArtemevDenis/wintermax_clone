import React from 'react'
import {NavLink} from "react-router-dom";
import Rating from "../rating/Rating";

const ProductCard = ({product}) => {
    const reviewTitle = () => {
        console.log(product.CountReviews)
        if (product.CountReviews === 0)
            return 'нет отзывов'
        if (product.CountReviews === 1)
            return `${product.CountReviews} отзыв`
        if (product.CountReviews > 1 && product.CountReviews < 5)
            return `${product.CountReviews} отзыва`
        return `${product.CountReviews} отзывов`
    }

    return (
        <div className='product-card'>

            <NavLink to={`/catalog/${product.ID}`}>
                <div className='product-card__img-wrapper'>
                    {/*TODO времено убрано что бы протестить выборку*/}
                    <img className='product-card__img' src={'images/' +product.img} alt=''/>
                </div>
                <div className='product__lite'>
                    <p>{product.title}</p>
                    <p>{product.cost}₽</p></div>
                <div className='product__lite'>
                    {/*TODO времено убрано что бы протестить выборку*/}
                    <p>{reviewTitle()}</p>
                    <Rating rating={product.AvgRating}/>
                </div>
            </NavLink>
        </div>
    )
}

export default ProductCard
