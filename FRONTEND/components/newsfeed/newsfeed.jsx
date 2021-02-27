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
    }
    render() {
        const { posts, currentUser, createPostForm, deletePost, editPost } = this.props;

        return !currentUser ? <Spinner /> : (
            <div className="newsfeed">
                <Navigation currentUser={currentUser} />
                <Main currentUser={currentUser} posts={posts} createPostForm={createPostForm} deletePost={deletePost} editPost={editPost} />
                <Contacts currentUser={currentUser} />
            </div>
        )
    }
}

const mstp = ({session, entities: {users}}) => {


    const currentUser = users[session.id];
        let friends = [];
        currentUser.friendIds.forEach(friendId => friends.push(users[friendId]));
        let friendsPosts = [];
        // friends.forEach(friend  => friendsPosts.push(friend.posts));
        // const relevantPosts = currentUser.posts + friendsPosts.flat()
    debugger;
    return {
        currentUser: currentUser,
        // posts: relevantPosts
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
