import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Logo } from '../../images/burger-menu.svg';
import SideMenu from '../SideMenu/SideMenu';
import './navbar-styles.scss';

const Navbar = () => {
    const [navbarBg, setNavbarBg] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);

    const handleNavBg = () => {
        if (window.scrollY >= 20) {
            setNavbarBg(true);
        } else {
            setNavbarBg(false);
        }
    };
    window.addEventListener('scroll', handleNavBg);

    const handleMenu = () => {
        if (!sideMenu) {
            setSideMenu(true);
        } else {
            setSideMenu(false);
        }
    };

    let menuRef = useRef();

    useEffect(() => {
        let closeMenuWhenClickOutside = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setSideMenu(false);
            }
        }

        document.addEventListener("mousedown", closeMenuWhenClickOutside)

        return () => {
            document.removeEventListener("mousedown", closeMenuWhenClickOutside)
        }
    });

    return (
        <header>
            <nav className={navbarBg ? "navbar active" : "navbar"}>
                <div className="navigation-container">
                    <ul>
                        <li><a href="https://www.linkedin.com/in/fabricio-cunha-7b7392162" rel="noopener noreferrer" target="_blank">Linkedin</a></li>
                        <li><a href="https://github.com/fabriciocunhauk" rel="noopener noreferrer" target="_blank">GitHub</a></li>
                        <li><a href="https://www.instagram.com/fabs.dev" rel="noopener noreferrer" target="_blank">Instagram</a></li>
                    </ul>
                </div>
                <div className="transition-div">
                    <Logo
                        className={sideMenu ? "burger-svg-hide" : "burger-svg"}
                        onClick={handleMenu}
                    />
                </div>
                <SideMenu
                    toggleSideMenu={sideMenu}
                    myRef={menuRef}
                    closeMenuByLinkClick={handleMenu}
                    handleClosingButton={handleMenu}
                />
            </nav>
        </header>
    )
};

export default Navbar;
