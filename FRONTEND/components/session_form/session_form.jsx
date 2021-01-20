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
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    Welcome to Holocron™!
                    <br/>
                    {this.props.formType} or {this.props.otherForm}
                    <div onClick={this.props.closeModal}>X</div>
                    {this.renderErrors()}
                    <div>
                        <br/>
                        <label>Email:
                            <input type="text" onChange={this.update('email')} value={this.state.email}/>
                        </label>
                        <br/>
                        <label>Password:
                            <input type="password" onChange={this.update('password')} value={this.state.password} />
                        </label>
                        <br/>
                        <button>{this.props.formType}</button>
                    </div>
                </form>
            </div>
        )
    }
}