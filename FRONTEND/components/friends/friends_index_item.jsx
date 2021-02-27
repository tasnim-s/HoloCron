import React from 'react';
import { Link } from 'react-router-dom';

export default class FriendItem extends React.Component {
    render() {
        const { user, currentUser } = this.props;
        return (
            <div className="friend-item">
                <Link to={`/profile/${user.id}`}>
                    {user.profilePic ? <img src={user.profilePic} /> : <img src={window.defaultPropic} />}
                    <div className="name">{user.firstName} {user.lastName}</div>
                </Link>
            </div>
        )
    }
}