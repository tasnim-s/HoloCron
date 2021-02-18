import React from 'react';


export default ({user, post, deletePost}) => {
    const dateParser = (createdAt) => {
        const date = new Date(createdAt);
        const today = Date.now();
        if (today - date > 86400000) {
            return date.toDateString() + " at " + date.toLocaleTimeString();
        } else {
            return "Today at " + date.toLocaleTimeString();
        }
    }
    return (
        <div className="posts-item">
            <div onClick={() => deletePost(post.id)} className="delete-button">•••</div>
            <div className="pp-time-bar">
                <div className="pp">{user.profilePic ? <img className="pp" src={user.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                <div className="time-name">
                    <div className="name">{user.firstName} {user.lastName}</div>
                    <div className="time">{dateParser(post.createdAt)}</div>
                </div>
            </div>
            <div className="content">{post.content}</div>
        </div>
    )
}