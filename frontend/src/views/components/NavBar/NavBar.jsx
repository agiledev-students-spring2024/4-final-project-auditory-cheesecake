import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../../fullLogo.png'; // Adjust the path as necessary

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="NavBar">
            <ul>
                {/* change as needed (we need the actual links below, nothing out of the ordinary) */}
                <div className="logo-container">
                    <img src={logo} alt="Logo" style={{ height: '50px' }} /> {/* Adjust styling as needed */}
                </div>
                <li><button onClick={() => navigate("/")}>Home</button></li>
                <li><button onClick={() => navigate("/Survey")}>Quiz</button></li>
                <li><button onClick={() => navigate("/Profile")}>Profile</button></li>
                <li><button onClick={() => navigate("/Login")}>
                    <span className="material-symbols-outlined">
                        login
                    </span>
                </button></li>
            </ul>
        </nav>
    );
};

export default NavBar;