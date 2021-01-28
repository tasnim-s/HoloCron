import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal_actions';
import SignupFormContainer from './session_form/signup_form_container';
import EditProfileFormContainer from './profilepage/edit_profile_form_container';

const Modal = ({modal, closeModal}) => {
    if (!modal) return null;
    let component;

    switch (modal) {
        case 'signup':
            component = <SignupFormContainer />;
            break;
        case 'editprofile':
            component = <EditProfileFormContainer />;
            break;
        default:
            return null;
    }

    return (
        <div className={modal === "editprofile" ? 'editP-background' : "modal-background"} onClick={modal === "editprofile" ? closeModal : null}>
            <div className={modal === "editprofile" ? 'editP-child' : "modal-child"} onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
}


const mstp = ({ui}) => ({
    modal: ui.modal
});

const mdtp = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mstp,mdtp)(Modal);