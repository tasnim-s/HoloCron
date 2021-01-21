import React from 'react';

export default class SessionForm extends React.Component {
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(this.props.closeModal);
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
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
        const {formType, closeModal, otherForm} = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    Welcome to Holocron™!
                    <br/>
                    {formType === "Log In" ? null : formType}
                    <div onClick={closeModal}>X</div>
                    {this.renderErrors()}
                    <div>
                        <br/>
                        
                            <input type="text" onChange={this.update('email')} value={this.state.email} placeholder="Email"/>
                        
                        <br/>
                        
                            <input type="password" onChange={this.update('password')} value={this.state.password} placeholder="Password"/>
                        
                        <br/>
                        <button>{formType}</button>
                        <br/>
                        {formType === "Sign Up" ? null : otherForm}
                    </div>
                </form>
            </div>
        )
    }
}