import React from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import { updateUser } from '../../actions/user_actions';
import Spinner from '../loading/spinner';

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.state.ppUrl = null;
        this.state.coverUrl = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state.sent = false;
    }

    handleChange(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleFile(field) {
        return e => {
            let changed = "";
            field === 'profilePic' ? changed = "ppUrl" : changed = "coverUrl";
            const file = e.currentTarget.files[0];
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                this.setState({[field]: file, [changed]: fileReader.result });
            };
            if(file) {
                fileReader.readAsDataURL(file);
            }
        } 
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[bio]', this.state.bio);
        formData.append('user[currentCity]', this.state.currentCity);
        formData.append('user[school]', this.state.school);
        formData.append('user[workplace]', this.state.workplace);
        formData.append('user[id]', this.state.id);
        if(this.state.coverUrl) {
            formData.append('user[coverPhoto]', this.state.coverPhoto);
        }
        if(this.state.ppUrl) {
            formData.append('user[profilePic]', this.state.profilePic);
        }
        this.props.processForm(formData).then(this.props.closeModal);
        this.setState({sent: true})
    }

    render() {
        console.log(this.state);
        const { closeModal, user } = this.props;
        const previewPP = () => {
            if(this.state.ppUrl) {
                return <img className="pp" src={this.state.ppUrl} />
            } else if(user.profilePic) {
                return <img className="pp" src={user.profilePic} />
            } else {
                return <img className="pp" src={window.defaultPropic} />
            }
        };
        const previewCP = () => {
            if(this.state.coverUrl) {
                return <img className="cover" src={this.state.coverUrl} />
            } else if(user.coverPhoto) {
                return <img className="cover" src={user.coverPhoto} />
            } else {
                return <img className="cover" src={window.defaultCover} />
            }
        };
        return this.state.sent ? <Spinner /> : (
            <div className="edit-form-container">
                <div className="edit-heading">
                    <span>Edit Profile</span>
                </div>
                <div className="closemodal" onClick={closeModal}>✕</div>
                <div className="edit-pp-block">
                    <div className="title">
                        <span>Profile Picture</span>
                        <input type="file" onChange={this.handleFile('profilePic')} id="file-pp" hidden/>
                        <label htmlFor="file-pp">Edit</label>
                    </div>
                    <div className="change-container">
                        {previewPP()}
                    </div>
                    <div className="title">
                        <span>Cover Photo</span>
                        <input type="file" onChange={this.handleFile('coverPhoto')} id="file-cp" hidden/>
                        <label htmlFor="file-cp">Edit</label>
                    </div>
                    <div className="change-container">
                        {previewCP()}
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
    processForm: user => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp, mdtp)(EditProfileForm);