import React from 'react';
import CommentItem from './comment_item';


export default ({post, currentUser, addLike, removeLike, editComment, deleteComment, createComment}) => {

    const sortedComments = post.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(comment => <CommentItem key={comment.id} comment={comment} currentUser={currentUser} liked={comment.likers.includes(currentUser.id)} addLike={addLike} removeLike={removeLike} createComment={createComment} editComment={editComment} deleteComment={deleteComment} post={post} />);

    
    return (
        <div className="comments-index-container">
            {sortedComments}
        </div>
    )
}