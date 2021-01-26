import React, {useContext, useRef, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";

function SliderEdit() {

    const {request} = useHttp()
    const user = useContext(UserContext)
    const [form, setForm] = useState({
        image: null, link: 0
    })


    const img = useRef();
    const link = useRef();

    const createSlide = () => {

        const formData = new FormData()
        formData.append('imgSlider', img.current.files[0], img.current.files[0].name)
        formData.append('link', link.current.value)
        const dataObj = {link: link.current.value, file: img.current.files[0]}
        console.log(formData)
        // console.log(dataObj)
        //  request('/api/slider/', 'POST', formData)
        fetch('/api/slider/upload', {
            mode: 'no-cors',
            method: 'POST',
            body: formData
        })
    }

    return (
        <div>
            <form>
                <input
                    name='imgSlider'
                    ref={img}
                    type='file'
                />
                <input
                    name='link'
                    ref={link}
                    type='text'/>
            </form>
            <button onClick={() => {
                createSlide()
            }}>Отправить
            </button>
        </div>
    );
}

export default SliderEdit;
