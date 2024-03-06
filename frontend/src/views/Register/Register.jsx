import React, { useState } from "react";
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validPassword = validatePassword(password);
        if (username.length < 4) {
            alert("Username must be at least 4 characters long!");
            return;
        }
        else if (validPassword[0] === false) {
            alert("Invalid password: " + validPassword[1]);
            return;
        }
        else if (validateEmail(email)) {
            alert("Invalid email!");
            return;
        }
        console.log(email, username, password);
    }

    return (
        <div className="register">
        <div className="register-form-wrapper">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input 
                    id="Email" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <p>Already have an account? Login <a href="/Login">here</a>!</p>
            </form>
        </div>
        </div>
    );
};

export default Register;