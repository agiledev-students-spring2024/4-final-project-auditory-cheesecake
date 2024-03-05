import React from 'react';

const NavBar = () => {
    return (
        <nav>
            {/* change styling below w/ tailwind later */}
            <ul style={{ 
                  "display": "flex", 
                  "flexDirection": "row", 
                  "justifyContent": "space-evenly", 
                  "alignItems": "center", 
                  "listStyleType": "none" 
                }}>
                {/* change as needed (we need the actual links below, nothing out of the ordinary) */}
                <li><a href="#">Home</a></li>
                <li><a href="#">Quiz</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;