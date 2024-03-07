import React, { useState } from "react";
import './ChangePassword.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
        const validOldPassword = validatePassword(oldPassword);
        const validNewPassword = validatePassword(newPassword);
        const validConfirmNewPassword = validatePassword(confirmNewPassword);
        if (validOldPassword[0] === false) {
            alert("Invalid password: " + validOldPassword[1]);
            return;
        } else if (validNewPassword[0] === false) {
            alert("Invalid password: " + validOldPassword[1]);
            return;
        } else if (validConfirmNewPassword[0] === false) {
            alert("Invalid password: " + validOldPassword[1]);
            return;
        }
    }

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
                    <p><a href="/Profile">View Profile</a></p>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;