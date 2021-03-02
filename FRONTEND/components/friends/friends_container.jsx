import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import Spinner from '../loading/spinner';
import FriendsIndex from './friends_index';

class FriendsContainer extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.users.length <= 1) {
            this.state = {loading: true}
        } else {
            this.state = {loading: false}
        }
    }
    componentDidMount() {
        if(this.props.users.length <= 1) {
            this.props.fetchAllUsers().then(() => this.setState({loading: false}));
            this.setState({loading: true});
        }
    }
    render() {
        return this.state.loading ? <Spinner /> : (
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
