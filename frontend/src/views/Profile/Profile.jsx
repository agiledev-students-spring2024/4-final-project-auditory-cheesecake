import React from "react";
import './Profile.css'

const Profile = () => {
    const username = 'myUserName';
    const userHandle = '@username';

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
        <a href="#terms">Terms and Conditions</a>
        <button className="delete-btn">Delete Account</button>
      </footer>
    </div>
    );
};

export default Profile;