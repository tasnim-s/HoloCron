import React from 'react';
import CreatePost from './create_post';
import PostsIndex from './posts_index';

export default ({user, createPostForm, deletePost}) => {
    return (
        <div className="user-posts-container">
            <CreatePost createPostForm={createPostForm}  user={user} />
            <div className="posts-index-title">
                <div className="title-post">Posts</div>
            </div>
            <PostsIndex deletePost={deletePost} user={user} />
        </div>
    )
}