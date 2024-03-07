import React from 'react';
import './NavBar.css';
import logo from '../../../fullLogo.png'; // Adjust the path as necessary


const NavBar = () => {
    return (
        <nav>
            {/* change styling below w/ tailwind later */}
            <ul style={{ 
                  "display": "flex", 
                  "flexDirection": "row", 
                  "justifyContent": "space-evenly", 
                  "alignItems": "center", 
                  "listStyleType": "none" 
                }}>
                {/* change as needed (we need the actual links below, nothing out of the ordinary) */}
                <div className="logo-container">
                    <img src={logo} alt="Logo" style={{ height: '50px' }} /> {/* Adjust styling as needed */}
                </div>
                <li><a href="/">Home</a></li>
                <li><a href="/survey">Quiz</a></li>
                <li><a href="/Profile">Profile</a></li>
                <li><a href="/Login">
                    <span class="material-symbols-outlined">
                        login
                    </span>
                </a></li>
            </ul>
        </nav>
    );
};

export default NavBar;