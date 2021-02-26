import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import { fetchAllPosts } from '../../actions/post_actions';
import Spinner from '../loading/spinner';
import Navigation from './navigation';
import Main from './main';
import Contacts from './contacts';

class Newsfeed extends React.Component {
    componentDidMount(){
        this.props.fetchAllUsers();
        this.props.fetchAllPosts();
    }
    render() {
        const { posts, currentUser, createPostForm, deletePost, editPost } = this.props;

        return !posts ? <Spinner /> : (
            <div className="newsfeed">
                <Navigation currentUser={currentUser} />
                <Main currentUser={currentUser} posts={posts} createPostForm={createPostForm} deletePost={deletePost} editPost={editPost} />
                <Contacts currentUser={currentUser} />
            </div>
        )
    }
}

const mstp = ({session, entities: {users, posts}}, ownProps) => {
    const currentUser = users[session.id];
    const friendIds = currentUser.friends.map(friend => friend.id);
    return {
        currentUser: currentUser,
        posts: Object.values(posts).filter(post => friendIds.includes(post.creatorId || post.creatorId === session.id))
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
    }
}

export default connect(mstp, mdtp)(Newsfeed);
