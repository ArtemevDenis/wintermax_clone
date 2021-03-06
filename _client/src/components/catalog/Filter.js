import React, {useEffect, useRef} from "react";
import RangeInput from "./filter/RangeInput";
import CheckBox from "./filter/CheckBox";


const Filter = ({filter, setFilter}) => {
    const costMin = useRef();
    const costMax = useRef();
    const isSnowboard = useRef();
    const isSkiing = useRef();
    const isSleigh = useRef();
    const isSkates = useRef();


    const getFilterData = () => {
        if (filter && Array.isArray(filter.types)) {
            filter.types.forEach((type) => {
                if (type === 'snowboard')
                    isSnowboard.current.checked = true
                if (type === 'skiing')
                    isSkiing.current.checked = true
                if (type === 'sleigh')
                    isSleigh.current.checked = true
                if (type === 'skates')
                    isSkates.current.checked = true
            })
            costMin.current.value = filter.minPrice
            costMax.current.value = filter.maxPrice
        }
    }

    useEffect(() => {
        getFilterData()
    }, [filter])

    const handlerSubmit = (e) => {
        e.preventDefault();

        const filterData = {types: []};
        if (isSnowboard.current.checked) {
            filterData.types.push('snowboard')
        }
        if (isSkiing.current.checked) {
            filterData.types.push('skiing')
        }
        if (isSleigh.current.checked) {
            filterData.types.push('sleigh')
        }
        if (isSkates.current.checked) {
            filterData.types.push('skates')
        }

        filterData.minPrice = costMin.current.value;
        filterData.maxPrice = costMax.current.value;
        setFilter(filterData);
    }
    return (
        <form onSubmit={handlerSubmit} className='filter'>
            <h2 className='filter__title'>Фильтры</h2>
            <p className='filter__subtitle'>Цена</p>

            <div className='filter__inputs-block filters__buttons'>
                <RangeInput ref={costMin} placeholder='от'/>
                <span className='filter__separation'>~</span>
                <RangeInput ref={costMax} placeholder='до'/>
            </div>
            <p className='filter__subtitle'>Тип</p>
            <div className='filter__inputs-block filters__checkbox'>
                <CheckBox ref={isSkiing} title={'Лыжи'}/>
                <CheckBox ref={isSleigh} title={'Сани'}/>
                <CheckBox ref={isSnowboard} title={'Сноуборды'}/>
                <CheckBox ref={isSkates} title={'Коньки'}/>
            </div>
            <button className='button-primary' type="submit">Отобрать</button>
        </form>
    )
}

export default Filter