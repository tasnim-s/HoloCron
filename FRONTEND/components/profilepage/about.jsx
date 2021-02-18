import React from 'react';

export default ({workplace, school, currentCity, editProfile}) => {
    return (
        <div className="about-container">
            <div className="intro">Intro</div>
            <div className="about-contents">
                <div className="workplace">Works at {workplace}</div>
                <div className="school">Studied at {school} </div>
                <div className="currentcity">Lives in <span>{currentCity}</span></div>
                <div className="edit">{editProfile}</div>
            </div>
        </div>
    )
}