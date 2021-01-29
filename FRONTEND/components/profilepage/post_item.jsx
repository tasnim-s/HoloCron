import React from 'react';


export default ({user, post, deletePost}) => {
    return (
        <div className="posts-item">
            <div className="pp-time-bar">
                <div className="pp">{user.propicUrl ? <img className="pp" src={user.propicUrl} /> : <img className="pp" src={window.defaultPropic} />}</div>
                <div className="time-name">
                    <div className="name">{user.firstName} {user.lastName}</div>
                    <div className="time">{post.updated_at}</div>
                </div>
                <div onClick={() => deletePost(post.id)} className="delete-button">Delete</div>
            </div>
            <div className="content">{post.content}</div>
        </div>
    )
}