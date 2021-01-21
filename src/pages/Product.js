import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import hotProducts from "../data/fakeProducts";
import ProductView from "../components/product/ProductView";

function Product() {
    const fakeProduct = hotProducts[0];
    const productID = useParams().id
    const {request, loading, error} = useHttp()
    const [product, setProduct] = useState(fakeProduct)

    const getProduct = useCallback(async () => {
        try {

            const data = await request(`/api/news/${productID}`, 'GET', null,)
            setProduct(data)
            console.log("getting data")
        } catch (e) {
            setProduct(fakeProduct)

        }
    }, [productID, request, fakeProduct])

    useEffect(() => {
        getProduct()
    }, [getProduct])

    // TODO доделать вывод ошибок + дописать api сервера
    // if (error) {
    //     return <>что то пошло не так...</>
    // }
    if (loading) {
        return <Loader/>
    }

    return (
        <ProductView product={product}/>
    );
}

export default Product;
