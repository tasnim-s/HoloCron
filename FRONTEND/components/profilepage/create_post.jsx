import React from 'react';


export default ({user, createPostForm, currentUser}) => {
    return (
        <div className="create-post-container">
            <div className="propic-and-button">
                <div className="propic">
                    {currentUser.profilePic ? <img src={currentUser.profilePic} /> : <img src={window.defaultPropic} />}
                </div>
                <div onClick={() => createPostForm(user.id)} className="post-button">{currentUser.id === user.id ? "What's on your mind?" : `Write something to ${user.firstName}...`}</div>
            </div>
            <div className="addphoto"></div>
        </div>
    )
}