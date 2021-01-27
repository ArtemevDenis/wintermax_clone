import React, {useRef} from "react";
import {useParams} from "react-router-dom";

function AdminProduct() {

    const productID = useParams().id
    const title = useRef()
    const cost = useRef()
    const description = useRef()
    const files = useRef()
    const type = useRef()

    const sendProductData = () => {
        const formData = new FormData()

        for (let i = 0; i < files.current.files.length; i++) {
            formData.append("pictures", files.current.files[i]);
        }

        formData.append('title', title.current.value)
        formData.append('description', description.current.value)
        formData.append('cost', cost.current.value)
        formData.append('type', type.current.value)
        formData.append('productID', productID)
        fetch('/api/products/create', {
            mode: 'no-cors',
            method: 'POST',
            body: formData
        })
    }

    return (
        <div>
            <div>
                <input type='text' ref={title}/>
                <textarea type='text' ref={description}/>
                <input type='number' min={0} ref={cost}/>
                <input type='file' multiple ref={files}/>
                <select
                    className='select'
                    ref={type}
                >
                    <option value="snowboard">snowboard</option>
                    <option value="skiing">skiing</option>
                    <option value="sleigh">sleigh</option>
                    <option value="skates">skates</option>
                </select>
                <button onClick={e => {
                    e.preventDefault()
                    sendProductData()
                }}>отправить
                </button>
            </div>
            AdminProduct
        </div>
    );
}

export default AdminProduct;
