import React from 'react';
import FriendItem from './friends_index_item';
import RequestItem from './request_item';

export default ({users, currentUser, sendRequest, respondRequest}) => {
    const filtered = users.filter(user => user.id !== currentUser.id && !currentUser.receivedRequests.includes(user.id));

    const friendRequests = users.filter(user => currentUser.receivedRequests.includes(user.id));

    const usersItems = filtered.sort((a,b) => a.firstName.localeCompare(b.firstName)).map(user => <FriendItem key={user.id} user={user} currentUser={currentUser} sendRequest={sendRequest} respondRequest={respondRequest} />);

    const requestItems = friendRequests.sort((a,b) => a.firstName.localeCompare(b.firstName)).map(user => <RequestItem key={user.id} user={user} currentUser={currentUser} respondRequest={respondRequest} />);

    const noFriends = <div className="no-friends">When you have friend requests or suggestions, you'll see them here.</div>
    
    return (
        <div className="friends-index-container">
            <div className="title">Find Friends</div>
            <div className="scrollable">

                <div className="subtitle">{friendRequests.length ? friendRequests.length : ""} Friend Requests</div>
                <div className="friends-index-items">
                    {requestItems.length ? requestItems : noFriends}
                </div>
                <div className="subtitle">People You May Know</div>
                <div className="friends-index-items">
                    {usersItems.length ? usersItems : noFriends}
                </div>
            </div>
        </div>
    )
}