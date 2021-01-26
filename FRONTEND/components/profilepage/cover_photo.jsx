import React from 'react';

export default ({coverPhoto}) => {
    return (
        <div className="cover-photo-container">
            <img src={coverPhoto} alt="Your Cover Photo Here"/>
        </div>
    )
}