import React, {useEffect, useState} from "react";
import CatalogView from "../components/catalog/CatalogView";
import Filter from "../components/catalog/Filter";
import hotProducts from "../data/fakeProducts";

function Catalog() {
    const [filter, setFilter] = useState({})
    const [products, setProducts] = useState(hotProducts)

    const inOrder = (value) => {
        let min = parseInt(filter.minPrice, 10)
        if (filter.minPrice <= 0 || !filter.minPrice)
            min = 0;
        let max = parseInt(filter.maxPrice, 10)
        if (!filter.maxPrice)
            max = Infinity;

        const filterData = {types: []};
        console.log('filter')
        console.log(filter)
        if (!filter.types)
            setFilter(filterData)
        console.log('filter')
        console.log(filter)
        if (parseInt(value.cost, 10) >= min && parseInt(value.cost, 10) <= max) {
            if (!filter.types || filter.types.length === 0)
                return value
            else if (filter.types.indexOf(value.type) != -1)
                return value
        }
    }

    const selectProducts = () => {

        setProducts(hotProducts.filter(inOrder))

    }

    useEffect(() => {
        selectProducts()
    }, [filter])
    return (
        <div className='catalog'>
            <div className='catalog__filter'><Filter setFilter={setFilter}/></div>
            <div className='catalog__list'><CatalogView products={products}/></div>
        </div>
    );
}

export default Catalog;
