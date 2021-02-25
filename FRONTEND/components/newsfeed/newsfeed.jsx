import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import { fetchAllPosts } from '../../actions/post_actions';

class Newsfeed extends React.Component {
    componentDidMount(){
        this.props.fetchAllUsers();
        this.props.fetchAllPosts();
    }
    render() {
        return (
            <div className="newsfeed">
                Newsfeed
            </div>
        )
    }
}

const mstp = ({session, entities: {users, posts}}, ownProps) => {
    // let relatedPosts, relatedUsers;
    // users ? relatedUsers = Object.values(users).filter(user => user.)
    return {
        currentUser: users[session.id],
    //     posts: relatedPosts,
    //     friends: relatedUsers
    }
}

const mdtp = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllPosts: () => dispatch(fetchAllPosts())
    }
}

export default connect(mstp, mdtp)(Newsfeed);
