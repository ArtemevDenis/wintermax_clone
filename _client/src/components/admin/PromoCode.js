import React from "react";

function PromoCode({promo, deletePromo}) {
    return (
        <div>
            ID №{promo.ID}, кодовое слово: {promo.secret} , скидка: {promo.sale}
            <button onClick={() => deletePromo(promo.ID)}>удалить</button>
        </div>
    );
}

export default PromoCode;
