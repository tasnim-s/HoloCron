import React from 'react';
import {connect} from 'react-redux';
import { openModal } from '../actions/modal_actions';
import {logout} from '../actions/session_actions';

const Greeting = ({ currentUser, logout, openModal}) => {
    const sessionLinks = () => (
        <nav>
            <button onClick={() => openModal('login')} >Login</button>
            <br/>
            or
            <br/>
            <button onClick={() => openModal('signup')} >Sign Up</button>
        </nav>
    );
    
    const personalGreeting = () => (
        <div>
            <h2>Hi, {currentUser.first_name}!</h2>
            <button onClick={logout}>Log Out</button>
        </div>
    );

    return currentUser ? personalGreeting() : sessionLinks();
}

const mstp = ({session}) => ({
    currentUser: session.currentUser
});

const mdtp = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mstp,mdtp)(Greeting);