import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {UserContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import AdminProductItem from "../../components/admin/AdminProductItem";

function Goods() {

    const user = useContext(UserContext)
    const [allProducts, setAllProducts] = useState(null)

    const {request} = useHttp()
    useEffect(() => {
        getAllProducts()
    }, [])


    const getAllProducts = () => {
        const filter = {
            types: [],
            minPrice: 0,
            maxPrice: Number.MAX_VALUE
        }
        new Promise(async resolve => {
            const data = await request('/api/products/all', 'GET', null,
                {
                    Authorization: `Bearer ${user.token}`
                })
            console.log(data)
            if (data)
                resolve(data)
        }).then(r => setAllProducts(r))
    }

    const deleteHandler = (productID) => {
        new Promise(async resolve => {
            const data = await request(`/api/products/${productID}`, 'DELETE', null,
                {
                    Authorization: `Bearer ${user.token}`
                })
            console.log(data)
            if (data)
                resolve(data)
        }).then(r => {
            getAllProducts()
        })
    }

    return (
        <div className='goods'>
            <div className='goods__line'><h2 className='goods__title'>Товары:</h2>
                <NavLink
                    className='button-primary'
                    to='/admin/goods/create'>Создать товар</NavLink>
            </div>

            {allProducts && allProducts.map((product, index) =>
                <AdminProductItem product={product} index={index + 1} deleteHandler={deleteHandler}/>)}
        </div>
    );
}

export default Goods;
