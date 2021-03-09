import React from 'react';
import { Link } from 'react-router-dom';

export default class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true, showReplies: false, editing: false};
        this.handleDropDown = this.handleDropDown.bind(this);
        this.dropDown = React.createRef();
        this.toggleLike = this.toggleLike.bind(this);
        // this.repliesDrawer = this.repliesDrawer.bind(this);
    }

    componentDidMount() {
        if(this.props.currentUser.id === this.props.comment.commenter.id) {
            this.dropDownListener = e => {
                if (!this.dropDown.contains(e.target)) this.setState({ hidden: true});
            }
            document.addEventListener('mousedown', this.dropDownListener, false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.dropDownListener);
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
        const { currentUser, liked, comment: { content, commenter, id}, editComment, deleteComment } = this.props;
        return (
            <div className="comment-item">
                <div className="pp">{commenter.profilePic ? <img className="pp" src={commenter.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>

                {this.state.editing ? <input type="text" value={content} onChange={this.handleChange}/> :
                
                <div className="namecomment-likereply">
                    <div className="name-comment">
                        <Link className="name" to={`/profile/${commenter.id}`} >{commenter.firstName} {commenter.lastName}</Link>
                        <div className="comment-content">{content}</div>
                    </div>
                    
                    <div className="like-reply">
                        <div onClick={this.toggleLike} className={liked ? "like-button liked" : "like-button"}>Like</div>
                        <div className="separater">•</div>
                        <div onClick={() => this.setState({showReplies: true})} className="replies-drawer">Reply</div>
                    </div>
                </div>}
                {currentUser.id === commenter.id ? 
                <div className="item-edit-dropdown" onClick={this.handleDropDown} ref={div => this.dropDown = div} >•••
                    {!this.state.hidden && <div className="edit-options">
                        <div onClick={() => this.setState({editing: true})} className="edit-comment-button">Edit</div>
                        <div onClick={() => deleteComment(id)} className="delete-button">Delete</div>
                    </div>}
                </div> : null}
            </div>
        )
    }
}