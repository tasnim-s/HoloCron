import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import About from './about';
import CoverPhoto from './cover_photo';
import MenuBar from './menu_bar';
import ProfilePic from './profile_pic';
import UserPostsContainer from './user_posts_container';
import { openModal, closeModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';
import { deletePost, fetchAllPosts } from '../../actions/post_actions';
import { addFriendship, fetchAllUsers, removeFriendship } from '../../actions/user_actions';
import {clickPost} from '../../actions/filter_actions';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.fetchAllUsers();
        this.props.fetchAllPosts();
        
    }

    render() {
        const {user, editProfileForm, createPostForm, deletePost, posts, currentUser, editPost, addFriendship, removeFriendship} = this.props;
        return !user ? null : (
            <div className="profile-page-container">
                <div className="profile-page-top">
                    <CoverPhoto coverPhoto={user.coverPhoto}/>
                    <ProfilePic profilePic={user.profilePic} />

                    <div className="pp-name-bio">
                        <h1>{user.firstName} {user.lastName}</h1>
                        {user.bio ? <div className="bio">{user.bio}</div> : <div className="bio">Add Bio</div>}
                    </div>

                    <div className="divider"></div>
                    <MenuBar removeFriendship={removeFriendship} addFriendship={addFriendship} user={user} currentUser={currentUser} editProfile={editProfileForm}/>

                </div>
                
                <div className="profile-page-bot">
                    <div className="pp-content-container">
                        <About editProfile={editProfileForm} user={user} currentUser={currentUser} />
                        <UserPostsContainer editPost={editPost} deletePost={deletePost} createPostForm={createPostForm} user={user} posts={posts} currentUser={currentUser} />
                    </div>
                </div>
                
            </div>
        )
    }


}

const mstp = ({session, entities: {users, posts}}, ownProps) => {
    return {
        currentUser: users[session.id],
        user: users[ownProps.match.params.userId],
        posts: Object.values(posts).filter(post => post.creatorId == ownProps.match.params.userId)
    }
};

const mdtp = dispatch => ({
    editProfileForm: (<a onClick={() => {
        dispatch(openModal('editprofile'));
        dispatch(clearErrors());
    }}><i className="fas fa-pen"></i><span>Edit Profile</span></a>),
    createPostForm: () => dispatch(openModal('createPost')),
    closeModal: () => dispatch(closeModal()),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    editPost: (postId) => {
        dispatch(clickPost(postId));
        dispatch(openModal('editPost'));
    },
    addFriendship: (friendship) => dispatch(addFriendship(friendship)),
    removeFriendship: (friendship) => dispatch(removeFriendship(friendship))
});

export default connect(mstp, mdtp)(ProfilePage);