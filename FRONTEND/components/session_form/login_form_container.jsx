import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mstp = ({errors}) => ({
    errors: errors.sessionErrors,
    formType: 'Log In'
});

const mdtp = dispatch => ({
    processForm: user => dispatch(login(user)),
    otherForm: (<button onClick={() => dispatch(openModal('signup'))}>Create New Account</button>),
    closeModal: () => dispatch(closeModal())
});

export default connect(mstp,mdtp)(SessionForm);