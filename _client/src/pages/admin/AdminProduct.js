import React, {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";
import AdminImg from "../../components/admin/AdminImg";

function AdminProduct() {

    const productID = useParams().id
    const title = useRef()
    const cost = useRef()
    const description = useRef()
    const files = useRef()
    const type = useRef()

    const {request} = useHttp()
    const user = useContext(UserContext)

    const [imgs, setImgs] = useState(null)

    const sendProductData = () => {
        const formData = new FormData()

        for (let i = 0; i < files.current.files.length; i++) {
            formData.append("pictures", files.current.files[i]);
        }
        const consFinal = cost.current.value < 4294967294 ? cost.current.value : 4294967294

        formData.append('title', title.current.value)
        formData.append('description', description.current.value)
        formData.append('cost', consFinal)
        formData.append('type', type.current.value)
        formData.append('productID', productID)
        fetch('/api/products/create', {
            mode: 'no-cors',
            method: 'POST',
            body: formData
        })
    }

    const loadData = () => {
        if (productID !== 'create')
            new Promise(async (resolve, reject) => {
                const data = await request(`/api/products/${productID}`, "GET", null,
                    {
                        Authorization: `Bearer ${user.token}`
                    })
                console.log(data)
                if (data)
                    resolve(data)
            }).then(r => {
                    title.current.value = r.title;
                    cost.current.value = r.cost;
                    description.current.value = r.description;
                    type.current.value = r.type;
                    loadImg()
                }
            )
    }
    const loadImg = () => {
        new Promise(async (resolve, reject) => {
            const data = await request(`/api/products/imgs/${productID}`, "GET", null,
                {
                    Authorization: `Bearer ${user.token}`
                })
            console.log(data)
            if (data)
                resolve(data)
        }).then(r => {
                setImgs(r)
            }
        )
    }

    useEffect(() => {
        loadData()
        loadImg()
    }, [])


    const deleteImgHandler = (imgID) => {
        new Promise(async (resolve, reject) => {
            const data = await request(`/api/products/imgs/delete/${imgID}`, "DELETE", null,
                {
                    Authorization: `Bearer ${user.token}`
                })
            console.log(data)
            if (data)
                resolve(data)
        }).then(() => {
                loadImg()
            }
        )
    }

    return (
        <div className='admin-product'>
            <div className='admin-product__form'>
                <label>Название: <input className='input' type='text' ref={title}/></label>
                <label>Описание: <textarea className='textarea' ref={description}/></label>
                <label>Стоимость: <input className='input' type='number' min={0} max={4294967294} ref={cost}/></label>
                <label>Изображения: <input className='input' type='file' multiple ref={files}/></label>
                <label>Тип:<select
                    className='select'
                    ref={type}
                >
                    <option value="snowboard">snowboard</option>
                    <option value="skiing">skiing</option>
                    <option value="sleigh">sleigh</option>
                    <option value="skates">skates</option>
                </select> </label>
                <button
                    className='button-primary'
                    onClick={e => {
                        e.preventDefault()
                        sendProductData()
                    }}>отправить
                </button>
            </div>
            {imgs &&
            <div className='admin-product__img-list'>
                {imgs.map(img => {
                    return <AdminImg
                        key={img.ID}
                        img={img}
                        deleteHandler={deleteImgHandler}/>
                })}
            </div>
            }
        </div>
    );
}

export default AdminProduct;
