import React from 'react';
import PostItem from './post_item';


export default ({user, deletePost, currentUser, editPost, addLike, removeLike}) => {

    const userPosts = user.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => <PostItem key={post.id} user={post.creator} post={post} deletePost={deletePost} currentUser={currentUser} editPost={editPost} addLike={addLike} removeLike={removeLike} />);

    const noPosts = <div className="no-posts">No posts available</div>
    
    return (
        <div className="posts-index-container">
            {userPosts.length ? userPosts : noPosts}
        </div>
    )
}