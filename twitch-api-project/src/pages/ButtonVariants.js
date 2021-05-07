import styled from 'styled-components';
import { NavLink as NLink} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';

export const InfoLink = styled(Button)`
    border-radius: 4px;
    background: #6441A4;
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
        color: #6441A4;
    }
`