import React, {useRef} from "react";
function SliderEdit() {

    const img = useRef();
    const link = useRef();

    const createSlide = () => {

        const formData = new FormData()
        formData.append('imgSlider', img.current.files[0], img.current.files[0].name)
        formData.append('link', link.current.value)
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
