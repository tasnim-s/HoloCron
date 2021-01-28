import React from 'react';

export default ({coverPhoto}) => {
    return (
        <div className="cover-photo-container">
            {coverPhoto && <img src={coverPhoto} />}
        </div>
    )
}