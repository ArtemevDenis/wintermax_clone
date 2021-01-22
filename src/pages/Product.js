import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import hotProducts from "../data/fakeProducts";
import ProductView from "../components/product/ProductView";

function Product() {
    const fakeProduct = hotProducts[0];
    const productID = useParams().id
    const {request, loading, error} = useHttp()
    const [product, setProduct] = useState()

    const getProduct = async () => {
        try {
            const data = await request(`/api/products/${productID}`, 'GET',)
            setProduct(data)
        } catch (e) {
            console.log(e)
            // setProduct(fakeProduct)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    // TODO доделать вывод ошибок + дописать api сервера
    // if (error) {
    //     return <>что то пошло не так...</>
    // }
    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && product && <ProductView product={product}/>}
        </>
    );
}

export default Product;
