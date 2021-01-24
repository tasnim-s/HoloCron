import React from 'react';

export default ({ currentUser, logout, openModal}) => {
    
    const personalGreeting = () => (
        <div>
            <h3>Hi, {currentUser.first_name} {currentUser.last_name}!</h3>
            <button onClick={logout}>Log Out</button>
        </div>
    );

    return currentUser ? personalGreeting() : null;
};