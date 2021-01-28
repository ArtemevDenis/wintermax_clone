import React from 'react'

const SliderItem = ({slider, index, deleteHandler}) => {
    return (
        <>
            <div>{index}</div>
            <div>{slider.link}</div>
            <button
                className='button-danger'
                onClick={(e) => {
                    e.preventDefault()
                    deleteHandler(slider.ID)
                }}>
                Удалить
            </button>
        </>
    )
}

export default SliderItem