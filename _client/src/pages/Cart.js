import React, {useContext, useEffect, useRef, useState} from "react";
import CartList from "../components/cart/CartList";
import {UserContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";

function Cart() {

    let history = useHistory();
    const [totalPrice, setTotalPrice] = useState(1000)
    const [sale, setSale] = useState(5)
    const [promoCode, setPromoCode] = useState(null)
    const [cartID, setCartID] = useState(-1)
    const address = useRef(null)

    const [productList, setProductList] = useState(null)
    const {loading, request} = useHttp()
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

    useEffect(() => {
        getCart()
    }, [])

    const getCart = async () => {
        try {
            const data = await request('/api/cart/', 'POST', {userID: user.userID},
                {
                    Authorization: `Bearer ${user.token}`
                })
            setProductList(data.list)
            setTotalPrice(data.totalPrice)
            setSale(data.sale)
            setCartID(data.cartID)
            setPromoCode(data.promoCode)
            user.setCartSize(data.list.length)

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


    return (
        <form>
            {date}
            <h2>Пользовательские данные</h2>
            <div>Адрес доставки:
                <input
                    className='input__number--100'
                    type={'string'}
                    ref={address}
                    placeholder={"введите адрес доставки"}
                    style={{width: 200 + 'px'}}
                />
            </div>
            <div><p>дата доставки:</p><input type={'date'} onChange={(e) => {
                setDate(e.target.value)
            }}/></div>
            <h2>Ваш заказ:</h2>

            {productList && <CartList cart={productList} deleteItem={deleteItemFromProductList}/>}

            <div><p>Итог:</p><p>{totalPrice}</p></div>
            <div><p>скидка:</p><p>{sale}%</p></div>
            <div><p>промокод:</p>
                <div>

                    <input
                        onChange={(e) => {
                            setPromoCode(e.target.value)
                        }}
                        value={promoCode}
                        className='input__number--100'
                        type={'string'}

                        placeholder={"введите промокод"}
                        style={{width: 300 + 'px'}}
                    />
                    <button className='button-primary' type="submit" style={{width: '200px'}}
                            onClick={(e) => {
                                promoCodeHandler(e)
                            }}>Добавить промокод
                    </button>
                </div>

            </div>
            <p>Итоговая стоимость
                с учетом скидки и промокода: {totalPrice}</p>

            <button
                className='button-primary'
                type="submit"
                style={{width: '410px'}}
                onClick={(e) => {
                    e.preventDefault()
                    submitHandler()
                }}
                disabled={cartID === -1}
            >
                Оформить
            </button>
        </form>
    );
}

export default Cart;
