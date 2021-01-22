import React, {useEffect, useState} from "react";
import CatalogView from "../components/catalog/CatalogView";
import Filter from "../components/catalog/Filter";
import hotProducts from "../data/fakeProducts";
import {useHttp} from "../hooks/http.hook";

function Catalog() {

    //TODO добавить загрузку товаров с сервера
    const [filter, setFilter] = useState({})
    const [products, setProducts] = useState(hotProducts)

    const {loading, error, request, clearError} = useHttp()

    // const inOrder = (value) => {
    //     console.log(filter)
    //     let min = parseInt(filter.minPrice, 10)
    //     if (filter.minPrice <= 0 || !filter.minPrice)
    //         min = 0;
    //     let max = parseInt(filter.maxPrice, 10)
    //     if (!filter.maxPrice)
    //         max = Infinity;
    //
    //     const filterData = {types: []};
    //     if (!filter.types)
    //         setFilter(filterData)
    //     if (parseInt(value.cost, 10) >= min && parseInt(value.cost, 10) <= max) {
    //         if (!filter.types || filter.types.length === 0)
    //             return value
    //         else if (filter.types.indexOf(value.type) !== -1)
    //             return value
    //     }
    // }

    const getData = async () => {
        try {
            const data = await request('/api/products/filter', 'POST', {filter})
            console.log(data)
            setProducts(data)
        } catch (e) {
            console.error(e)
        }
    }


    const getFilteredData = (newFilter) => {
        setFilter(newFilter)
    }

    // const selectProducts = () => {
    //
    //     setProducts(hotProducts.filter(inOrder))
    //
    // }

    useEffect(() => {

        //    selectProducts()
        getData()
    }, [filter])
    return (
        <div className='catalog'>

            <div className='catalog__filter'><Filter setFilter={getFilteredData}/></div>
            <div className='catalog__list'>{!loading && <CatalogView products={products}/>}</div>
        </div>
    );
}

export default Catalog;
