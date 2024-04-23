import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userId = userData && userData.id;
    console.log('User ID:', userId);
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/user/${userId}`);
          setUser(response.data);
          console.log('User data: ', response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
      fetchUserData();
    } 
  }, []);

  const handleFileSelect = async (event) => {
    
    if (!user._id) {
      console.error('user data is not loaded yet');
      return;
    }
  
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = reader.result;
  
      try {
        const response = await axios.post(`http://localhost:1337/api/user/${user._id}/profilePicture`, {
          profilePicture: base64String,
        });
  
        setUser(prevUser => ({ ...prevUser, profilePicture: response.data.profilePicture }));
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error converting image to base64:', error);
    };
  };
  
  

  const handleTermsToggle = () => setShowTerms(!showTerms);

  const closeOverlay = (e) => {
    if (e.target.id === 'overlay-background') {
      setShowTerms(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        {/* <header className="profile-header">
          <h2>Your Profile</h2>
        </header> */}

        {user ? (
          <div className="profile-info">
            <h3>{user.firstName} {user.lastName}</h3>
            
            <div className="profile-pic-container">
              <img
                src={user?.profilePicture || 'https://picsum.photos/200'}
                alt="Profile"
                className="profile-pic"
              />
              <div className="profile-pic-overlay" onClick={() =>  fileInputRef.current.click()}>
                <div>Edit Profile Picture</div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
            <p>@{user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phoneNumber}</p>
            <Link to="/EditProfile" className="btn">Edit Profile</Link>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className="profile-actions">
          <Link to="/Results" className="btn">Results</Link>
          {/* <Link to="/Settings" className="btn">Settings</Link> */}
          <Link to="/ChangePassword" className="btn">Change Password</Link>
        </div>

        <footer className="profile-footer">
          <a href="#terms" onClick={(e) => { e.preventDefault(); handleTermsToggle(); }}>Terms and Conditions</a>
          <br />
          <br />
          <button className="delete-btn">Delete Account</button>
        </footer>

        {showTerms && (
          <div className="terms-overlay" id="overlay-background" onClick={closeOverlay}>
            <div className="terms-content" onClick={(e) => e.stopPropagation()}>
              <span className="terms-close" onClick={handleTermsToggle}>&times;</span>
              <h2>Terms and Conditions</h2>
              <p>Here are the terms and conditions... Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
