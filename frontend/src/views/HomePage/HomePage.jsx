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
        <h2>Discover Your Soul's Melody</h2>
        <div className="landing-img">
          <img src="/singleListening.png" alt="personality" />
        </div>
        <section className="how-it-works">
          <h3>How it works</h3>
          <ul>
            <li>Create Profile</li>
            <li>Listen & Respond</li>
            <li>Discover Your Personality</li>
          </ul>
        </section>
        <Link to={isLoggedIn ? "/Survey" : "/Login"} className="btn get-started">
          Get Started
        </Link>
        <section className="features">
          <h3>Features</h3>
          <p>Enim sit amet venenatis urna cursus. Adipiscing elit ut aliquam purus sit.</p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
