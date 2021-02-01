import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import ProductView from "../components/product/ProductView";

function Product() {
    const productID = useParams().id
    const {request, loading} = useHttp()
    const [product, setProduct] = useState()
    const [productImgs, setProductImgs] = useState()
    const [reviews, setReviews] = useState()

    const getProduct = async () => {
        request(`/api/products/${productID}`, 'GET').then(setProduct)
        request(`/api/products/imgs/${productID}`, 'GET').then(setProductImgs)
        request(`/api/products/reviews/${productID}`, 'GET').then(setReviews)
    }


    useEffect(() => {
        getProduct()
    }, [])

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
