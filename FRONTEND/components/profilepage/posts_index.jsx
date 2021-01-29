import React from 'react';
import PostItem from './post_item';


export default ({user}) => {
    
    return (
        <div className="posts-index-container">
            {user.posts.reverse().map(post => <PostItem key={post.id} user={user} post={post} />)}
        </div>
    )
}