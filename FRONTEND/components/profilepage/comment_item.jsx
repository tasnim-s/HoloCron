import React from 'react';

export default class CommentItem extends React.Component {
    render() {
        const { content } = this.props.comment;
        return (
            <div className="comment-item">
                {content}
            </div>
        )
    }
}