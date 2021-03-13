import React, { useState } from 'react';
import SubCommentItem from './subcomments_item';

export default ({currentUser, addLike, removeLike, editComment, deleteComment, comment, showReplies}) => {
    const [showAll, setshowAll] = useState(false);

    const sortedSubComments = comment.subComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(subComment => <SubCommentItem key={subComment.id} parent={comment} currentUser={currentUser} liked={subComment.likers.includes(currentUser.id)} addLike={addLike} removeLike={removeLike} editComment={editComment} deleteComment={deleteComment} comment={subComment} showReplies={showReplies} />);

    const firstOne = sortedSubComments.shift();

    const showMore =  <div onClick={() => {
        setshowAll(true);
        showReplies();
    }} className="showMore"><i className="fas fa-reply"></i>View more replies</div>;

    return (
        <div className="subcomment-index-container">
            {firstOne}
            {sortedSubComments.length ? showAll ? sortedSubComments : showMore : null}
        </div>
    )
}