import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mstp = ({ errors }) => ({
    errors: errors.sessionErrors,
    formType: 'Sign Up'
});

const mdtp = dispatch => ({
    processForm: user => dispatch(signup(user)),
    otherForm: (<button onClick={() => dispatch(openModal('login'))}>Login</button>),
    closeModal: () => dispatch(closeModal())
});

export default connect(mstp, mdtp)(SessionForm);