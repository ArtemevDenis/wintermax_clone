import React from 'react'

const AdminImg = ({img, deleteHandler}) => {
    return (
        <div
            className='admin-product__img-item'
            onClick={(e) => {
                e.preventDefault()
                deleteHandler(img.ID)
            }}>
            <img
                className='admin-product__img'
                src={'/images/' + img.img} alt=''/>
        </div>
    )
}

export default AdminImg