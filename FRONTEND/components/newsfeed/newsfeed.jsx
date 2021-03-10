import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, addLike, removeLike } from '../../actions/user_actions';
import { fetchAllPosts, deletePost } from '../../actions/post_actions';
import { createComment, deleteComment, updateComment } from '../../actions/comment_actions';
import { openModal } from '../../actions/modal_actions';
import {clickPost} from '../../actions/filter_actions';
import Spinner from '../loading/spinner';
import Navigation from './navigation';
import Main from './main';
import Contacts from './contacts';

class Newsfeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true}
    }
    componentDidMount(){
        this.props.fetchAllUsers().then(() => this.setState({loading: false}));
        this.setState({loading: true});
        window.scrollTo({top: 0, behavior: "auto"});
    }
    
    render() {
        const { currentUser, createPostForm, deletePost, editPost, users, fetchAllUsers, addLike, removeLike, createComment, editComment, deleteComment } = this.props;
        let friends, friendsPosts, posts;
        if(!this.state.loading) {
            friends = users.filter(user => currentUser.friendIds.includes(user.id));
            friendsPosts = friends.map(friend => friend.posts).flat();
            posts = [currentUser.posts, friendsPosts].flat();
        }
        return this.state.loading ? <Spinner /> : (
            <div className="newsfeed">
                <Navigation />
                <Main fetchAllUsers={fetchAllUsers} currentUser={currentUser} posts={posts} createPostForm={createPostForm} deletePost={deletePost} editPost={editPost} addLike={addLike} removeLike={removeLike} createComment={createComment} editComment={editComment} deleteComment={deleteComment} />
                <Contacts friends={friends} />
            </div>
        )
        
    }
}

const mstp = ({session, entities: {users}}) => {
    return {
        users: Object.values(users),
        currentUser: users[session.id]
    }
    
}

const mdtp = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllPosts: () => dispatch(fetchAllPosts()),
        createPostForm: () => dispatch(openModal('createPost')),
        deletePost: postId => dispatch(deletePost(postId)),
        editPost: (postId) => {
            dispatch(clickPost(postId));
            dispatch(openModal('editPost'));
        },
        addLike: (data, ownerId) => dispatch(addLike(data, ownerId)),
        removeLike: (data, ownerId) => dispatch(removeLike(data, ownerId)),
        createComment: (comment) => dispatch(createComment(comment)),
        editComment: (comment) => dispatch(updateComment(comment)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
    }
}

export default connect(mstp, mdtp)(Newsfeed);
