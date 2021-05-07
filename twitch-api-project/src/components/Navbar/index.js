import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, GitBtnLink, NavLogoLink } from './NavbarElements';
import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLogoLink  to="/">
                    <div className="nav-home-link">
                        <i className="fab fa-twitch"/>
                    </div>
                </NavLogoLink>
                <Bars/>
                <NavMenu>
                    <NavBtnLink to="/Games" activeStyle>
                        Games
                    </NavBtnLink>
                    <NavBtnLink to="/Streams" activeStyle>
                        Streams
                    </NavBtnLink>
                </NavMenu>
                <NavBtn>
                    <GitBtnLink to="/signin">GitHub</GitBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar;