import React from 'react';
import { connect } from 'react-redux';
import { clearErrors} from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import {createPost} from '../../actions/post_actions';

class CreatePostModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: "", creatorId: this.props.user.id};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({content: e.currentTarget.value});
    }

    handleSubmit(e) {
        this.props.processForm(this.state).then(this.props.closeModal);
    }

    render() {
        const {closeModal, user} = this.props;
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
    processForm: post => dispatch(createPost(post)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp, mdtp)(CreatePostModule);