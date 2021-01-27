import React from 'react';
import { connect } from 'react-redux';
import About from './about';
import CoverPhoto from './cover_photo';
import MenuBar from './menu_bar';
import ProfilePic from './profile_pic';
import UserPostsContainer from './user_posts_container';

const ProfilePage = ({user, editProfileForm}) => {
    const { email, firstName, lastName, birthday, coverUrl, propicUrl, bio, workplace, school, currentCity} = user;
    return (
        <div className="profile-page-container">
            <div className="profile-page-top">
                <CoverPhoto coverPhoto={coverUrl}/>
                <ProfilePic proPic={propicUrl} />

                <div className="pp-name-bio">
                    <h1>{firstName} {lastName}</h1>
                    {bio && <div className="bio">{bio}</div>}
                </div>
                
                <div className="divider"></div>
                <MenuBar editProfile={editProfileForm}/>

            </div>
            
            <div className="profile-page-content">
                <About email={email} birthday={birthday}workplace={workplace} school={school}currentCity={currentCity} />
                <UserPostsContainer />
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
    }}>Edit Profile</a>)
});

export default connect(mstp, mdtp)(ProfilePage);