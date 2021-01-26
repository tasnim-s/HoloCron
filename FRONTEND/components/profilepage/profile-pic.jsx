import React from 'react';

export default ({proPic}) => {
    return (
        <div className="profile-pic-container">
            <img src={proPic} alt="Your Profile Pic Here"/>
        </div>
    )
}