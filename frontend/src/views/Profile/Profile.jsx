import React from "react";
import './Profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {
    const username = 'myUserName';
    const userHandle = '@username';

    return (
        <div className="profile-container">
      <header className="profile-header">
        <h1>View User Profile</h1>
      </header>
      
      <div className="profile-info">
        <img 
          src="https://picsum.photos/200" 
          alt="Profile" 
          className="profile-pic" 
        />
        <h2>{username}</h2>
        <p>{userHandle}</p>
        <Link to="/EditProfile" className="button">Edit Profile</Link>
      </div>
      
      <div className="profile-actions">
        <button>View Your Results</button>
        <button>Settings</button>
        <button>Change Password</button>
      </div>
      
      <footer className="profile-footer">
        <a href="#terms">Terms and Conditions</a>
        <br></br>
        <br></br>
        <button className="delete-btn">Delete Account</button>
      </footer>
    </div>
    );
};

export default Profile;