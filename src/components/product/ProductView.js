import React from "react";
import {NavLink} from "react-router-dom";
import ImageSlider from "../slider/ImageSlider";
import Review from "./Review";
import Rating from "../rating/Rating";

const ProductView = ({product}) => {
    //TODO сделать обработчики кнопок + доделать рейтинг
    return (
        <div className='product'>
            <NavLink className='back-link' to='/catalog'>В каталог</NavLink>
            <ImageSlider dataSet={product.imgSet} hSize={'550px'} noLinks={true}/>
            <div className='product__line product__mt40'>
                <div>
                    <h2 className='product__title'>{product.title}</h2>
                    <Rating size={'50'} rating={product.rating}/>
                </div>
                <div className='product__line'>
                    <p className='product__cost'>{product.cost}₽</p>
                    <div className='product__btn-block'>
                        <button className='button-primary' style={{width: 300 + 'px'}}>Купить</button>
                        <button className='button-primary' style={{width: 300 + 'px'}}>В корзину</button>
                    </div>
                </div>
            </div>
            <div className='product__description'>
                <h3 className='product__title'>Описание</h3>
                <p className='product__description-text'>{product.description}</p>
            </div>
            <div className='product__reviews'>
                <h3 className='product__title'>Отзывы</h3>
                {product.reviews.map((review, index) => {
                    return <Review review={review}/>
                })}
            </div>
        </div>
    )
}


export default ProductView