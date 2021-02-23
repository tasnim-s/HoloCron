import React from 'react';

export default ({editProfile, currentUser, user}) => {
    const edit = currentUser === user ? <div className="edit-profile">{editProfile}</div> : <div className="edit-profile">Add Friend</div>;
    return (
        <div className="menu-bar">
            <div className="tabs">
                <div className="posts">
                    <span>Posts</span>
                    <div className="active"></div>
                </div>
            </div>
            {edit}
        </div>
    )
}