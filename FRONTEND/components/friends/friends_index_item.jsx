import React from 'react';
import { Link } from 'react-router-dom';

export default class FriendItem extends React.Component {
    render() {
        const { user, currentUser, sendRequest, respondRequest } = this.props;
        const requested = currentUser.sentRequests.includes(user.id);
        let response = {requesterId: currentUser.id, requesteeId: user.id};
        const friendOptions = () => {
            if (requested) {
                response.status = "cancelled";
                return <div onMouseDown={(e) => {
                    respondRequest(response);
                    e.stopPropagation();
                }} className="add-friend">Cancel Request</div>
            }
            else if(!currentUser.friendIds.includes(user.id)) {
                return <div onMouseDown={(e) => {
                    sendRequest(response);
                    e.stopPropagation();
                }} className="add-friend">Add Friend</div>
            } else {
                return null
            }
        }
        return (
            <div className="friend-item">
                <Link className="friend-item-link" to={`/friends/${user.id}`}>
                    {user.profilePic ? <img src={user.profilePic} /> : <img src={window.defaultPropic} style={{backgroundColor: "red"}}/>}
                    <div className="name-add">
                        <div className="name">{user.firstName} {user.lastName}</div>
                        {friendOptions()}
                    </div>
                </Link>
            </div>
        )
    }
}