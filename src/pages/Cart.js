import React, {useEffect, useRef, useState} from "react";
import RangeInput from "../components/catalog/filter/RangeInput";
import CartList from "../components/cart/CartList";

function Cart() {
    const [totalPrice, setTotalPrice] = useState(1000)
    const [sale, setSale] = useState(5)
    const [cart, setCart] = useState([{id: '1213'}, {id: '3454535'}])
    const address = useRef()
    const promo = useRef()
    const submitHandler = () => {
    }

    useEffect(() => {
        console.log(1)
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart)
            setCart(cart)
    })

    return (
        <form onSubmit={submitHandler}>
            <h2>Пользовательские данные</h2>
            <div>Адрес доставки: <RangeInput ref={address}
                                             placeholder='адрес доставки'
                                             width={'300px'}
                                             type='string'/>
            </div>
            <h2>Ваш заказ:</h2>

            <CartList cart={cart}/>

            <div><p>Итог:</p><p>{totalPrice}</p></div>
            <div><p>скидка:</p><p>{sale}%</p></div>
            <div>промокод: <RangeInput ref={promo}
                                       placeholder='промокод'
                                       width={'300px'}
                                       type='string'/>
                <button className='button-primary' type="submit" style={{width: '410px'}}>Оформить</button>
            </div>
            <div><p>Итоговая стоимость
                с учетом скидки и промокода:</p><p>{totalPrice - (totalPrice / 100 * sale)}</p></div>
        </form>
    );
}

export default Cart;
