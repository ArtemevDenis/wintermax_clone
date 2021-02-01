import React, {useContext, useRef, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";

const SetReview = ({productsData}) => {

    const [rating, setRating] = useState(0)
    const [productID, setProductID] = useState(0)
    const text = useRef()
    const {request} = useHttp()
    const user = useContext(UserContext)

    const sendReview = () => {
        request('/api/reviews', "POST", {
            productID,
            rating,
            authorID: user.userID,
            text: text.current.value
        }, {
            Authorization: `Bearer ${user.token}`
        })
    }


    return (
        <form className='right-review'>
            <h3 className='right-review__title'>Здесь вы можете написать отзыв на товар:</h3>
            <select
                className='select'
                defaultValue='-1'
                onChange={(e) => {
                    setProductID(e.target.value)
                }}>
                <option value="-1" disabled={true}>Выберете товар</option>
                {productsData && productsData.map((product, index) =>
                    <option key={index} value={product.ID}>{product.title}</option>
                )}
            </select>
            <select
                className='select'
                onChange={(e) => {
                    setRating(e.target.value)
                }}>
                <option value="0">Плохо</option>
                <option value="1">Нейтрально</option>
                <option value="2">Нормально</option>
                <option value="3">Хорошо</option>
                <option value="4">Отлично</option>
                <option value="5">Суппер</option>
            </select>
            <textarea className='textarea' ref={text} placeholder='Введите коментарий'/>
            <button
                className='button-primary'
                onClick={(e) => {
                    e.preventDefault()
                    sendReview();
                }}>Отправить
            </button>
        </form>
    )
}

export default SetReview