import React from 'react';
import { connect } from 'react-redux';
import { clearErrors} from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import {updatePost} from '../../actions/post_actions';

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.post;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleChange(e) {
        this.setState({content: e.currentTarget.value});
    }

    handleFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({image: file, imageURL: fileReader.result});
        };
        if(file) {
            fileReader.readAsDataURL(file);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[content]', this.state.content);
        formData.append('post[creatorId]', this.state.creatorId);
        if(this.state.image) {
            formData.append('post[image]', this.state.image);
        }
        this.props.processForm(formData).then(this.props.closeModal);
    }

    render() {
        const {closeModal, user} = this.props;
        const preview = this.state.imageURL ? <img src={this.state.imageURL} /> : null;
        return (
            <div className="create-post-form">
                <div className="cp-top">
                    <div className="cp-heading">
                        <span>Create Post</span>
                    </div>
                    <div className="closemodal" onClick={closeModal}>✕</div>
                    <div className="pp-name">
                        <div className="pp">{user.profilePic ? <img className="pp" src={user.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                        <div className="name">{user.firstName} {user.lastName}</div>
                    </div>
                    
                </div>
                
                <div className="content">
                    <input autoFocus type="text" onChange={this.handleChange} value={this.state.content} placeholder="What's on your mind?" />
                    <input type="file" onChange={this.handleFile} />
                    {preview}
                </div>
                <div onClick={this.handleSubmit} className="post-button">
                    <span>Post</span>
                </div>
            </div>
        )
    }
}

const mstp = ({ entities: { users }, session }) => ({
    user: users[session.id]
});

const mdtp = dispatch => ({
    processForm: post => dispatch(updatePost(post)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp, mdtp)(EditPost);