import React from 'react';
import { connect } from 'react-redux';
import CoverPhoto from './cover_photo';
import ProfilePic from './profile-pic';

const ProfilePage = ({user}) => {
    const { email, firstName, lastName, birthday, gender, coverUrl, propicUrl} = user;
    return (
        <div className="profile-page-container">
            Inside ProfilePage
            <CoverPhoto coverPhoto={coverUrl}/>
            <ProfilePic proPic={propicUrl} />
            <div className="profile-page-name">
                <h1>{firstName} {lastName}</h1>
            </div>
            <div className="divider"></div>
            

        </div>
    )
};

const mstp = ({ session , entities: {users}}) => ({
    user: users[session.id]
});

const mdtp = dispatch => ({
});

export default connect(mstp)(ProfilePage);