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
import { fetchAllUsers } from '../../actions/user_actions';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.props.fetchAllUsers();
        this.props.fetchAllPosts();
    }
    componentDidMount() {
        
    }

    render() {
        const {user, editProfileForm, createPostForm, deletePost, posts, currentUser} = this.props;
        const { firstName, lastName, coverPhoto, profilePic, bio } = user;
        return (
            <div className="profile-page-container">
                <div className="profile-page-top">
                    <CoverPhoto coverPhoto={coverPhoto}/>
                    <ProfilePic profilePic={profilePic} />

                    <div className="pp-name-bio">
                        <h1>{firstName} {lastName}</h1>
                        {bio ? <div className="bio">{bio}</div> : <div className="bio">Add Bio</div>}
                    </div>

                    <div className="divider"></div>
                    <MenuBar user={user} currentUser={currentUser} editProfile={editProfileForm}/>

                </div>
                
                <div className="profile-page-bot">
                    <div className="pp-content-container">
                        <About editProfile={editProfileForm} user={user} currentUser={currentUser} />
                        <UserPostsContainer deletePost={deletePost} createPostForm={createPostForm} user={user} posts={posts} currentUser={currentUser} />
                    </div>
                </div>
                
            </div>
        )
    }


}

const mstp = ({session, entities: {users, posts}}, ownProps) => {
    debugger;
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
    }}><span>Edit Profile</span></a>),
    createPostForm: () => dispatch(openModal('createPost')),
    closeModal: () => dispatch(closeModal()),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchAllUsers: () => dispatch(fetchAllUsers())
});

export default connect(mstp, mdtp)(ProfilePage);