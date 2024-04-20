import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: sessionStorage.getItem('authToken')
                    })
                });
                const data = await response.json();
                if (response.status === 200) {
                    sessionStorage.removeItem('authToken');
                    sessionStorage.removeItem('user');
                    toast.success('Logout successful, redirecting to homepage.');
                    // Redirect to the homepage after successful logout
                    navigate('/');
                } else {
                    console.error('Logout failed:', data.message);
                    throw new Error('Failed to logout');
                }
            } catch (error) {
                console.error('Logout error:', error);
                toast.error('Logout failed. Please try again.');
                // Redirect to the homepage after successful logout
                navigate('/');
            }
        }
        logout();
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default Logout;
