import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import Spinner from '../loading/spinner';
import FriendsIndex from './friends_index';

class FriendsContainer extends React.Component {
    componentDidMount(){
        this.props.fetchAllUsers();
    }
    render() {
        return (
            <div className="friends-page">
                <FriendsIndex currentUser={this.props.currentUser} users={this.props.users} />
            </div>
            
        )
    }
}

const mstp = ({session, entities: {users}}) => {
    return {
        users: Object.values(users),
        currentUser: users[session.id]
    }
}

const mdtp = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        addFriend: (<a onClick={() => {
            create
        }}><span>Add Friend</span></a>)
    }
}

export default connect(mstp, mdtp)(FriendsContainer);
