import React from 'react';
import { connect } from 'react-redux';
import About from './about';
import CoverPhoto from './cover_photo';
import MenuBar from './menu_bar';
import ProfilePic from './profile_pic';
import UserPostsContainer from './user_posts_container';
import { openModal, closeModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';

const ProfilePage = ({user, editProfileForm, createPostForm}) => {
    const { email, firstName, lastName, birthday, coverUrl, propicUrl, bio, workplace, school, currentCity} = user;
    return (
        <div className="profile-page-container">
            <div className="profile-page-top">
                <CoverPhoto coverPhoto={coverUrl}/>
                <ProfilePic proPic={propicUrl} />

                <div className="pp-name-bio">
                    <h1>{firstName} {lastName}</h1>
                    {bio ? <div className="bio">{bio}</div> : <div className="bio">Add Bio</div>}
                </div>

                <div className="divider"></div>
                <MenuBar editProfile={editProfileForm}/>

            </div>
            
            <div className="profile-page-bot">
                <div className="pp-content-container">
                    <About email={email} birthday={birthday} workplace={workplace} school={school} currentCity={currentCity} />
                    <UserPostsContainer createPostForm={createPostForm} user={user} />
                </div>
            </div>
            
        </div>
    )
};

const mstp = ({ session , entities: {users}}) => ({
    user: users[session.id]
});

const mdtp = dispatch => ({
    editProfileForm: (<a onClick={() => {
        dispatch(openModal('editprofile'));
        dispatch(clearErrors());
    }}>Edit Profile</a>),
    createPostForm: () => dispatch(openModal('createPost')),
    closeModal: () => dispatch(closeModal())
});

export default connect(mstp, mdtp)(ProfilePage);