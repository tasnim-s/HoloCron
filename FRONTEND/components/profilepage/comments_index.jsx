import React from 'react';
import CommentItem from './comment_item';


export default ({post}) => {

    const sortedComments = post.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(comment => <CommentItem key={comment.id} comment={comment} />);

    
    return (
        <div className="comments-index-container">
            {sortedComments}
        </div>
    )
}