import React from 'react';
import { connect } from 'react-redux';
import CoverPhoto from './cover_photo';
import MenuBar from './menu_bar';
import ProfilePic from './profile_pic';

const ProfilePage = ({user}) => {
    const { email, firstName, lastName, birthday, gender, coverUrl, propicUrl, bio} = user;
    
    return (
        <div className="profile-page-container">
            Inside ProfilePage
            <CoverPhoto coverPhoto={coverUrl}/>
            <ProfilePic proPic={propicUrl} />
            <div className="profile-page-name">
                <h1>{firstName} {lastName}</h1>
                {bio && <div className="bio">{bio}</div>}
            </div>
            <div className="divider"></div>
            <MenuBar />

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
    }}>Create New Account</a>)
});

export default connect(mstp)(ProfilePage);