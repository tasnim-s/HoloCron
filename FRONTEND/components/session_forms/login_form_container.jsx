import React from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { fetchAllUsers } from '../../actions/user_actions';

class SessionFormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
        this.props.fetchAllUsers();
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(this.props.closeModal);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
            </ul>
        )
    }


    render() {
        const { formType, otherForm, demo, modal } = this.props;
        return (
            <div className="login-container">

                <div className="slogan">
                    <div>holocron</div>
                    <h2>Connect with friends and the world around you on Holocron.</h2>
                </div>

                <div className="form-container">
                    <form onSubmit={this.handleSubmit} >
                        {/* Log Into Holocron™ */}
                        <div className="form-contents">
                            <input type="text" onChange={this.update('email')} value={this.state.email} placeholder="Email" />
                            <input type="password" onChange={this.update('password')} value={this.state.password} placeholder="Password" />
                            <button>{formType}</button>
                            {this.props.errors.length === 0 || modal === 'signup' ? null : <div className="form-errors">{this.renderErrors()}</div>}
                            <div className="demo">{demo}</div>
                            <div className="border"></div>
                            <div className="create-new-account">{otherForm}</div>
                        </div>
                    </form>
                </div>
                
            </div>
        )
    }
}

const mstp = ({errors, ui}) => ({
    errors: errors.sessionErrors,
    formType: 'Log In',
    modal: ui.modal
});

const mdtp = dispatch => ({
    processForm: user => dispatch(login(user)),
    otherForm: (<a onClick={() => {
        dispatch(openModal('signup'));
        dispatch(clearErrors());
    }}>Create New Account</a>),
    clearErrors: () => dispatch(clearErrors()),
    demo: (<a onClick={() => dispatch(login({
        email: 'player1', password: 'player1'
    }))}>Demo Login?</a>),
    fetchAllUsers:  () => dispatch(fetchAllUsers())
});

export default connect(mstp,mdtp)(SessionFormLogin);