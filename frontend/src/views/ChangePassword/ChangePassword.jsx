import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './ChangePassword.css';
import axios from 'axios';

const ChangePassword = () => {
    const navigate = useNavigate();

    // const [oldPassword, setOldPassword] = useState('');
    // const [newPassword, setNewPassword] = useState('');
    // const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    const [showOldPassword, setShowOldPassword] = useState(false);   
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');

    const [inputs, setInputs] = useState({
        oldPassword: '', newPassword: '', confirmNewPassword: ''
    });
    
    const [validations, setValidations] = useState({
        oldPasswordValid: false, newPasswordValid: false, confirmNewPasswordValid: false
    });
    const [touched, setTouched] = useState({
        oldPassword: false, newPassword: false, confirmNewPassword: false
    });

    const [userId, setUserId] = useState('');

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) {
            errors.push("be at least 6 characters long");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("contain at least one lowercase letter");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("contain at least one uppercase letter");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("contain at least one digit");
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push("contain at least one special character (!@#$%^&*)");
        }
    
        if (errors.length > 0) {
            return [false, "Your password must " + errors.join(", ") + "."];
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

    const handleChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
        setTouched(prev => ({ ...prev, [field]: true }));
        // Temporarily set new values to ensure up-to-date state for dependent validations
        const newInputs = { ...inputs, [field]: value };
        validateField(field, value, newInputs);

        if (field === 'newPassword') {
            validateField('confirmNewPassword', inputs.confirmNewPassword, newInputs);
        }
    };

    const validateField = (field, value, allInputs) => {
        let isValid = false;
        switch (field) {
            case 'oldPassword':
                isValid = value.trim() !== '';
                break;
            
            case 'newPassword':
                const [isPasswordValid, passwordError] = validatePassword(value);
                isValid = isPasswordValid;
                if (!isValid) {
                    setNewPasswordErrorMessage(passwordError);  // Set a unique error message just for the password
                }
                break;
            case 'confirmNewPassword':
                isValid = value === allInputs.newPassword;
                break;
            default:
                break;
        }
        setValidations(prev => ({ ...prev, [field + 'Valid']: isValid }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validOldPassword = validatePassword(inputs.oldPassword);
        const validNewPassword = validatePassword(inputs.newPassword);
        const validConfirmNewPassword = validatePassword(inputs.confirmNewPassword);
        if (
            validOldPassword[0] === false
        ) {
            toast.error("Your old password is invalid: " + validOldPassword[1]);
            return;
        } else if (validNewPassword[0] === false || 
            validConfirmNewPassword[0] === false)
        {
            toast.error("Invalid password: " + validOldPassword[1]);
            return;
        }

        try {
            const response = await axios.post('http://localhost:1337/api/changePassword', {
                id: userId,
                oldPassword: inputs.oldPassword,
                newPassword: inputs.newPassword,
            });
            toast.success(response.data.message);
            if (response.status === 200) {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            toast.error('Failed to change password: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="change-password">
            <div className="change-password-form-wrapper">
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="Password">Current Password <label className="required-field">*</label></label>
                    <input
                        id="Password"
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Your Current Password"
                        value={inputs.oldPassword}
                        onChange={(e) => handleChange('oldPassword', e.target.value)}
                        required
                    />
                    {touched.oldPassword && !validations.oldPasswordValid && <p className="error-validation-message">Please enter your current password.</p>}
                    <label className="show-password-checkbox">
                        Show Password
                        <input
                            type="checkbox"
                            checked={showOldPassword}
                            onChange={() => setShowOldPassword(!showOldPassword)}
                        />
                    </label>

                    <label htmlFor="Password">New Password <label className="required-field">*</label></label>
                    <input
                        id="NewPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={inputs.newPassword}
                        placeholder="*********"
                        onChange={(e) => handleChange('newPassword', e.target.value)}
                        required
                    />
                    {touched.newPassword && !validations.newPasswordValid && <p className="error-validation-message">{newPasswordErrorMessage}</p>}
                    <label className="show-password-checkbox">
                        Show New Password
                        <input
                            type="checkbox"
                            checked={showNewPassword}
                            onChange={() => setShowNewPassword(!showNewPassword)}
                        />
                    </label>

                    <label htmlFor="ConfirmNewPassword">Confirm New Password <label className="required-field">*</label></label>
                    <input
                        id="ConfirmNewPassword"
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="*********"
                        value={inputs.confirmNewPassword}
                        onChange={(e) => 
                            handleChange('confirmNewPassword', e.target.value)}
                        required
                    />
                    {touched.confirmNewPassword && !validations.confirmNewPasswordValid && <p className="error-validation-message">Passwords do not match.</p>}
                    <label className="show-password-checkbox">
                        Show Password Confirmation
                        <input
                            type="checkbox"
                            checked={showConfirmNewPassword}
                            onChange={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        />
                    </label>
                    <button type="submit" disabled={!Object.values(validations).every(Boolean)}>Change Password</button>

                    <p><button className="button-link" onClick={() => navigate("/Profile")}>View Profile</button></p>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;