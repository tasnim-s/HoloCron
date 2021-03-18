import React from 'react';
import CommentsIndex from '../comments/comments_index';
import { Link } from 'react-router-dom';

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true, content: ""};
        if (this.props.post.comments) {
            this.state.showComments = true;
        } else {
            this.state.showComments = false;
        }
        this.handleDropDown = this.handleDropDown.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
        this.commentsDrawer = this.commentsDrawer.bind(this);
        this.dropDown = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        if(this.props.currentUser.id === this.props.creator.id) {
            this.dropDownListener = e => {
                if (!this.dropDown.contains(e.target)) this.setState({ hidden: true});
            }
            document.addEventListener('mousedown', this.dropDownListener, false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.dropDownListener);
    }

    handleChange(e) {
        this.setState({content: e.currentTarget.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const comment = {content: this.state.content, commenterId: this.props.currentUser.id, postId: this.props.post.id};
        this.props.createComment(comment).then(() => this.setState({content: ""}));
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
        const data = {likeableId: this.props.post.id, likeableType: "Post", likerId: this.props.currentUser.id}
        if(this.props.liked) {
            this.props.removeLike(data);
        } else {
            this.props.addLike(data);
        }
    }

    commentsDrawer() {
        this.setState({showComments: !this.state.showComments}, () => {
            if(this.state.showComments) this.inputField.focus();
        });
    }

    render() {
        const {creator, post, deletePost, currentUser, editPost, liked, addLike, removeLike, createComment, editComment, deleteComment, wall} = this.props;

        const dateParser = (createdAt) => {
            const date = new Date(createdAt);
            const today = Date.now();
            if (today - date > 43200000) {
                return date.toDateString() + " at " + date.toLocaleTimeString();
            } else {
                return "Today at " + date.toLocaleTimeString();
            }
        } ;

        const numLikes = post.likers.length;
        const displayCount = () => {
            if(!numLikes) {
                return <div className="count-likes"></div>
            } else if(this.props.liked) {
                const leftover = numLikes - 1;
                if (leftover) {
                    return <div className="count-likes"><img src={window.likeicon} /> You and {leftover} {leftover === 1 ? "other" : "others"}</div>
                } else {
                    return <div className="count-likes"><img src={window.likeicon} /> {currentUser.firstName} {currentUser.lastName}</div>
                }
            }
            else {
                return <div className="count-likes"><img src={window.likeicon} /> {numLikes}</div>
            }
        }

        const numComments = post.comments.length;
        const displayCommentCount = () => {

            if(!numComments) return null;
            else {
                return <div onClick={this.commentsDrawer} className="count-comments">{numComments} {numComments === 1 ? "Comment" : "Comments"}</div>
            }
        };


        return (
            <div className="posts-item">
                
                {currentUser.id === creator.id || currentUser.id === wall.id ? 
                <div className="item-edit-dropdown" onClick={this.handleDropDown} ref={div => this.dropDown = div} >•••
                    {!this.state.hidden && <div className="edit-options">
                        {currentUser.id === creator.id && <div onClick={() => editPost(post)} className="edit-post-button"><i className="fas fa-pen"></i>Edit post</div>}
                        <div onClick={() => deletePost(post.id)} className="delete-button"><i className="fas fa-trash-alt"></i>Move to trash</div>
                    </div>}
                </div> : null}

                <div className="pp-time-bar">
                    <div className="pp">{creator.profilePic ? <img className="pp" src={creator.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                    <div className="time-name">
                        <div className="names">
                            <Link to={`/profile/${creator.id}`} className="name">{creator.firstName} {creator.lastName}</Link>
                            {post.creator.id === post.wallId ? null :
                            <div className="extension">
                                <i className="fas fa-caret-right"></i>
                                <Link to={`/profile/${wall.id}`} className="name">{wall.firstName} {wall.lastName}</Link>
                            </div>
                            }
                        </div>
                        
                        <div className="time">{dateParser(post.createdAt)}</div>
                    </div>
                </div>
                <div className="content">{post.content}</div>
                {post.image && <img className="post-item-image" src={post.image} />}
                <div className="count-buttons">
                    {numLikes || numComments ? <div className="like-comment-counts">
                        {displayCount()}
                        {displayCommentCount()}
                    </div> : null}
                    <div className="divider"></div>
                    <div className="like-comment-buttons">
                        <div onClick={this.toggleLike} className={liked ? "like-button liked" : "like-button"}><i className={liked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>Like</div>
                        <div onClick={() => {
                            this.setState({showComments: true},() => this.inputField.focus());
                            }} className="comment-drawer-button"><i className="far fa-comment-alt"></i>Comment</div>
                    </div>
                </div>
                

                {this.state.showComments && <div className="comments">
                    <div className="divider"></div>
                    <CommentsIndex post={post} currentUser={currentUser} addLike={addLike} removeLike={removeLike} createComment={createComment} editComment={editComment} deleteComment={deleteComment} />
                    <div className="make-comment">
                        <div className="pp">{currentUser.profilePic ? <img className="pp" src={currentUser.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                        <input ref={input => this.inputField = input} type="text" onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.content} placeholder="Write a comment..." />
                    </div>
                </div>}

            </div>
        )

    }
}
