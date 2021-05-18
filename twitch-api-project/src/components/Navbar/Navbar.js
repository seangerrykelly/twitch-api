import React from 'react';
import {Button} from 'react-bootstrap';
import {NavMenuItems} from './NavMenuItems';
import { NavLink } from 'react-router-dom';
import SearchField from 'react-search-field';
import './Navbar.css';

class Navbar extends React.Component {
    
    state = { clicked: false }
    
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    onSearchEnter(value, event) {
        window.location.href = "/search/" + value;
    }

    onSearchClick(value) {
        window.location.href = "/search/" + value;
    }

    onSearchChanged(value, event) {

    }

    render() {
        return (
            <>
                <nav className="NavbarItems">
                    <NavLink className="nav-home-link" to="/">
                        <i className="fab fa-twitch"/>
                    </NavLink>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                    <ul className={this.state.clicked ? "nav-menu active": "nav-menu"}>
                        {NavMenuItems.map((item, index) => {
                            return (
                                    <li key={index}>
                                        <NavLink className={item.cName} to={item.url}>
                                            {item.title}
                                        </NavLink>
                                    </li>
                            )
                        })}
                    </ul>
                    <SearchField
                        classNames="search-field"
                        placeholder="Search"
                        onChange={this.onSearchChanged}
                        onEnter={this.onSearchEnter}
                        onSearchClick={this.onSearchClick}
                    />
                    {/* <nav className="github-nav-link-container">
                        <Button className="github-nav-link" href="https://github.com/seangerrykelly/twitch-api">GitHub</Button>
                    </nav> */}
                </nav>
            </>
        )
    }
}

export default Navbar;