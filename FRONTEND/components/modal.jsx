import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal_actions';
import SignupFormContainer from './session_forms/signup_form_container';
import EditProfileFormContainer from './profilepage/edit_profile_form_container';
import CreatePostModule from './posts/create_post_module';
import EditPost from './posts/edit_post';

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
        case 'createPost':
            component = <CreatePostModule />;
            break;
        case 'editPost':
            component = <EditPost />;
            break;
        default:
            return null;
    }

    return (
        <div className={modal === "signup" ? "modal-background" : 'editP-background'} >
            <div className={modal === "signup" ? "modal-child" : 'editP-child'} onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
}

// onClick = { modal === "editprofile" ? closeModal : null}


const mstp = ({ui}) => ({
    modal: ui.modal
});

const mdtp = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mstp,mdtp)(Modal);