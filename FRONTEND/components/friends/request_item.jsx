import React from 'react';
import { Link } from 'react-router-dom';

export default class RequestItem extends React.Component {
    render() {
        const { user, currentUser, respondRequest } = this.props;
        let response = {requesteeId: currentUser.id, requesterId: user.id};
        return (
            <div className="friend-item">
                <Link className="friend-item-link" to={`/friends/${user.id}`}>
                    {user.profilePic ? <img src={user.profilePic} /> : <img src={window.defaultPropic} style={{backgroundColor: "red"}}/>}
                    <div className="name-responses">
                        <div className="name">{user.firstName} {user.lastName}</div>
                        <div className="responses">
                            <div className="confirm" onMouseDown={(e) => {
                                response.status = "confirmed";
                                respondRequest(response);
                                e.stopPropagation();
                            }}>Confirm</div>
                            <div className="decline" onMouseDown={(e) => {
                                response.status = "declined";
                                respondRequest(response);
                                e.stopPropagation();
                            }}>Delete</div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}