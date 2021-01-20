import React from "react";
import Menu from "./Menu";
import ContactData from "./ContactData";

function Footer() {
    return (
        <footer className='footer-container footer'>
            <div className='inner footer__content'>
                <div className='footer__item'>
                    <Menu listOrientation={'list'}/>
                </div>
                <div className='footer__item'>
                    <ContactData/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
