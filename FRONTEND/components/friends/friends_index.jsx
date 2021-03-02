import React from 'react';
import FriendItem from './friends_index_item';


export default ({users, currentUser}) => {

    const usersItems = users.sort((a,b) => a.firstName.localeCompare(b.firstName)).map(user => <FriendItem key={user.id} user={user} currentUser={currentUser} />);

    const noFriends = <div className="no-friends">When you have friend requests or suggestions, you'll see them here.</div>
    
    return (
        <div className="friends-index-container">
            {usersItems.length ? usersItems : noFriends}
        </div>
    )
}