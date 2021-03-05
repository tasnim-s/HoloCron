import React from 'react';

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true};
        this.handleDropDown = this.handleDropDown.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
        this.dropDown = React.createRef();
    }

    componentDidMount() {
        if(this.props.currentUser.id === this.props.user.id) {
            this.dropDownListener = e => {
                if (!this.dropDown.contains(e.target)) this.setState({ hidden: true });
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
        const data = {likeableId: this.props.post.id, likeableType: "Post", likerId: this.props.currentUser.id}
        if(this.props.liked) {
            this.props.removeLike(data, this.props.post.creator.id);
        } else {
            this.props.addLike(data, this.props.post.creator.id);
        }
    }

    render() {
        const {user, post, deletePost, currentUser, editPost, liked} = this.props;
        post.creatorId = post.creator.id;

        const dateParser = (createdAt) => {
            const date = new Date(createdAt);
            const today = Date.now();
            if (today - date > 43200000) {
                return date.toDateString() + " at " + date.toLocaleTimeString();
            } else {
                return "Today at " + date.toLocaleTimeString();
            }
        } ;

        const displayCount = () => {
            const numLikes = post.likers.length;
            if(!numLikes) {
                return null;
            } else if(this.props.liked) {
                const leftover = numLikes - 1;
                if (leftover) {
                    return <div className="count"><img src={window.likeicon} /> You and {leftover} {leftover === 1 ? "other" : "others"}</div>
                } else {
                    return <div className="count"><img src={window.likeicon} /> {currentUser.firstName} {currentUser.lastName}</div>
                }
            }
            else {
                return <div className="count"><img src={window.likeicon} /> {numLikes}</div>
            }
        }

        return (
            <div className="posts-item">
                
                {currentUser.id === user.id ? 
                <div className="item-edit-dropdown" onClick={this.handleDropDown} ref={div => this.dropDown = div} >•••
                    {!this.state.hidden && <div className="edit-options">
                        <div onClick={() => editPost(post)} className="edit-post-button"><i className="fas fa-pen"></i>Edit post</div>
                        <div onClick={() => deletePost(post.id)} className="delete-button"><i className="fas fa-trash-alt"></i>Move to trash</div>
                    </div>}
                </div> : null}

                <div className="pp-time-bar">
                    <div className="pp">{user.profilePic ? <img className="pp" src={user.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                    <div className="time-name">
                        <div className="name">{user.firstName} {user.lastName}</div>
                        <div className="time">{dateParser(post.createdAt)}</div>
                    </div>
                </div>
                <div className="content">{post.content}</div>
                {post.image && <img className="post-item-image" src={post.image} />}
                <div className="count-buttons">
                    {displayCount()}

                    <div className="divider"></div>
                    <div className="like-comment-buttons">
                        <div onClick={this.toggleLike} className={liked ? "like-button liked" : "like-button"}><i className={liked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>Like</div>
                        <div className="comment-drawer-button"><i className="far fa-comment-alt"></i>Comment</div>
                    </div>
                    <div className="divider"></div>
                </div>
                

                {/* <div className="comments">
                    {post.comments.map(comment => <div key={comment.id} >{comment.content}</div>)}
                </div> */}
            </div>
        )

    }
}
