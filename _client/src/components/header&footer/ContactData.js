import React from "react";

const ContactData = () => {
    return (
        <div className='contacts'>
            <p className='contacts__item'>тел.: <a className='contacts__link' href='tel:8(999) 999-99-99'>8(999)
                999-99-99</a></p>
            <p className='contacts__item'>email: <a className='contacts__link'
                                                    href='mailto:info@wintermax.ru'>info@wintermax.ru</a></p>
        </div>
    )
}
export default ContactData