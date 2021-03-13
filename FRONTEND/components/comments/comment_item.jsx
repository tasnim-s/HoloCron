import React from 'react';
import { Link } from 'react-router-dom';
import SubCommentIndex from './subcomments_index';

export default class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true, showReplies: false, editing: false, content: this.props.comment.content, sub_content: ""};
        this.handleDropDown = this.handleDropDown.bind(this);
        this.dropDown = React.createRef();
        this.toggleLike = this.toggleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.showReplies = this.showReplies.bind(this);
    }

    componentDidMount() {
        if(this.props.currentUser.id === this.props.comment.commenter.id && !this.state.editing) {
            this.dropDownListener = e => {
                if (!this.dropDown.contains(e.target)) this.setState({ hidden: true});
            }
            document.addEventListener('mousedown', this.dropDownListener, false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.dropDownListener);
    }

    handleChange(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.editing) {
            const comment = this.props.comment;
            comment.content = this.state.content;
            this.props.editComment(comment).then(() => {
                this.setState({content: "", editing: false});
            });
        } else {
            const subComment = {content: this.state.sub_content, commenterId: this.props.currentUser.id, postId: this.props.comment.postId, parentId: this.props.comment.id};
            this.props.createComment(subComment).then(() => this.setState({sub_content: ""}));
        }
    }
        

    handleKeyPress(e) {
        if(e.code === "Enter") {
            this.handleSubmit(e);
        }
    }

    handleDropDown(e) {
        this.setState({ hidden: !this.state.hidden });
        e.stopPropagation();
    }

    toggleLike() {
        const data = {likeableId: this.props.comment.id, likeableType: "Comment", likerId: this.props.currentUser.id}
        if(this.props.liked) {
            this.props.removeLike(data);
        } else {
            this.props.addLike(data);
        }
    }

    showReplies() {
        this.setState({showReplies: true}, () => this.inputField.focus());
    }

    render() {
        const { currentUser, liked, comment: { content, commenter, id, likers}, deleteComment, addLike, removeLike, editComment } = this.props;

        const numLikes = likers.length;
        const displayLikes = () => {
            if(!numLikes) {
                return null;
            } else {
                return <div className="like-count"><img src={window.likeicon} />{numLikes}</div>
            }
        }

        return (
            <div className="comment-item">
                <div className="parent">
                    <div className="pp">{commenter.profilePic ? <img className="pp" src={commenter.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>

                    {this.state.editing ? <input type="text" value={this.state.content} onKeyPress={this.handleKeyPress} onChange={this.handleChange("content")}/> :
                    
                    <div className="namecomment-likereply">
                        <div className="name-comment">
                            <Link className="name" to={`/profile/${commenter.id}`} >{commenter.firstName} {commenter.lastName}</Link>
                            <div className="comment-content">{content}</div>
                            {displayLikes()}
                        </div>
                        
                        <div className="like-reply">
                            <div onClick={this.toggleLike} className={liked ? "like-button liked" : "like-button"}>Like</div>
                            <div className="separater">•</div>
                            <div onClick={this.showReplies} className="replies-drawer">Reply</div>
                        </div>
                    </div>}

                    {currentUser.id === commenter.id ? 
                    <div className={this.state.editing ? "hidden" : "edit-comment-dropdown"} onClick={this.handleDropDown} ref={div => this.dropDown = div} >•••
                        {!this.state.hidden && <div className="edit-options">
                            <div onClick={() => this.setState({editing: true})} className="edit-button">Edit</div>
                            <div onClick={() => deleteComment(id)} className="delete-button">Delete</div>
                        </div>}
                    </div> : null}
                </div>

                <SubCommentIndex currentUser={currentUser} addLike={addLike} removeLike={removeLike} editComment={editComment} deleteComment={deleteComment} comment={this.props.comment} showReplies={this.showReplies} />
                
                {this.state.showReplies && <div className="make-comment">
                    <div className="pp">{currentUser.profilePic ? <img className="pp" src={currentUser.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                    <input ref={input => this.inputField = input} type="text" onKeyPress={this.handleKeyPress} onChange={this.handleChange("sub_content")} value={this.state.sub_content} placeholder="Write a reply..." />
                </div>}
            </div>
        )
    }
}