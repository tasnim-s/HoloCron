import React from 'react';
import CreatePost from './create_post';
import PostsIndex from './posts_index';

export default ({posts, user, currentUser, createPostForm, deletePost, editPost}) => {
    return (
        <div className="user-posts-container">
            {currentUser === user ? <CreatePost createPostForm={createPostForm}  user={user} /> : null}
            
            <div className="posts-index-title">
                <div className="title-post">Posts</div>
            </div>
            <PostsIndex currentUser={currentUser} deletePost={deletePost} posts={posts} editPost={editPost}/>
        </div>
    )
}