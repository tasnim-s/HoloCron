import React from 'react';
import { connect } from 'react-redux';
import { clearErrors} from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import {createPost} from '../../actions/post_actions';
import { closeWall } from '../../actions/filter_actions';
import Spinner from '../loading/spinner';

class CreatePostModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: "", creatorId: this.props.currentUser.id, wallId: this.props.wallId, image: null, imageURL: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.state.sent = false;
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
        formData.append('post[wallId]', this.state.wallId);
        if(this.state.image) {
            formData.append('post[image]', this.state.image);
        }
        this.props.processForm(formData).then(this.props.closeModal);
        this.setState({sent: true});
    }

    render() {
        const {closeModal, currentUser, user} = this.props;
        const preview = this.state.imageURL ? <img className="image-preview" src={this.state.imageURL} /> : null;
        return this.state.sent ? <Spinner /> : (
            <div className="create-post-form">
                <div className="cp-top">
                    <div className="cp-heading">
                        <span>Create Post</span>
                    </div>
                    <div className="closemodal" onClick={closeModal}>✕</div>
                    <div className="pp-name">
                        <div className="pp">{currentUser.profilePic ? <img className="pp" src={currentUser.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                        <div className="name">{currentUser.firstName} {currentUser.lastName}</div>
                    </div>
                    
                </div>
                
                <div className="content">
                    <input autoFocus type="text" onChange={this.handleChange} value={this.state.content} placeholder={currentUser.id === user.id ? "What's on your mind?" : `Write something to ${user.firstName}`} />
                    {preview}
                    <div className="media">Add to Your Post
                        <input type="file" onChange={this.handleFile} id="file-post" hidden/>
                        <label htmlFor="file-post"><i className="fas fa-image"></i><span>Photo</span></label>
                    </div>
                </div>
                {this.state.content ? <div onClick={this.handleSubmit} className="post-button"><span>Post</span></div> : <div className="disabled"><span>Post</span></div>}
            </div>
        )
    }
}

const mstp = ({ entities: { users }, session, ui: {filter}}) => ({
    currentUser: users[session.id],
    wallId: filter.wallId,
    user: users[filter.wallId]
});

const mdtp = dispatch => ({
    processForm: post => dispatch(createPost(post)),
    closeModal: () => {
        dispatch(closeModal());
        dispatch(closeWall());
    },
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp, mdtp)(CreatePostModule);