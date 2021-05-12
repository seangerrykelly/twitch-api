import styled from 'styled-components';
import { NavLink as NLink} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

export const Nav = styled.nav`
    background: #6441A4;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
`

export const NavLink = styled(NLink)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active{
        background: #fff;
        color: #6441A4;
    }
`

export const NavLogoLink = styled(NLink)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 5px 5px 5px 5px;
    cursor: pointer;
`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(NLink)`
    border-radius: 4px;
    background: #6441A4;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    padding: 5px 11px;
    margin-right: 15px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #6441A4;
        padding: 5px 11px;
    }

    &.active{
        background: #fff;
        color: #6441A4;
    }
`

export const GitBtnLink = styled(Button)`
    border-radius: 4px;
    background: #256ce1;
    padding: 5px 11px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`