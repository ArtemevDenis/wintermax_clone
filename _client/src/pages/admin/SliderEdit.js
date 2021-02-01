import React, {useContext, useEffect, useRef, useState} from "react";
import SliderItem from "../../components/admin/SliderItem";
import {UserContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";

function SliderEdit() {

    const img = useRef();
    const link = useRef();

    const [sliders, setSliders] = useState(null)
    const user = useContext(UserContext)
    const {request} = useHttp()

    const createSlide = () => {
        if (img.current.files.length !== 0 && link.current.value !== '')
            new Promise(async resolve => {
                const formData = new FormData()
                formData.append('imgSlider', img.current.files[0], img.current.files[0].name)
                formData.append('link', link.current.value)
                await fetch('/api/slider/upload', {
                    mode: 'no-cors',
                    method: 'POST',
                    body: formData
                })
                resolve('ok')
            })
                .then(getSliders)

    }

    const getSliders = () => {
        request(`/api/slider`, 'GET', null,
            {
                Authorization: `Bearer ${user.token}`
            })
            .then(r => setSliders(r.code))
    }

    const deleteHandler = (promoID) => {
        request(`/api/slider/${promoID}`, 'DELETE', null,
            {
                Authorization: `Bearer ${user.token}`
            })
            .then(getSliders)
    }


    useEffect(() => {
        getSliders()
    }, [])

    return (
        <div className='admin-slider'>
            <form className='admin-slider__form'>
                <label>Изображение: <input
                    className='input'
                    name='imgSlider'
                    ref={img}
                    type='file'
                /></label>
                <label>Ссылка: <input
                    className='input'
                    name='link'
                    ref={link}
                    type='text'/></label>
            </form>
            <button
                className='button-primary'
                onClick={() => {
                    createSlide()
                }}>Отправить
            </button>
            {
                sliders &&
                <div className='admin-slider__list'>
                    {sliders.map((slider, index) =>
                        <SliderItem deleteHandler={deleteHandler} slider={slider} index={index + 1}/>
                    )}
                </div>

            }
        </div>
    );
}

export default SliderEdit;
