import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavLogoLink } from './NavbarElements';
import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLogoLink className="nav-home-link" to="/">
                    <i className="fab fa-twitch"/>
                </NavLogoLink>
                <Bars/>
                <NavMenu>
                    <NavLink to="/Games" activeStyle>
                        Games
                    </NavLink>
                    <NavLink to="/Streams" activeStyle>
                        Streams
                    </NavLink>
                    <NavLink to="/Channels" activeStyle>
                        Channels
                    </NavLink>
                    <NavLink to="/Games" activeStyle>
                        GitHub
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar;