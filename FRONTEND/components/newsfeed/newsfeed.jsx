import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import { fetchAllPosts, deletePost } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import {clickPost} from '../../actions/filter_actions';
import Spinner from '../loading/spinner';
import Navigation from './navigation';
import Main from './main';
import Contacts from './contacts';

class Newsfeed extends React.Component {
    componentDidMount(){
        this.props.fetchAllUsers();
        window.scrollTo({top: 0, behavior: "auto"})
    }
    
    render() {
        const { currentUser, createPostForm, deletePost, editPost, users, fetchAllUsers} = this.props;
        const friends = users.filter(user => currentUser.friendIds.includes(user.id));
        const friendsPosts = friends.map(friend => friend.posts).flat();
        const posts = [currentUser.posts, friendsPosts].flat();
        return !users ? <Spinner /> : (
            <div className="newsfeed">
                <Navigation currentUser={currentUser} />
                <Main fetchAllUsers={fetchAllUsers} currentUser={currentUser} posts={posts} createPostForm={createPostForm} deletePost={deletePost} editPost={editPost} />
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
    }
}

export default connect(mstp, mdtp)(Newsfeed);
