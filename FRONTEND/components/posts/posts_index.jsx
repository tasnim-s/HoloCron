import React from 'react';
import PostItem from './post_item';


export default ({user, deletePost, currentUser, editPost, addLike, removeLike, createComment, editComment, deleteComment}) => {

    const userPosts = user.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => <PostItem key={post.id} creator={post.creator} wall={user} post={post} deletePost={deletePost} currentUser={currentUser} editPost={editPost} liked={post.likers.includes(currentUser.id)} addLike={addLike} removeLike={removeLike} createComment={createComment} editComment={editComment} deleteComment={deleteComment} />);

    const noPosts = <div className="no-posts">No posts available</div>
    
    return (
        <div className="posts-index-container">
            {userPosts.length ? userPosts : noPosts}
        </div>
    )
}