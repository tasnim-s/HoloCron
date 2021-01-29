import React from 'react';
import { connect } from 'react-redux';
import { clearErrors, update } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleFile(field) {
        return e => this.setState({[field]: e.currentTarget.files[0]});
    }

    handleSubmit(e) {
        const formData = new FormData();
        formData.append('user[bio]', this.state.bio);
        formData.append('user[coverPhoto]', this.state.coverPhoto);
        formData.append('user[currentCity]', this.state.currentCity);
        formData.append('user[profilePic]', this.state.profilePic);
        formData.append('user[school]', this.state.school);
        formData.append('user[workplace]', this.state.workplace);
        formData.append('user[id]', this.state.id);
        this.props.processForm(formData).then(this.props.closeModal);
    }

    render() {
        const { closeModal, user } = this.props
        return (
            <div className="edit-form-container">
                <div className="edit-heading">
                    <span>Edit Profile</span>
                </div>
                <div className="closemodal" onClick={closeModal}>✕</div>
                <div className="edit-pp-block">
                    <div className="title">
                        <span>Profile Picture</span>
                        <input type="file" onChange={this.handleFile('profilePic')} />
                    </div>
                    <div className="change-container">
                        {user.propicUrl ? <img className="pp" src={user.propicUrl} /> : <img className="pp" src={window.defaultPropic} />}
                    </div>
                    <div className="title">
                        <span>Cover Photo</span>
                        <input type="file" onChange={this.handleFile('coverPhoto')} />
                    </div>
                    <div className="change-container">
                        {user.coverUrl ? <img className="cover" src={user.coverUrl} /> : <img className="cover" src={window.defaultCover} />}
                    </div>
                    <div className="title">
                        <span>Bio</span>
                    </div>
                    <div className="change-container bio-edit">
                        <textarea name="bio" onChange={this.handleChange('bio')} value={this.state.bio} placeholder="Describe yourself..."></textarea>
                    </div>
                    <div className="title">
                        <span>Customize Your Intro</span>
                    </div>
                    <div className="change-container customize-intro">
                        <div className="inputs">
                            <label>Workplace <input type="text" onChange={this.handleChange('workplace')} value={this.state.workplace} /></label>
                            <label>School <input type="text" onChange={this.handleChange('school')} value={this.state.school} /></label>
                            <label>Current City <input type="text" onChange={this.handleChange('currentCity')} value={this.state.currentCity} /></label>
                        </div>
                        <div onClick={this.handleSubmit} className="save-button">
                            <span>Save</span>
                        </div>

                    </div>
                    
                </div>
                
            </div>
        )
    }
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