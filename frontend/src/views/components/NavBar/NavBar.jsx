import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../../fullLogo.png';
import { slide as Menu } from 'react-burger-menu';

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
  // Add a state to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('authToken') !== null);

  const handleOpen = () => {
    if (!isAnimating) {
      setAnimating(true);
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (!isAnimating) {
      setAnimating(true);
      setOpen(false);
    }
  };

  const handleNavigate = (e) => {
    // block navigation while animating
    if (isAnimating) {
      return;
    }
    e.preventDefault();
    navigate(e.target.value);
    handleClose();
  };

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(sessionStorage.getItem('authToken') !== null);
    };

    // Listen for the custom auth change event
    window.addEventListener('authChange', handleAuthChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // handle the end of the animation
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 200); // match transition time of menu animation in css

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <nav className="NavBar">
      <ul>
        <li>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
        </li>
        <li>
          <Menu 
            right
            isOpen={isOpen}
            onStateChange={({ isOpen }) => setOpen(isOpen)}
            onOpen={handleOpen}
            onClose={handleClose}
          >
            <button className="menu-item" value="/" onClick={handleNavigate}>
              Home
            </button>
            <button className="menu-item" value="/Survey" onClick={handleNavigate}>
              Quiz
            </button>
            <button className="menu-item" value="/Profile" onClick={handleNavigate}>
              Profile
            </button>
            {isLoggedIn ? (
              <button className="menu-item" value='/Logout' onClick={handleNavigate}>
                Logout
              </button>
            ) : (
              <button className="menu-item" value="/Login" onClick={handleNavigate}>
                Login
              </button>
            )}
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
