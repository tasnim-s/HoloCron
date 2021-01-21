import React from 'react';
import { connect } from 'react-redux';
import { clearErrors, signup } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

class SessionFormSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            first_name: 'Test',
            last_name: 'er',
            birthday: '1/1/2021',
            gender: 'M'
        };
        this.counter = 0;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.counter++;
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
        const { formType, closeModal} = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    Welcome to Holocron™!
                    <br />
                    {formType}
                    <div onClick={closeModal}>X</div>
                    {this.counter === 0 ? null : this.renderErrors()}
                    <div>
                        <br />

                        <input type="text" onChange={this.update('email')} value={this.state.email} placeholder="Email" />

                        <br />

                        <input type="password" onChange={this.update('password')} value={this.state.password} placeholder="Password" />

                        <br />
                        <button>{formType}</button>
                    </div>
                </form>
            </div>
        )
    }
}


const mstp = ({ errors }) => ({
    errors: errors.sessionErrors,
    formType: 'Sign Up'
});

const mdtp = dispatch => ({
    processForm: user => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mstp, mdtp)(SessionFormSignup);