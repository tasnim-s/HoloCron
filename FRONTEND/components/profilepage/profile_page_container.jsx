import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import About from './about';
import Friends from './friends';
import CoverPhoto from './cover_photo';
import MenuBar from './menu_bar';
import ProfilePic from './profile_pic';
import UserPostsContainer from './user_posts_container';
import Spinner from '../loading/spinner';
import { openModal, closeModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';
import { deletePost, fetchAllPosts } from '../../actions/post_actions';
import { addFriendship, addLike, fetchAllUsers, removeFriendship, removeLike } from '../../actions/user_actions';
import {clickPost} from '../../actions/filter_actions';
import { createComment, deleteComment, updateComment } from '../../actions/comment_actions';

class ProfilePage extends React.Component {
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
        window.scrollTo({top: 0, behavior: "auto"});
    }

    render() {
        const {user, editProfileForm, createPostForm, deletePost, currentUser, editPost, addFriendship, removeFriendship, users, addLike, removeLike, createComment, editComment, deleteComment} = this.props;
        let friends;
        if(!this.state.loading) {
            friends = users.filter(u => user.friendIds.includes(u.id));
        }
        return this.state.loading ? <Spinner /> : (
            <div className="profile-page-container">

                <div className="profile-page-top">

                    <CoverPhoto coverPhoto={user.coverPhoto}/>
                    <ProfilePic profilePic={user.profilePic} />

                    <div className="pp-name-bio">
                        <h1>{user.firstName} {user.lastName}</h1>
                        {user.bio ? <div className="bio">{user.bio}</div> : <div className="bio">Add Bio</div>}
                    </div>

                    <div className="divider"></div>
                    <MenuBar removeFriendship={removeFriendship} addFriendship={addFriendship} user={user} currentUser={currentUser} editProfile={editProfileForm}/>

                </div>
                
                <div className="profile-page-bot">

                    <div className="pp-content-container">
                        <div className="tab-contents">
                            <About editProfile={editProfileForm} user={user} currentUser={currentUser} />
                            <Friends friends={friends} />
                        </div>
                        <UserPostsContainer editPost={editPost} deletePost={deletePost} createPostForm={createPostForm} user={user} currentUser={currentUser} addLike={addLike} removeLike={removeLike} createComment={createComment} editComment={editComment} deleteComment={deleteComment} />

                    </div>

                </div>
                
            </div>
        )
    }


}

const mstp = ({session, entities: {users}}, ownProps) => {
    const whosPage = users[ownProps.match.params.userId];
    return {
        users: Object.values(users),
        currentUser: users[session.id],
        user: whosPage
    }
};

const mdtp = dispatch => ({
    editProfileForm: (<a onClick={() => {
        dispatch(openModal('editprofile'));
        dispatch(clearErrors());
    }}><i className="fas fa-pen"></i><span>Edit Profile</span></a>),
    createPostForm: () => dispatch(openModal('createPost')),
    closeModal: () => dispatch(closeModal()),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    editPost: (postId) => {
        dispatch(clickPost(postId));
        dispatch(openModal('editPost'));
    },
    addFriendship: (friendship) => dispatch(addFriendship(friendship)),
    removeFriendship: (friendship) => dispatch(removeFriendship(friendship)),
    addLike: (data) => dispatch(addLike(data)),
    removeLike: (data) => dispatch(removeLike(data)),
    createComment: (comment) => dispatch(createComment(comment)),
    editComment: (comment) => dispatch(updateComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
});

export default connect(mstp, mdtp)(ProfilePage);