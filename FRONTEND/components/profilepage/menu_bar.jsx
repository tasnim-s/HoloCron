import React from 'react';

export default ({editProfile, currentUser, user, sendRequest, respondRequest, removeFriendship}) => {

    const friendship = {user_id: currentUser.id, friend_id: user.id};
    const userFriends = currentUser.friendIds;
    const requested = currentUser.sendRequests.includes(user.id);

    const addFriend = () => {
        if(userFriends.includes(user.id)) {
            return <a onClick={() => removeFriendship(friendship)} className="edit-profile"><i className="fas fa-user-times"></i><span>Unfriend</span></a>
        } else if (requested) {
            return <a onClick={() => removeFriendship(friendship)} className="edit-profile"><i className="fas fa-user-times"></i><span>Unfriend</span></a>
        } else  {
            return <a onClick={() => sendRequest(friendship)} className="edit-profile add-friend"><i className="fas fa-user-plus"></i><span>Add Friend</span></a>
        }
    }

    const edit = currentUser === user ? <div className="edit-profile">{editProfile}</div> : <div className="edit-profile">{addFriend()}</div>;

    return (
        <div className="menu-bar">
            <div className="tabs">
                <div className="posts">
                    <span>Posts</span>
                    <div className="active"></div>
                </div>
            </div>
            {edit}
        </div>
    )
}