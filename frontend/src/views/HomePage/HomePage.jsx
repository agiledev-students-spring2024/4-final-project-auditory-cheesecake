


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('authToken') !== null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(sessionStorage.getItem('authToken') !== null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="home-container">
      <main className="home-content">
        <h2>Unveil the Music of Your Soul!</h2>
        <div className="landing-img">
          <img src="/singleListening.png" alt="Explore your personality" />
        </div>
        <section className="how-it-works">
          <h3>How Does It Work? Just Like Magic!</h3>
          <ul>
            <li>Sign Up and Set the Stage</li>
            <li>Listen to Tunes and Share Your Vibes</li>
            <li>See the Music Color Your Personality</li>
          </ul>
        </section>
        <Link to={isLoggedIn ? "/Survey" : "/Login"} className="btn get-started">
          Dive In!
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
