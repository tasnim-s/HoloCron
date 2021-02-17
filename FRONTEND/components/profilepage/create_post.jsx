import React from 'react';


export default ({user, createPostForm}) => {
    return (
        <div className="create-post-container">
            <div className="propic-and-button">
                <div className="propic">
                    {user.profilePic ? <img src={user.profilePic} /> : <img src={window.defaultPropic} />}
                </div>
                <div onClick={createPostForm} className="post-button">What's on your mind?</div>
            </div>
            <div className="addphoto"></div>
        </div>
    )
}