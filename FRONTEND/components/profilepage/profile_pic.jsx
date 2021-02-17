import React from 'react';

export default ({profilePic}) => {
    return (
        <div className="profile-pic-container">
            {profilePic ? <img src={profilePic} /> : <img src={window.defaultPropic} />}
        </div>
    )
}