import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
    }

    return (
        <div className="login">
        <div className="login-form-wrapper">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                <p>Don't have an account? Create an account <button className="button-link" onClick={() => navigate("/Register")}>here</button>!</p>
            </form>
        </div>
        </div>
    );
};

export default Login;