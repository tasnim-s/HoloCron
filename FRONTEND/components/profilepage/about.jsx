import React from 'react';

export default ({email, birthday, workplace, school, currentCity}) => {
    return (
        <div className="about-container">
            <div className="intro">Intro</div>
            <div className="workplace">Works at {workplace}</div>
            <div className="school">Went to {school} </div>
            <div className="currentcity">Lives in {currentCity} </div>
        </div>
    )
}