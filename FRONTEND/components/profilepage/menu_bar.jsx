import React from 'react';

export default class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hidden: true};
        this.handleDropDown = this.handleDropDown.bind(this);
    }

    componentDidMount() {
        if (this.dropDown && this.props.currentUser.receivedRequests.includes(this.props.user.id)) {
            this.dropDownListener = e => {
                if (!this.dropDown.contains(e.target)) this.setState({ hidden: true});
            }
            document.addEventListener('mousedown', this.dropDownListener, false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.dropDownListener);
    }

    handleDropDown(e) {
        this.setState({ hidden: !this.state.hidden });
        e.stopPropagation();
    }

    handleRequest(response, status) {
        return e => {
            if(status === "confirmed") {
                response.status = "confirmed";
            } else {
                response.status = "declined";
            }
            this.props.respondRequest(response);
            e.stopPropagation();
        }
    }

    render() {
        const {editProfile, currentUser, user, sendRequest, respondRequest, removeFriendship} = this.props;

        const friendship = {user_id: currentUser.id, friend_id: user.id};
        const userFriends = currentUser.friendIds;
        const requested = currentUser.sentRequests.includes(user.id);
        const wanted = currentUser.receivedRequests.includes(user.id);
        let response = {requesterId: currentUser.id, requesteeId: user.id};

        const friendOptions = () => {
            if(userFriends.includes(user.id)) {
                return <a onClick={() => removeFriendship(friendship)} className="edit-profile"><i className="fas fa-user-times"></i><span>Unfriend</span></a>
            } else if (requested) {
                response.status = "cancelled";
                return <a onClick={() => respondRequest(response)} className="edit-profile add-friend"><i className="fas fa-user-times"></i><span>Cancel Request</span></a>
            } else if (wanted) {
                response = {requesteeId: currentUser.id, requesterId: user.id};
                return <a onClick={this.handleDropDown} className="edit-profile add-friend" ref={div => this.dropDown = div} ><i className="fas fa-user-check"></i><span>Respond</span>
                {!this.state.hidden && <div className="edit-options">
                            <div onClick={this.handleRequest(response, "confirmed")} className="edit-button">Confirm</div>
                            <div onClick={this.handleRequest(response, "declined")} className="delete-button">Delete Request</div>
                        </div>}
                </a>
            } else  {
                return <a onClick={() => sendRequest(response)} className="edit-profile add-friend"><i className="fas fa-user-plus"></i><span>Add Friend</span></a>
            }
        }

        const edit = currentUser === user ? <div className="edit-profile">{editProfile}</div> : <div className="edit-profile">{friendOptions()}</div>;

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
}