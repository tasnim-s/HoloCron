import React from 'react';
import { connect } from 'react-redux';
import { clearErrors, update } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

const EditProfileForm = ({closeModal, user}) => {
    return (
        <div className="edit-form-container">
            <div className="edit-heading">
                <span>Edit Profile</span>
            </div>
            <div className="closemodal" onClick={closeModal}>✕</div>
            <div className="edit-pp-block">
                <div className="title">
                    <span>Profile Picture</span>
                    <input type="file"/>
                </div>
                <div className="change-container">
                    {user.propicUrl ? <img className="pp" src={user.propicUrl} /> : <img className="pp" src={window.defaultPropic} />}
                </div>
                <div className="title">
                    <span>Cover Photo</span>
                    <input type="file" />
                </div>
                <div className="change-container">
                    {user.coverUrl && <img className="cover" src={user.coverUrl} />}
                </div>
            </div>
        </div>
    )
}

const mstp = ({ entities: {users}, session }) => ({
    user: users[session.id]
});

const mdtp = dispatch => ({
    processForm: user => dispatch(update(user)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp, mdtp)(EditProfileForm);