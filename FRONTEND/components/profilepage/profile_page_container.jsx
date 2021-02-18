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

const ProfilePage = ({user, editProfileForm, createPostForm, deletePost, fetchAllPosts, posts}) => {
    useEffect(() => {
        fetchAllPosts();
    },[user])
    const { firstName, lastName, coverPhoto, profilePic, bio, workplace, school, currentCity} = user;
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
                <MenuBar editProfile={editProfileForm}/>

            </div>
            
            <div className="profile-page-bot">
                <div className="pp-content-container">
                    <About editProfile={editProfileForm} workplace={workplace} school={school} currentCity={currentCity} />
                    <UserPostsContainer deletePost={deletePost} createPostForm={createPostForm} user={user} posts={posts} />
                </div>
            </div>
            
        </div>
    )
};

const mstp = ({ session , entities: {users, posts}}) => ({
    user: users[session.id],
    posts: Object.values(posts).filter(post => post.creatorId === session.id)
});

const mdtp = dispatch => ({
    editProfileForm: (<a onClick={() => {
        dispatch(openModal('editprofile'));
        dispatch(clearErrors());
    }}><span>Edit Profile</span></a>),
    createPostForm: () => dispatch(openModal('createPost')),
    closeModal: () => dispatch(closeModal()),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchAllPosts: () => dispatch(fetchAllPosts())
});

export default connect(mstp, mdtp)(ProfilePage);