import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../../fullLogo.png'; // Adjust the path as necessary
import { slide as Menu } from 'react-burger-menu';


const NavBar = () => {
    return (
        <nav className="NavBar">
            <ul>
                {/* change as needed (we need the actual links below, nothing out of the ordinary) */}
                <li>
                    <div className="logo" >
                        <Link to="/">
                            <img src={logo} alt="Logo" style={{ cursor: 'pointer' }}/> {/* Adjust styling as needed */}
                        </Link>
                    </div>
                </li>
                
                <li>
                    <Menu right>
                    <a className="menu-item" href="/">
                        Home
                    </a>
                    <a className="menu-item" href="/Survey">
                        Quiz
                    </a>
                    <a className="menu-item" href="/Profile">
                        Profile
                    </a>
                    <a className="menu-item" href="/Login">
                        Login
                        <span className="material-symbols-outlined">
                            login
                        </span>   
                    </a>
                    </Menu>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;