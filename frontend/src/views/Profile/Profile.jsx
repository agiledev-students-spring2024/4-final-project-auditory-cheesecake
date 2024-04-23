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
        <header className="profile-header">
          <h2>View User Profile</h2>
        </header>

        {user ? (
          <div className="profile-info">
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
            <h2>{user.firstName} {user.lastName}</h2>
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
          <Link to="/Settings" className="btn">Settings</Link>
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
              <p>
Welcome to <strong>Auditory Cheesecake!</strong> These Terms and Conditions outline the rules and regulations for the use of our web-app.
By accessing this app, we assume you accept these terms and conditions. Do not continue to use Auditory Cheesecake if you do not agree to take all of the terms and conditions stated on this page.</p>
<p>
<strong>Account Creation:</strong> Users must be at least 13 years old to create an account on Auditory Cheesecake. By creating an account, you declare you are over the age of 13. Each user must provide a valid email address and accurate information about themselves.
</p><p><strong>Account Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
</p><p><strong>User Content:</strong>
Surveys and Responses: Users can participate in assesments about their music tastes. The responses to these surveys are saved to the user's profile and can be used by Auditory Cheesecake to personalize recommendations and improve service offerings.
Ownership and Rights: Users retain ownership of the data they provide but grant Auditory Cheesecake a worldwide, perpetual, irrevocable, royalty-free license to use, store, and reproduce the data for the purposes of providing and improving the app's services.
</p>
<p><strong>Prohibited Uses:</strong>
You may not use our service:
In any way that breaches any applicable local, national or international law or regulation.
In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect.
To upload, host, use, publish, share, or otherwise transmit data that contains viruses or other malicious code or harmful components.
</p>
<p><strong>Privacy Policy:</strong>
Please refer to our Privacy Policy for information on how we collect, use, and share your data.
Disclaimers and Limitations of Liability:

Services Provided "As Is": The services are provided "as is" and "as available" without any warranties, express or implied.
Limitation of Liability: Auditory Cheesecake will not be liable for any damages or loss resulting from your use of the app</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
