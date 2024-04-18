import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        return email.search(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    }

    const validatePassword = (password) => {
        if (password.length < 6) {
            return [false, "your password must be at least 6 characters long!"];
        }
        else if (password.search(/[a-z]/) < 0) {
            return [false, "your password must contain at least one lowercase letter!"];
        }
        else if (password.search(/[A-Z]/) < 0) {
            return [false, "your password must contain at least one uppercase letter!"];
        }
        else if (password.search(/[0-9]/) < 0) {
            return [false, "your password must contain at least one digit!"];
        }
        else if (password.search(/[!@#$%^&*]/) < 0) {
            return [false, "your password must contain at least one special character (!@#$%^&*)!"];
        }
        return [true, ""];
    }

    const handleSubmit = async (e) => {
        console.log("Form submit initiated");
        e.preventDefault();
        setErrorMessage('');

        const validPassword = validatePassword(password);
        if (username.length < 4) {
            setErrorMessage("Username must be at least 4 characters long!");
            return;
        }
        else if (validPassword[0] === false) {
            setErrorMessage("Invalid password: " + validPassword[1]);
            return;
        }
        else if (validateEmail(email)) {
            setErrorMessage("Invalid email!");
            return;
        }
        //console.log(email, username, password);

        //API call to the backend registration endpoint
        const res = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (res.status === 201) {
            console.log('Registration successful');
            navigate('/Login'); //redirect to login page
        } else if (res.status >= 400) {
            console.error('Error:', data.message);
            setErrorMessage('Error during registration: ' + data.message);
        }
    };

    return (
        <div className="register">
            <div className="register-form-wrapper">
                <h1>Register</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                <label htmlFor="FirstName">First Name</label>
                    <input
                        id="FirstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label htmlFor="LastName">Last Name</label>
                    <input
                        id="LastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <label htmlFor="Password">Password</label>
                    <input
                        id="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                     <label className="show-password-checkbox">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        Show Password
                    </label>
                    <button type="submit">Register</button>
                    <p>Already have an account? Login <button className="button-link" onClick={() => navigate("/Login")}>here</button>!</p>
                </form>
            </div>
        </div>
    );
};

export default Register;