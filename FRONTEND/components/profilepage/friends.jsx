import React from 'react';
import ContactItem from '../newsfeed/contact_item';

export default ({friends}) => {
    const friendItems = friends.map(friend => <ContactItem key={friend.id} friend={friend} /> );
    let filtered;
    if (friendItems.length > 9) {
        filtered = friendItems.slice(0,8);
    } else {
        filtered = friendItems;
    }
    return (
        <div className="about-container">
            <div className="intro">Friends</div>
            <div className="friend-contents">
                {filtered}
            </div>
        </div>
    )
}