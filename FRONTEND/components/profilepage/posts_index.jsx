import React from 'react';
import PostItem from './post_item';


export default ({posts, user, deletePost}) => {

    const userPosts = posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => <PostItem key={post.id} user={user} post={post} deletePost={deletePost} />);

    const noPosts = <div className="no-posts">No posts available</div>
    
    return (
        <div className="posts-index-container">
            {userPosts.length ? userPosts : noPosts}
        </div>
    )
}