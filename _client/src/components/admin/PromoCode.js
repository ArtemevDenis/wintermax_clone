import React from "react";

const PromoCode = ({promo, deletePromo, index}) => {
    return (
        <>
            <div>{index}</div>
            <div>{promo.secret}</div>
            <div>{promo.sale}</div>
            <button
                className='button-danger'
                onClick={(e) => {
                    e.preventDefault();
                    deletePromo(promo.ID)
                }}>
                удалить
            </button>
        </>
    );
}

export default PromoCode;
