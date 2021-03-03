import React from 'react';
import FriendItem from './friends_index_item';


export default ({users, currentUser, addFriend}) => {
    const filtered = users.filter(user => user.id !== currentUser.id);

    const usersItems = filtered.sort((a,b) => a.firstName.localeCompare(b.firstName)).map(user => <FriendItem key={user.id} user={user} currentUser={currentUser} addFriend={addFriend} />);

    const noFriends = <div className="no-friends">When you have friend requests or suggestions, you'll see them here.</div>
    
    return (
        <div className="friends-index-container">
            <div className="title">Find Friends</div>
            <div className="friends-index-items">
                {usersItems.length ? usersItems : noFriends}
            </div>
        </div>
    )
}