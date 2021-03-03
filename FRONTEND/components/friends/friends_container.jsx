import React from 'react';
import { connect } from 'react-redux';
import { addFriendship, fetchAllUsers } from '../../actions/user_actions';
import Spinner from '../loading/spinner';
import ProfilePage from '../profilepage/profile_page_container';
import FriendsIndex from './friends_index';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import Placeholder from './placeholder';

class FriendsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {profile: null}
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
        window.scrollTo({top: 0, behavior: "auto"});
    }
    render() {
        return this.state.loading ? <Spinner /> : (
            <div className="friends-page">
                <FriendsIndex currentUser={this.props.currentUser} users={this.props.users} addFriend={this.props.addFriend} />
                {/* {this.state.profile ? < ProfilePage exact path="/friends/:userId" user={this.props.currentUser} /> : <div className="profile-preview">Select people's names to preview their profile</div>} */}
                <div className="profile-preview">
                    <Switch >
                        <ProtectedRoute exact path="/friends" component={Placeholder} />
                        <ProtectedRoute exact path="/friends/:userId" component={ProfilePage} />
                    </Switch>
                </div>
                
            </div>
            
        )
    }
}

const mstp = ({session, entities: {users}}, ownProps) => {
    return {
        users: Object.values(users),
        currentUser: users[session.id]
    }
}

const mdtp = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        addFriend: (friendship) => dispatch(addFriendship(friendship))
    }
}

export default connect(mstp, mdtp)(FriendsContainer);
