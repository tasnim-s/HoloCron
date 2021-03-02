import React from 'react';
import Spinner from '../loading/spinner';
import { Link } from 'react-router-dom';

export default class ContactItem extends React.Component {
    render() {
        const {friend} = this.props;
        return !friend ? <Spinner /> : (
            <div className="contact-item">
                <Link to={`/profile/${friend.id}`} >
                    <div className="pp">{friend.profilePic ? <img className="pp" src={friend.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                    <div className="name">{friend.firstName} {friend.lastName}</div>
                </Link>
            </div>
        )
    }
}