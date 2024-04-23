import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


    const [inputs, setInputs] = useState({
        firstName: '', lastName: '', email: '', phoneNumber: '',
        username: '', password: '', confirmPassword: ''
    });

    const [validations, setValidations] = useState({
        firstNameValid: false, lastNameValid: false, emailValid: false, phoneNumberValid: false,
        usernameValid: false, passwordValid: false, confirmPasswordValid: false
    });

    const [touched, setTouched] = useState({
        firstName: false, lastName: false, email: false, phoneNumber: false,
        username: false, password: false, confirmPassword: false
    });

    const handleChange = (field, value) => {
        if (field === 'phoneNumber') {
            value = formatPhoneNumber(value);
        } else if (field === 'email' || field === 'username') {
            value = value.replace(/\s/g, '');  // Remove all spaces from email and username
        }
        setInputs(prev => ({ ...prev, [field]: value }));
        setTouched(prev => ({ ...prev, [field]: true }));
        // Temporarily set new values to ensure up-to-date state for dependent validations
        const newInputs = { ...inputs, [field]: value };
        validateField(field, value, newInputs);

        if (field === 'password') {
            validateField('confirmPassword', inputs.confirmPassword, newInputs);
        }
    };

    const validateField = (field, value, allInputs) => {
        let isValid = false;
        switch (field) {
            case 'firstName':
            case 'lastName':
                isValid = value.trim() !== '';
                break;
            case 'email':
                isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                break;
            case 'phoneNumber':
                isValid = /^\d{3}-\d{3}-\d{4}$/.test(value);
                break;
            case 'username':
                isValid = value.trim() !== '' && value.length >= 4;
                break;
            case 'password':
                const [isPasswordValid, passwordError] = validatePassword(value);
                isValid = isPasswordValid;
                if (!isValid) {
                    setPasswordErrorMessage(passwordError);  // Set a unique error message just for the password
                }
                break;
            case 'confirmPassword':
                isValid = value === allInputs.password;
                break;
            default:
                break;
        }
        setValidations(prev => ({ ...prev, [field + 'Valid']: isValid }));
    };
    const cleanPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/[^\d]/g, '');
    };
    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        if (phoneNumberLength < 11) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    };

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

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrorMessage('');

        if (!Object.values(validations).every(Boolean)) {
            setErrorMessage("Please correct the errors in the form.");
            return;
        }
        console.log("Form submit initiated");

        const cleanedPhoneNumber = cleanPhoneNumber(inputs.phoneNumber);
        //API call to the backend registration endpoint
        const res = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                email: inputs.email,
                phoneNumber: cleanedPhoneNumber,
                username: inputs.username,
                password: inputs.password
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
                <form onSubmit={handleSubmit}>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <h5><label className="required-field">*</label> indicates a required field.</h5>
                    <label htmlFor="FirstName">First Name <label className="required-field">*</label></label>
                    <input
                        id="FirstName"
                        type="text"
                        placeholder="First Name"
                        value={inputs.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        required
                    />
                    {touched.firstName && !validations.firstNameValid && <p className="error-validation-message">Your first name is required.</p>}


                    <label htmlFor="LastName">Last Name <label className="required-field">*</label></label>
                    <input
                        id="LastName"
                        type="text"
                        placeholder="Last Name"
                        value={inputs.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        required
                    />
                    {touched.lastName && !validations.lastNameValid && <p className="error-validation-message">Your last name is required.</p>}

                    <label htmlFor="Email">Email <label className="required-field">*</label></label>
                    <input
                        id="Email"
                        type="email"
                        placeholder="Email"
                        value={inputs.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />
                    {touched.email && !validations.emailValid && <p className="error-validation-message">Please enter a valid email address.</p>}

                    <label htmlFor="PhoneNumber">Phone Number <label className="required-field">*</label></label>
                    <input
                        id="PhoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                        value={inputs.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        required
                    />
                    {touched.phoneNumber && !validations.phoneNumberValid && <p className="error-validation-message">Please enter a valid 10-digit US phone number.</p>}

                    <label htmlFor="Username">Username <label className="required-field">*</label></label>
                    <input
                        id="Username"
                        type="text"
                        placeholder="Username"
                        value={inputs.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        required
                    />
                    {touched.username && !validations.usernameValid && <p className="error-validation-message">Username must be at least 4 characters long.</p>}


                    <label htmlFor="Password">Password <label className="required-field">*</label></label>
                    <input
                        id="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={inputs.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        required
                    />
                    {touched.password && !validations.passwordValid && <p className="error-validation-message">{passwordErrorMessage}</p>}
                    <label className="show-password-checkbox">
                        Show Password
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                    </label>

                    <label htmlFor="ConfirmPassword">Confirm Password <label className="required-field">*</label></label>
                    <input
                        id="ConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={inputs.confirmPassword}
                        onChange={(e) => 
                            handleChange('confirmPassword', e.target.value)}
                        required
                    />
                    {touched.confirmPassword && !validations.confirmPasswordValid && <p className="error-validation-message">Passwords do not match.</p>}
                    <label className="show-password-checkbox">
                        Show Password Confirmation
                        <input
                            type="checkbox"
                            checked={showConfirmPassword}
                            onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </label>

                    <button type="submit" disabled={!Object.values(validations).every(Boolean)}>Register</button>

                    <p>Already have an account? Login <button className="button-link" onClick={() => navigate("/Login")}>here</button>!</p>
                </form>
            </div>
        </div>
    );
};

export default Register;