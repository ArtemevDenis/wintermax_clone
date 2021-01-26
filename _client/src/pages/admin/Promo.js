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

    const createPromo = async (e) => {
        e.preventDefault()
        if (form.secret.trim() !== '' && form.sale >= 0 && form.sale <= 100)
            new Promise(async (resolve, reject) => {
                    try {
                        const data = await request(`/api/promo/create/`, 'POST', {...form},
                            {
                                Authorization: `Bearer ${user.token}`
                            })
                        if (data.code === 200) {
                            resolve(data)
                        }
                    } catch (e) {
                        console.error(e)
                    }
                }
            ).then(r => {
                    console.log(r)
                    getPromoCodes();
                    setForm({
                        secret: '', sale: 0
                    })
                }
            )
    }


    const getPromoCodes = () => {
        new Promise(async (resolve, reject) => {
                try {
                    const data = await request(`/api/promo/all`, 'GET', null,
                        {
                            Authorization: `Bearer ${user.token}`
                        })
                    resolve(data)
                } catch (e) {
                    console.error(e)
                }
            }
        ).then(r => {
                setPromos(r)
            }
        )
    }

    const deletePromo = (promoID) => {
        console.log(1212)
        new Promise(async (resolve, reject) => {
                try {
                    const data = await request(`/api/promo/delete/${promoID}`, 'GET', null,
                        {
                            Authorization: `Bearer ${user.token}`
                        })
                    if (data.code === 200)
                        resolve()
                    else
                        reject('что то пошло не так')
                } catch (e) {
                    console.error(e)
                }
            }
        ).then(r => {
                getPromoCodes()
            }
        ).catch(
            console.log
        )
    }


    useEffect(() => {
        getPromoCodes()
    }, [])
    return (
        <div>
            <h2>Промокоды</h2>
            <form>
                <div>
                    <input id="secret"
                           type="text"
                           name='secret'
                           value={form.secret}
                           onChange={changeHandler}
                    />
                    <label htmlFor="secrete">Название</label>
                </div>
                <div>
                    <input id="sale"
                           type="number"
                           max={100}
                           min={0}
                           name='sale'
                           value={form.sale}
                           onChange={changeHandler}
                    />
                    <label htmlFor="sale">Скидка</label>
                </div>
                <button onClick={createPromo}>Создать промокод</button>
            </form>
            {promos &&
            <ol>
                {promos.map(promo =>
                    <li key={promo.ID}><PromoCode promo={promo} deletePromo={deletePromo}/></li>)}
            </ol>}
        </div>
    );
}

export default Promo;