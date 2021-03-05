import React from 'react';
import PostItem from '../profilepage/post_item';


export default ({deletePost, currentUser, editPost, posts, addLike, removeLike}) => {

    const allPosts = posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => <PostItem key={post.id} user={post.creator} post={post} deletePost={deletePost} currentUser={currentUser} editPost={editPost} addLike={addLike} removeLike={removeLike} liked={post.likers.includes(currentUser.id)} />);

    const noPosts = <div className="no-posts">No posts available</div>
    
    return (
        <div className="newsfeed-posts-index-container">
            {allPosts.length ? allPosts : noPosts}
        </div>
    )
}