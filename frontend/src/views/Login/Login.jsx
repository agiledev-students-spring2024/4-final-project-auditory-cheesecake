import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://http://134.209.47.131:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (res.status === 201) {
            toast.success('Login successful!');
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.frontendAccessiblePayload));
            window.dispatchEvent(new Event('authChange'));
            navigate('/');
        } else if (res.status >= 400) {
            console.error('Error:', data.message);
            toast.error('Error during login: ' + data.message);
        }
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label className="show-password-checkbox2">
                        <input 
                            type="checkbox" 
                            checked={showPassword} 
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        Show Password
                    </label>
                <button type="submit">Login</button>
                <p>Don't have an account? Create an account <button className="button-link" onClick={() => navigate("/Register")}>here</button>!</p>
            </form>
        </div>
        </div>
    );
};

export default Login;