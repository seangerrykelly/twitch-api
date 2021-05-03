import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import { Icon, InclineIcon } from '@iconify/react';
import twitchIcon from '@iconify-icons/mdi/twitch';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/Games">
                    <Icon icon={twitchIcon} color="purple"/>
                </NavLink>
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