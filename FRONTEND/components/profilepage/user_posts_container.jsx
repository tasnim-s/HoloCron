import React from 'react';
import CreatePost from './create_post';
import PostsIndex from './posts_index';

export default (props) => {
    return (
        <div className="user-posts-container">
            <CreatePost />
            <PostsIndex />
        </div>
    )
}