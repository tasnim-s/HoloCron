import React from 'react';
import CreatePost from './create_post';
import PostsIndex from '../posts/posts_index';

export default ({user, currentUser, createPostForm, deletePost, editPost, addLike, removeLike, createComment, editComment, deleteComment}) => {
    return (
        <div className="user-posts-container">
            {currentUser === user ? <CreatePost createPostForm={createPostForm}  user={user} /> : null}
            
            <div className="posts-index-title">
                <div className="title-post">Posts</div>
            </div>
            <PostsIndex currentUser={currentUser} deletePost={deletePost} user={user} editPost={editPost} addLike={addLike} removeLike={removeLike} createComment={createComment} editComment={editComment} deleteComment={deleteComment} />
        </div>
    )
}