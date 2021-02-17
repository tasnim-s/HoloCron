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
            firstName: '',
            lastName: '',
            month: 'Jan',
            day: '1',
            year: '2020',
            gender: ''
        };
        this.counter = 0;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }


    handleSubmit(e) {
        e.preventDefault();
        this.counter++;
        let user = Object.assign({}, this.state);
        user["birthday"] = `${this.state.month} ${this.state.day}, ${this.state.year}`;
        delete user[month];
        delete user[day];
        delete user[year];
        this.props.processForm(user).then(this.props.closeModal);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    renderErrors(field) {
        for(let i = 0; i < this.props.errors.length; i++){
            if (this.props.errors[i].includes(field)) {
                return <li>{this.props.errors[i]}</li>
            }
        }
        return null;
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
            <div className="signup-form-container">
                <form onSubmit={this.handleSubmit} >
                    
                    <div id="closemodal" onClick={closeModal}>✕</div>
                    <div className="signup-header-message">
                        <div>
                            {formType}
                        </div>
                        <div>It's quick and easy</div>
                    </div>
                    
                    <div className="signup-form-contents">
                        <div className="name-inputs">
                            <input type="text" onChange={this.update('firstName')} value={this.state.firstName} placeholder="First name" />
                            
                            <input type="text" onChange={this.update('lastName')} value={this.state.lastName} placeholder="Last name" />
                        </div>
                        {!this.renderErrors("First") || !this.renderErrors("Last") ? null : <div className="form-errors">What's your name?</div>}
                        {/* <div className="form-errors">{this.renderErrors("First")} {this.renderErrors("Last")}</div> */}
                        {/* <div className="form-errors">{this.renderErrors("Last")}</div> */}
                        <div className="email-password-input">
                            <input type="text" onChange={this.update('email')} value={this.state.email} placeholder="Email" />
                            <div className="form-errors">{this.renderErrors("Email")}</div>
                            <input type="password" onChange={this.update('password')} value={this.state.password} placeholder="New password" />
                            <div className="form-errors">{this.renderErrors("Password")}</div>
                        </div>
                        <div className="birthday-title">Birthday</div>
                        <span className="month-day-year">
                            <select value={this.state.month} id="month" onChange={this.update('month')}>
                                <option value="Jan">Jan</option>
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
                            <select value={this.state.day} id="day" onChange={this.update('day')}>
                                {dayOptions().map(option => <option key={`day${option}`} value={`${option}`}>{`${option}`}</option>)}
                            </select>
                            <select value={this.state.year} id="year" onChange={this.update('year')}>
                                {yearOptions().map(option => <option key={`yr${option}`} value={`${option}`}>{`${option}`}</option>)}
                            </select>
                        </span>
                        <div className="form-errors">{this.renderErrors("Birthday")}</div>
                        <div className="gender-title">Gender</div>
                        <span className="gender-container" >
                            <label>Female
                                <input type="radio" value="Female" checked={this.state.gender === "Female"} onChange={this.update('gender')} />
                            </label>
                            <label>Male
                                <input type="radio" value="Male" onChange={this.update('gender')} checked={this.state.gender === "Male"} />
                            </label>
                            <label>Non-Binary
                                <input type="radio" value="Non-Binary" onChange={this.update('gender')} checked={this.state.gender === "Non-Binary"} />
                            </label>
                        </span>
                        <div className="form-errors">{this.renderErrors("Gender")}</div>
                        <p>By clicking Sign Up, you agree to go into a galaxy far, far away. Do. Or do not. There is no try.</p>
                        <div className="sign-up-button-div">
                            <button>{formType}</button>
                        </div>
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