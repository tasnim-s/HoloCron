import React from 'react';
import PostItem from './post_item';


export default ({posts, user, deletePost}) => {
    
    return (
        <div className="posts-index-container">
            {posts.map(post => <PostItem key={post.id} user={user} post={post} deletePost={deletePost} />)}
        </div>
    )
}