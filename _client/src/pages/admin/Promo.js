import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";
import PromoCode from "../../components/admin/PromoCode";

function Promo() {

    const user = useContext(UserContext)
    const {request} = useHttp()

    const [form, setForm] = useState({
        secret: '', sale: 0
    })

    const [promos, setPromos] = useState(null)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const createPromo = (e) => {
        e.preventDefault()
        if (form.secret.trim() !== '' && form.sale >= 0 && form.sale <= 100)
            request(`/api/promo/create/`, 'POST', {...form},
                {
                    Authorization: `Bearer ${user.token}`
                })
                .then(() => {
                        getPromoCodes();
                        setForm({
                            secret: '', sale: 0
                        })
                    }
                )
    }


    const getPromoCodes = () => {
        request(`/api/promo/all`, 'GET', null,
            {
                Authorization: `Bearer ${user.token}`
            })
            .then(setPromos)
    }

    const deletePromo = (promoID) => {
        request(`/api/promo/delete/${promoID}`, 'GET', null,
            {
                Authorization: `Bearer ${user.token}`
            })
            .then(getPromoCodes)
    }


    useEffect(() => {
        getPromoCodes()
    }, [])
    return (
        <div className='admin-promo'>
            <h2 className='admin-promo__title'>Промокоды</h2>
            <form>
                <label>Название:<input

                    className='input'
                    id="secret"
                    type="text"
                    name='secret'
                    value={form.secret}
                    onChange={changeHandler}
                /></label>


                <label>Скидка:<input
                    className='input'
                    id="sale"
                    type="number"
                    max={100}
                    min={0}
                    name='sale'
                    value={form.sale}
                    onChange={changeHandler}
                /></label>
                <button className='button-primary' onClick={createPromo}>Создать промокод</button>
            </form>
            {promos &&
            <div className='admin-promo__list'>
                {promos.map((promo, index) =>
                    <PromoCode key={promo.ID} promo={promo} deletePromo={deletePromo} index={index + 1}/>)}
            </div>}
        </div>
    );
}

export default Promo;