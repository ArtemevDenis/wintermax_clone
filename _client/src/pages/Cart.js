import React, {useContext, useEffect, useRef, useState} from "react";
import RangeInput from "../components/catalog/filter/RangeInput";
import CartList from "../components/cart/CartList";
import {UserContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

function Cart() {
    const [totalPrice, setTotalPrice] = useState(1000)
    const [sale, setSale] = useState(5)
    const [cart, setCart] = useState([{id: '1213'}, {id: '3454535'}])
    const address = useRef()
    const promo = useRef()

    const [productList, setProductList] = useState(null)
    const {loading, request} = useHttp()
    const user = useContext(UserContext)
    const submitHandler = () => {
    }

    const getCart = async () => {
        try {
            console.log('getCart')
            const data = await request('/api/cart/', 'POST', {userID: user.userID},
                {
                    Authorization: `Bearer ${user.token}`
                })
            console.log(data.productsList)
            setProductList(data.productsList.split(','))
            console.log('productList: ' + productList)
        } catch (e) {
        }
    }

    const deleteItemFromProductList = async (productID) => {
        console.log(productID)
    }



    useEffect(() => {
        getCart()
    }, [])

    return (
        <form onSubmit={submitHandler}>
            <h2>Пользовательские данные</h2>
            <div>Адрес доставки: <RangeInput ref={address}
                                             placeholder='адрес доставки'
                                             width={'300px'}
                                             type='string'/>
            </div>
            <h2>Ваш заказ:</h2>

            {productList && <CartList cart={productList} deleteItem={deleteItemFromProductList}/>}

            <div><p>Итог:</p><p>{totalPrice}</p></div>
            <div><p>скидка:</p><p>{sale}%</p></div>
            <div><p>промокод:</p>
                <div>
                    <RangeInput ref={promo}
                                placeholder='промокод'
                                width={'300px'}
                                type='string'/>
                    <button className='button-primary' type="submit" style={{width: '200px'}}>Добавить промокод</button>
                </div>

            </div>
            <p>Итоговая стоимость
                с учетом скидки и промокода: {totalPrice - (totalPrice / 100 * sale)}</p>

            <button className='button-primary' type="submit" style={{width: '410px'}}>Оформить</button>
        </form>
    );
}

export default Cart;
