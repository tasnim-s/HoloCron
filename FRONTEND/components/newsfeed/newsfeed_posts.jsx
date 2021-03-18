import React from 'react';
import PostItem from '../posts/post_item';


export default ({deletePost, currentUser, editPost, posts, addLike, removeLike, createComment, editComment, deleteComment, users}) => {

    const allPosts = posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => <PostItem key={post.id} creator={post.creator} wall={users[post.wallId]} post={post} deletePost={deletePost} currentUser={currentUser} editPost={editPost} addLike={addLike} removeLike={removeLike} liked={post.likers.includes(currentUser.id)} createComment={createComment} editComment={editComment} deleteComment={deleteComment} />);

    const noPosts = <div className="no-posts">No posts available</div>
    
    return (
        <div className="newsfeed-posts-index-container">
            {allPosts.length ? allPosts : noPosts}
        </div>
    )
}