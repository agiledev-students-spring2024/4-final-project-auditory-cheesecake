import React, { useState } from "react";
import './Profile.css'

const Profile = () => {
    const [showTerms, setShowTerms] = useState(false);

    const username = 'myUserName';
    const userHandle = '@username';

    const handleTermsToggle = () => setShowTerms(!showTerms);
    //handle clicks outisde overlay to close the overlay
    const closeOverlay = (e) => {
      if (e.target.id === "overlay-background") {
          setShowTerms(false);
      }
  };

    return (
        <div className="profile-container">
      <header className="profile-header">
        <h1>View User Profile</h1>
        {/* Add your navigation icon and close icon here */}
      </header>
      
      <div className="profile-info">
        <img 
          src="https://picsum.photos/200" 
          alt="Profile" 
          className="profile-pic" 
        />
        <h2>{username}</h2>
        <p>{userHandle}</p>
        <button className="edit-btn">Edit Profile</button>
      </div>
      
      <div className="profile-actions">
        <button>View Your Results</button>
        <button>Settings</button>
        <button>Change Password</button>
      </div>
      
      <footer className="profile-footer">
        <a href="#terms" onClick={(e) => {e.preventDefault(); handleTermsToggle();}}>Terms and Conditions</a>
        <br></br>
        <br></br>
        <button className="delete-btn">Delete Account</button>
      </footer>
      {/* Overlay for T&C */}
      {showTerms && (
        <div className="terms-overlay" id="overlay-background" onClick={closeOverlay}>
          <div className="terms-content" onClick={(e) => e.stopPropagation()}>
          <span className="terms-close" onClick={handleTermsToggle}>&times;</span>
              <h2>Terms and Conditions</h2>
              {/* T&C Content */}
              <p>Here are the terms and conditions... Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
          </div>
            )}
    </div>
    );
};

export default Profile;