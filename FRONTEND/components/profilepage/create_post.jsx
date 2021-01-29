import React from 'react';


export default ({user, createPostForm}) => {
    return (
        <div className="create-post-container">
            <div className="propic-and-button">
                <div className="propic">
                    {user.propicUrl ? <img src={user.propicUrl} /> : <img src={window.defaultPropic} />}
                </div>
                <div onClick={createPostForm} className="post-button">What's on your mind?</div>
            </div>
            <div className="addphoto"></div>
        </div>
    )
}