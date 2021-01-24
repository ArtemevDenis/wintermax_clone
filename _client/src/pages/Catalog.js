import React, {useEffect, useState} from "react";
import CatalogView from "../components/catalog/CatalogView";
import Filter from "../components/catalog/Filter";
import {useHttp} from "../hooks/http.hook";

function Catalog() {

    //TODO добавить загрузку товаров с сервера
    const [filter, setFilter] = useState(() => {
        const filter = JSON.parse(localStorage.getItem('filter'))
        if (filter)
            return filter
        return {types: [], minPrice: "", maxPrice: ""}
    })
    const [products, setProducts] = useState({})

    const {loading, error, request, clearError} = useHttp()

    const getData = async () => {
        try {
            const data = await request('/api/products/filter', 'POST', {filter})
            await setProducts(data)
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        getData().then(() => {
            clearError()
        })
    }, [filter, clearError, error])

    useEffect(() => {
        localStorage.setItem('filter', JSON.stringify(filter))
    }, [filter])


    useEffect(() => {
        const filterData = JSON.parse(localStorage.getItem('filter'))

        if (JSON.stringify(filterData) !== JSON.stringify(filter)) {
            filterData.maxPrice && filterData.minPrice && filterData.types
                ? setFilter(filterData)
                : setFilter({types: null, minPrice: null, maxPrice: null})
        }
    }, [])


    return (
        <div className='catalog'>
            {error}
            <div className='catalog__filter'><Filter filter={filter} setFilter={setFilter}/></div>
            <div className='catalog__list'>{!loading && <CatalogView products={products}/>}</div>
        </div>
    );
}

export default Catalog;
