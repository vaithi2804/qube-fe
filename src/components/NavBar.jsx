import React from 'react';
import '../Css/navBar.css';

const NavBarComponent = ({heading}) => {
    return (
        <nav className="navbar menu-bar-base">
            <a className="navbar-brand ms-3" href="/">
                <h3 className="m-0 nav-bar-font">{heading}</h3>
            </a>
        </nav>
    );
};

export default NavBarComponent;
