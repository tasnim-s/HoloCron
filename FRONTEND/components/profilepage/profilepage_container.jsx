import React from 'react';
import { connect } from 'react-redux';

const ProfilePage = ({user}) => {
    const {email, first_name, last_name, birthday, gender} = user;
    return (
        <div>Inside ProfilePage
            <br/>
            {email}
            <br/>
            {first_name}
            <br />
            {last_name}
            <br />
            {birthday}
            <br />
            {gender}
        </div>
    )
};

const mstp = ({ session , entities: {users}}) => ({
    user: users[session.id]
});

const mdtp = dispatch => ({
});

export default connect(mstp)(ProfilePage);