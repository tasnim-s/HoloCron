import React from 'react';

export default ({proPic}) => {
    return (
        <div className="profile-pic-container">
            {proPic ? <img src={proPic} /> : <img src={window.defaultPropic} />}
        </div>
    )
}