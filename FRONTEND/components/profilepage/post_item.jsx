import React from 'react';

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true};
        this.handleDropDown = this.handleDropDown.bind(this);
        this.dropDown = React.createRef();
    }

    componentDidMount() {
        this.dropDownListener = e => {
            if (!this.dropDown.contains(e.target)) this.setState({ hidden: true });
        }
        document.addEventListener('click', this.dropDownListener, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.dropDownListener);
    }

    handleDropDown(e) {
        this.setState({ hidden: !this.state.hidden });
        e.stopPropagation();
    }

    render() {
        const {user, post, deletePost, currentUser, editPost} = this.props;
        const dateParser = (createdAt) => {
            const date = new Date(createdAt);
            const today = Date.now();
            if (today - date > 86400000) {
                return date.toDateString() + " at " + date.toLocaleTimeString();
            } else {
                return "Today at " + date.toLocaleTimeString();
            }
        }  

        return (
            <div className="posts-item">
                {
                currentUser === user && 
                <div className="item-edit-dropdown" onClick={this.handleDropDown} ref={div => this.dropDown = div} >•••
                    {!this.state.hidden && <div className="edit-options">

                        <div onClick={() => editPost(post.id)} className="edit-post-button"><i className="fas fa-pen"></i>Edit post</div>
                        <div onClick={() => deletePost(post.id)} className="delete-button"><i className="fas fa-trash-alt"></i>Move to trash</div>
                    </div>}
                </div>
                }
                <div className="pp-time-bar">
                    <div className="pp">{user.profilePic ? <img className="pp" src={user.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                    <div className="time-name">
                        <div className="name">{user.firstName} {user.lastName}</div>
                        <div className="time">{dateParser(post.createdAt)}</div>
                    </div>
                </div>
                <div className="content">{post.content}</div>
                {post.image && <img className="post-item-image" src={post.image} />}
            </div>
        )

    }
}
