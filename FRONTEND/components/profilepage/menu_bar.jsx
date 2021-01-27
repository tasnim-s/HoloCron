import React from 'react';

export default ({editProfile}) => {
    return (
        <div className="menu-bar">
            <div className="tabs">
                <div className="posts">
                    <span>Posts</span>
                    <div className="active"></div>
                </div>
            </div>
            <div className="edit-profile">{editProfile}</div>
        </div>
    )
}