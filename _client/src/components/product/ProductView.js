import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import ImageSlider from "../slider/ImageSlider";
import Review from "./Review";
import Rating from "../rating/Rating";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";

const ProductView = ({product, imgSet, reviews}) => {
    let history = useHistory();
    const {request} = useHttp()
    const user = useContext(UserContext)

    const buyHandler = () => {
        if (!user.token)
            history.push('/login')

        request(`/api/cart/add`, 'POST', {productID: product.ID, userID: user.userID},
            {
                Authorization: `Bearer ${user.token}`
            }).then(r => user.setCartSize(r.size))


    }
    const buyAndCartHandler = () => {
        if (!user.token)
            history.push('/login')
        request(`/api/cart/add`, 'POST', {productID: product.ID, userID: user.userID},
            {
                Authorization: `Bearer ${user.token}`
            }).then(r => {
            user.setCartSize(r.size);
            history.push('/cart');
        })
    }

    return (
        <div className='product'>
            <NavLink className='back-link' to='/catalog'>В каталог</NavLink>
            {imgSet && <ImageSlider dataSet={imgSet} hSize={'550px'} noLinks={true}/>}
            <div className='product__line product__mt40'>
                <div>
                    <h2 className='product__title'>{product.title}</h2>
                    <Rating size={'50'} rating={product.AvgRating}/>
                </div>
                <div className='product__line'>
                    <p className='product__cost'>{product.cost}₽</p>
                    <div className='product__btn-block'>
                        <button
                            className='button-primary'
                            style={{width: 300 + 'px'}}
                            onClick={buyAndCartHandler}
                        >
                            Купить
                        </button>
                        <button
                            className='button-primary'
                            style={{width: 300 + 'px'}}
                            onClick={buyHandler}
                        >
                            В корзину
                        </button>
                    </div>
                </div>
            </div>
            <div className='product__description'>
                <h3 className='product__title'>Описание</h3>
                <p className='product__description-text'>{product.description}</p>
            </div>
            <div className='product__reviews'>
                <h3 className='product__title'>Отзывы</h3>
                {reviews && reviews.map((review, index) => {
                    return <Review key={index} review={review}/>
                })}
            </div>
        </div>
    )
}


export default ProductView