import React from 'react';
import CommentItem from './comment_item';


export default ({post, currentUser, addLike, removeLike, editComment, deleteComment}) => {

    const sortedComments = post.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(comment => <CommentItem key={comment.id} comment={comment} currentUser={currentUser} liked={comment.likers.includes(currentUser.id)} addLike={addLike} removeLike={removeLike} editComment={editComment} deleteComment={deleteComment} />);

    
    return (
        <div className="comments-index-container">
            {sortedComments}
        </div>
    )
}