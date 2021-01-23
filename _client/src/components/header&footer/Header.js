import React from "react";
import Menu from "./Menu";
import ContactData from "./ContactData";
import Logo from "./Logo";

function Header() {
    return (
        <header className='header header-container'>
            <div className='inner header__content'>
                <Logo/>
                <div className='header__right-side'>
                    <ContactData/>
                    <Menu listOrientation={'inline'}/>
                </div>
            </div>
        </header>
    );
}

export default Header;
