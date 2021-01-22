import React from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';

class SessionFormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     this.props.clearErrors();
    // }

    // componentWillUnmount() {
    //     this.props.clearErrors();
    // }

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
        const { formType, otherForm } = this.props;
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
                            <div className="form-errors">{this.renderErrors()}</div>
                            <div className="border"></div>
                            {otherForm}
                        </div>
                    </form>
                </div>
                
            </div>
        )
    }
}

const mstp = ({errors}) => ({
    errors: errors.sessionErrors,
    formType: 'Log In'
});

const mdtp = dispatch => ({
    processForm: user => dispatch(login(user)),
    otherForm: (<button onClick={() => dispatch(openModal('signup'))}>Create New Account</button>),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp,mdtp)(SessionFormLogin);