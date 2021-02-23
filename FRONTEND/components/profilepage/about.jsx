import React from 'react';

export default ({currentUser, user, editProfile}) => {
    return (
        <div className="about-container">
            <div className="intro">Intro</div>
            <div className="about-contents">
                <div className="workplace">Works at {user.workplace}</div>
                <div className="school">Studied at {user.school} </div>
                <div className="currentcity">Lives in <span>{user.currentCity}</span></div>
                {currentUser === user && <div className="edit">{editProfile}</div>}
                
            </div>
        </div>
    )
}