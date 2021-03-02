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

    const count = () => {
        if(friends.length === 1) {
            return "1 friend";
        } else if(friends.length > 1) {
            return `${friends.length} friends`;
        } else {return "No friends"}
    }
    return (
        <div className="about-container">
            <div className="intro">Friends</div>
            <div className="count">{count()}</div>
            <div className="friend-contents">
                {filtered}
            </div>
        </div>
    )
}