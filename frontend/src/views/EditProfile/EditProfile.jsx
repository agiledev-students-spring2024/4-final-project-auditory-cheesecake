import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './EditProfile.css';
import axios from 'axios';


const EditProfile = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailValid, setEmailValid] = useState(true); // State to track if the email is valid
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                console.log('User:', user)
                const userId = user.id;
                if (userId) {
                    const response = await axios.get(`http://localhost:1337/api/user/${userId}`);
                    const userData = response.data;
                    console.log('userData: ', userData);
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setUsername(userData.username);
                    setEmail(userData.email);
                    setPhoneNumber(userData.phoneNumber);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };
    const validateFirstName = (firstName) => {
        return firstName.trim() !== '';
    };
    const validateLastName = (lastName) => {
        return lastName.trim() !== '';
    };
    const validateUsername = (username) => {
        return username.trim() !== '' && username.length >= 4;
    };
    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;
        return regex.test(phoneNumber);
    };
    const handleEmailChange = (e) => {
        const newEmail = e.target.value.replace(/\s/g, ''); // Remove all spaces
        setEmail(newEmail);
        setEmailValid(validateEmail(newEmail));
    };
    
    const handlePhoneNumberChange = (e) => {
        const onlyDigits = e.target.value.replace(/[^\d]/g, ''); // Allow only digits, no spaces
        const formattedPhoneNumber = onlyDigits.length <= 10 ? formatPhoneNumber(onlyDigits) : onlyDigits;
        setPhoneNumber(formattedPhoneNumber);
        setPhoneNumberValid(validatePhoneNumber(onlyDigits)); // Validate the cleaned number
    };
    
    const handleUsernameChange = (e) => {
        const newUsername = e.target.value.replace(/\s/g, ''); // Remove all spaces
        setUsername(newUsername);
        setUsernameValid(validateUsername(newUsername));
    };

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

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
        console.log("Form submit initiated");
        e.preventDefault();
        alert('Edit Profile form is submitting');
        if (!emailValid || !firstNameValid || !lastNameValid || !usernameValid || !phoneNumberValid) {
            alert("Please correct the errors in the form.");
            return;
        }
        //API call to the backend registration endpoint
        fetch('http://localhost:1337/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Edit Profile successful');
                // Maybe re-request current user data
                // Update the page
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error while editing user profile');
            });
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
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            setFirstNameValid(validateFirstName(e.target.value));
                        }}
                        required
                    />
                    {!firstNameValid && <p className="error-message">Please enter your first name.</p>}


                    <label htmlFor="LastName">Last Name</label>
                    <input
                        id="LastName"
                        type="text"
                        placeholder="LastName"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            setLastNameValid(validateLastName(e.target.value));
                        }}
                        required
                    />
                    {!lastNameValid && <p className="error-message">Please enter your last name.</p>}

                    <label htmlFor="Username">Username</label>
                    <input
                        id="Username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                    {!usernameValid && <p className="error-message">Username must be at least 4 characters long!</p>}

                    <label htmlFor="Email">Email</label>
                    <input
                        id="Email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {!emailValid && email && 
                        <p className="error-message">Please enter a valid email address.</p>
                    }
                    
                    <label htmlFor="PhoneNumber">Phone Number</label>
                    <input
                        id="PhoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                    />
                    {!phoneNumberValid && <p className="error-message">Please enter a valid phone number.</p>}

                    <button type="submit" disabled={!emailValid || !firstNameValid || !lastNameValid || !usernameValid || !phoneNumberValid}>Update Profile</button>
                    {/* <button type="submit" disabled={!emailValid || !email}>Update Profile</button> */}
                    <p><button onClick={() => navigate("/Profile")} className="button-link">View Profile</button></p>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;