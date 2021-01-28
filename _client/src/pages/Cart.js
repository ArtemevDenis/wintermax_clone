import React, {useContext, useEffect, useRef, useState} from "react";
import CartList from "../components/cart/CartList";
import {UserContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import  {useHistory, Redirect} from "react-router-dom";

function Cart() {

    let history = useHistory();
    const [totalPrice, setTotalPrice] = useState(1000)
    const [sale, setSale] = useState(5)
    const [promoCode, setPromoCode] = useState(null)
    const [cartID, setCartID] = useState(-1)
    const address = useRef(null)

    const [productList, setProductList] = useState(null)
    const {request} = useHttp()
    const user = useContext(UserContext)

    const [date, setDate] = useState('');

    const submitHandler = async () => {
        if (cartID !== -1 && user.userID && address.current.value !== '' && date !== '') {
            console.log('не все данные')
            const sendData = {
                userID: user.userID,
                addressDelivery: address.current.value,
                dateDelivery: date,
                cartID: cartID
            }
            const data = await request('/api/orders/', 'POST', sendData,
                {
                    Authorization: `Bearer ${user.token}`
                })
            if (data.code === 200) {
                await getCart();
                history.push('/profile')
            }
        }
        console.log('wefwefwefwef')
    }


    const getCart = async () => {
        try {
            setProductList(null)
            new Promise(async resolve => {
                const data = await request('/api/cart/', 'POST', {userID: user.userID},
                    {
                        Authorization: `Bearer ${user.token}`
                    })
                resolve(data)
            }).then(data => {
                console.log(data.list)
                setProductList(data.list)
                setTotalPrice(data.totalPrice)
                setSale(data.sale)
                setCartID(data.cartID)
                setPromoCode(data.promoCode)
                user.setCartSize(data.list.length)
            })


        } catch (e) {
        }
    }

    const deleteItemFromProductList = async (productID) => {
        await request('/api/cart/removeitem', 'DELETE', {cartID: cartID, productID},
            {
                Authorization: `Bearer ${user.token}`
            })
        getCart();
    }


    const promoCodeHandler = (e) => {
        e.preventDefault()
        console.log("promoCodeHandler")
        sendPromoCode()
    }

    const sendPromoCode = async () => {
        console.log("sendPromoCode")
        await request('/api/cart/promo', 'POST', {cartID: cartID, promoCode: promoCode},
            {
                Authorization: `Bearer ${user.token}`
            }).then(getCart())
    }


    useEffect(() => {
        if (user.isAuth) {
            getCart()
        } else {

        }
    }, [])


    return (
        user.isAuth ?
            <div className='cart'>
                {date}
                <h2>Пользовательские данные</h2>
                <div className='cart__line'>Адрес доставки:
                    <input
                        className='input__number--100'
                        type='string'
                        ref={address}
                        placeholder="введите адрес доставки"
                        style={{width: 200 + 'px'}}
                    />
                </div>
                <div className='cart__line'><p>дата доставки:</p><input
                    className='datepicker'
                    type='date'
                    onChange={(e) => {
                        setDate(e.target.value)
                    }}/></div>
                <h2>Ваш заказ:</h2>

                {productList && <CartList cart={productList} deleteItem={deleteItemFromProductList}/>}

                <div className='cart__line'><p className='cart__title'>Скидка:</p><p>{sale}%</p></div>
                <div className='cart__line'><p className='cart__title'>Промокод:</p>

                    <input
                        onChange={(e) => {
                            setPromoCode(e.target.value)
                        }}
                        value={promoCode}
                        className='input__number--100'
                        type='string'

                        placeholder="введите промокод"
                        style={{width: 300 + 'px'}}
                    />


                </div>
                <div className='cart__line'><p></p>
                    <button className='button-primary' type="submit" style={{width: '310px'}}
                            onClick={(e) => {
                                promoCodeHandler(e)
                            }}>Добавить промокод
                    </button>
                </div>
                <div className='cart__line'><p className='cart__title'>Итоговая стоимость
                    с учетом скидки и промокода: </p><p className='cart__title'>{totalPrice}₽</p></div>

                <button
                    className='button-primary'
                    type="submit"
                    style={{width: '500px'}}
                    onClick={(e) => {
                        e.preventDefault()
                        submitHandler()
                    }}
                    disabled={cartID === -1}
                >
                    Оформить
                </button>
            </div>
            : <Redirect to='/login'/>
    );
}

export default Cart;
