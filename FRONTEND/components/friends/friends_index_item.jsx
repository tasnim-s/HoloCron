import React from 'react';
import { Link } from 'react-router-dom';

export default class FriendItem extends React.Component {
    render() {
        const { user, currentUser, addFriend } = this.props;
        const friendship = {user_id: currentUser.id, friend_id: user.id};
        const addFriendButton = () => {
            if(!currentUser.friendIds.includes(user.id)) {
                return <div onClick={(e) => {
                    addFriend(friendship);
                    e.stopPropagation();
                }} className="add-friend">Add Friend</div>
            } else {
                return null
            }
        }
        return (
            <div className="friend-item">
                <Link className="friend-item-link" to={`/friends/${user.id}`}>
                    {user.profilePic ? <img src={user.profilePic} /> : <img src={window.defaultPropic} />}
                    <div className="name-add">
                        <div className="name">{user.firstName} {user.lastName}</div>
                        {addFriendButton()}
                    </div>
                </Link>
            </div>
        )
    }
}