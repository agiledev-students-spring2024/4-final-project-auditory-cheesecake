import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EditProfile.css';

const EditProfile = () => {
    const [email, setEmail] = useState('first.last@email.com');
    const [username, setUsername] = useState('myUserName');
    const [firstName, setFirstName] = useState('First');
    const [lastName, setLastName] = useState('Last');
    const [phoneNumber, setPhoneNumber] = useState('1234567890');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return email.search(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    }
    // const validateFirstName = (firstName) => {
    //     // Check if firstName is not null, undefined, and not an empty string
    //     return firstName !== null && firstName !== undefined && firstName.trim() !== '';
    // }
    // const validateLastName = (lastName) => {
    //     return lastName !== null && lastName !== undefined && lastName.trim() !== '';
    // }
    // const validatePhoneNumber = (phoneNumber) => {
    //     // Notice the escaped + character and the use of .test() instead of .search()
    //     const regex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;
    //     return regex.test(phoneNumber);
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length < 4) {
            alert("Username must be at least 4 characters long!");
            return;
        }
        else if (validateEmail(email)) {
            alert("Invalid email!");
            return;
        }
        // else if (validateFirstName(firstName)) {
        //     alert("Please enter your first name.");
        //     return;
        // }
        // else if (validateLastName(lastName)) {
        //     alert("Please enter your last name.");
        //     return;
        // }
        // else if (validatePhoneNumber(phoneNumber)) {
        //     alert("Please enter your phone number.");
        //     return;
        // }
    
        console.log(email, username);
    }

    return (
        <div className="edit-profile">
        <div className="edit-profile-form-wrapper">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="FirstName">First Name</label>
                <input 
                    id="FirstName" 
                    type="text" 
                    placeholder="FirstName" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="LastName">Last Name</label>
                <input 
                    id="LastName" 
                    type="text" 
                    placeholder="LastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label htmlFor="Username">Username</label>
                <input 
                    id="Username" 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="Email">Email</label>
                <input 
                    id="Email" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="PhoneNumber">Phone Number</label>
                <input 
                    id="PhoneNumber" 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <button type="submit">Update Profile</button>
                <p><button onClick={() => navigate("/Profile")} className="button-link">View Profile</button></p>
            </form>
        </div>
        </div>
    );
};

export default EditProfile;