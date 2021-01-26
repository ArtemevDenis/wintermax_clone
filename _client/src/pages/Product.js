import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import ProductView from "../components/product/ProductView";

function Product() {
    const productID = useParams().id
    const {request, loading, error} = useHttp()
    const [product, setProduct] = useState()
    const [productImgs, setProductImgs] = useState()
    const [reviews, setReviews] = useState()

    const getProduct = async () => {
        try {
            const product = await request(`/api/products/${productID}`, 'GET');
            const imgs = await request(`/api/products/imgs/${productID}`, 'GET');
            const reviews = await request(`/api/products/reviews/${productID}`, 'GET');
            await setProduct(product);
            await setProductImgs(imgs);
            await setReviews(reviews);
            console.log(reviews)
            console.log(imgs)
        } catch (e) {
            console.log(e)
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
            {!loading && product && <ProductView product={product} imgSet={productImgs} reviews={reviews}/>}
        </>
    );
}

export default Product;
