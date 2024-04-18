import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../../fullLogo.png';
import { slide as Menu } from 'react-burger-menu';

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isAnimating, setAnimating] = useState(false);

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
            <button className="menu-item" value="/Login" onClick={handleNavigate}>
              Login
            </button>
            <button className="menu-item" value='/Logout' onClick={handleNavigate}>
              Logout
            </button>
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
