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
            first_name: '',
            last_name: '',
            birthday: '',
            gender: ''
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
        const dayOptions = () => {
            const dayOptions = [];
            for(let i = 1; i <= 31; i++){
                dayOptions.push(i);
            }
            return dayOptions;
        };
        const yearOptions = () => {
            const yearOptions = [];
            for (let i = 2020; i >= 1938; i--) {
                yearOptions.push(i);
            }
            return yearOptions;
        };
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div onClick={closeModal}>X</div>
                    <div className="signup-header-message">
                        <div>{formType}</div>
                        <div>It's quick and easy</div>
                    </div>
                    {this.counter === 0 ? null : this.renderErrors()}
                    <div className="border"></div>
                    <div className="name-inputs">
                        <input type="text" onChange={this.update('first_name')} value={this.state.first_name} placeholder="First name" />
                        <input type="text" onChange={this.update('last_name')} value={this.state.last_name} placeholder="Last name" />
                    </div>
                    <input type="text" onChange={this.update('email')} value={this.state.email} placeholder="Email" />
                    <input type="password" onChange={this.update('password')} value={this.state.password} placeholder="New password" />
                    <div className="birthday-title">Birthday</div>
                    <span className="monthDayYear">
                        <select id="month">
                            <option value="Jan" selected>Jan</option>
                            <option value="Feb">Feb</option>
                            <option value="Mar">Mar</option>
                            <option value="Apr">Apr</option>
                            <option value="May">May</option>
                            <option value="Jun">Jun</option>
                            <option value="Jul">Jul</option>
                            <option value="Aug">Aug</option>
                            <option value="Sep">Sep</option>
                            <option value="Oct">Oct</option>
                            <option value="Nov">Nov</option>
                            <option value="Dec">Dec</option>
                        </select>
                        <select id="day">
                            {dayOptions().map(option => <option value={`${option}`}>{`${option}`}</option>)}
                        </select>
                        <select id="year">
                            {yearOptions().map(option => <option value={`${option}`}>{`${option}`}</option>)}
                        </select>
                    </span>
                    <div className="gender-title">Gender</div>
                    <span className="gender-container">
                        <label htmlFor="female">Female</label>
                        <input type="radio" name="gender" id="female" value="female"/>
                    </span>
                        <button>{formType}</button>
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