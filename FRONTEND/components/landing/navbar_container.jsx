import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import NavBar from './navbar';

const mstp = ({ session , entities: {users}}) => ({
    currentUser: users[session.id]
});

const mdtp = dispatch => ({
    logout: () => dispatch(logout()),
    createPostForm: () => dispatch(openModal('createPost')),
});

export default connect(mstp, mdtp)(NavBar);