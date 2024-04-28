


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
        
        <section className="how-it-really-works">
          <h4>How does it <strong>really</strong> work?</h4>
          <p>
            There has been a lot of research on how music can shape personality. This research dates back to ancient Greece.
            Plato and Aristotle believed music has the power to destroy a society.
            <br></br><br></br>
            They believed that it should be carefully controlled and monitored by the government.
            On the other hand, contemporary psychologist, Steven Pinker, calls music <strong>"auditory cheesecake"</strong>
            <br></br><br></br>
            He believed that music is a byproduct of evolution and does not serve a biological purpose. What do you think?

          </p>
          <br></br>
          <p><strong>Want to learn more about how<br></br> music shapes personality?</strong></p>
          <br></br>
          <p>
            Check out this paper published by the New York University Integrative Psychology Review <a href="https://acrobat.adobe.com/id/urn:aaid:sc:va6c2:016c82c3-36a9-40a2-a261-95559c2714c1?viewer%21megaVerb=group-discover">here</a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
