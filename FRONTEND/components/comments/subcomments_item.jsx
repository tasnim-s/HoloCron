import React from 'react';
import { Link } from 'react-router-dom';

export default class SubCommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true, editing: false, content: this.props.comment.content};
        this.handleDropDown = this.handleDropDown.bind(this);
        this.dropDown = React.createRef();
        this.toggleLike = this.toggleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
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

        const comment = this.props.comment;
        comment.content = this.state.content;
        this.props.editComment(comment).then(() => {
            this.setState({content: "", editing: false});
        });
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

    render() {
        const { currentUser, liked, comment: { content, commenter, id, likers}, deleteComment, post } = this.props;

        const numLikes = likers.length;
        const displayLikes = () => {
            if(!numLikes) {
                return null;
            } else {
                return <div className="like-count"><img src={window.likeicon} />{numLikes}</div>
            }
        }
        return (
            <div className="subcomment-item">
                <div className="subcomment">
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
                            <div onClick={this.props.showReplies} className="replies-drawer">Reply</div>
                        </div>
                    </div>}

                    {(currentUser.id === commenter.id || currentUser.id === post.creator.id)? 
                    <div className={this.state.editing ? "hidden" : "edit-comment-dropdown"} onClick={this.handleDropDown} ref={div => this.dropDown = div} >•••
                        {!this.state.hidden && <div className="edit-options">
                            <div onClick={() => this.setState({editing: true})} className="edit-button">Edit</div>
                            <div onClick={() => deleteComment(id)} className="delete-button">Delete</div>
                        </div>}
                    </div> : null}
                </div>
            </div>
        )
    }
}