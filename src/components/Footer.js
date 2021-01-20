import React from "react";
import Main from "../pages/Main";
import Menu from "./header/Menu";
import ContactData from "./header/ContactData";

function Footer() {
    return (
        <footer className='footer'>
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
