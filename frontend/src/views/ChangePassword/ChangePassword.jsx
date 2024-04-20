import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './ChangePassword.css';
import axios from 'axios';

const ChangePassword = () => {
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [userId, setUserId] = useState('');

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

    useEffect(() => {
        const user = JSON.parse (sessionStorage.getItem('user')); 
        if (user && user.id) {
            setUserId(user.id);
            console.log('User ID:', user.id);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validOldPassword = validatePassword(oldPassword);
        const validNewPassword = validatePassword(newPassword);
        const validConfirmNewPassword = validatePassword(confirmNewPassword);
        if (
            validOldPassword[0] === false || 
            validNewPassword[0] === false || 
            validConfirmNewPassword[0] === false
        ) {
            toast.error("Invalid password: " + validOldPassword[1], {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:1337/api/changePassword', {
                id: userId,
                oldPassword,
                newPassword
            });
            toast.info(response.data.message, {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            if (response.status === 200) {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            toast.error('Failed to change password: ' + (error.response ? error.response.data.message : error.message), {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="change-password">
            <div className="change-password-form-wrapper">
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Password">Password</label>
                    <input 
                        id="OldPassword" 
                        type="password" 
                        placeholder="Old Password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <input 
                        id="Password" 
                        type="password" 
                        placeholder="New Password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input 
                        id="Password" 
                        type="password" 
                        placeholder="Password" 
                        value={confirmNewPassword} 
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Change Password</button>
                    <p><button className="button-link" onClick={() => navigate("/Profile")}>View Profile</button></p>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;