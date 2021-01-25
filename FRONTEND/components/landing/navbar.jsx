import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {hidden: true};
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleClick(e) {
        this.setState({hidden: !this.state.hidden});
    }


    render() {
        const {currentUser, logout} = this.props;
        const personalGreeting = () => (
            <div className="nav-bar">
                <div className="logo-and-search">
                    <Link className="logo-icon" to="/"><i className="fas fa-jedi"></i></Link>
                    <input className="search-field" type="text" placeholder="Search Holocron" />
                </div>

                <div className="newsfeed-friends-links">
                    <Link className="newsfeed-link" to="/"><i className="fas fa-home"></i></Link>
                    <Link className="friends-link" to="/friends"><i className="fas fa-user-friends"></i></Link>
                    <a className="github-link" href="https://github.com/tasnim-s"><i className="fab fa-github"></i></a>
                </div>

                <div className="settings-link">
                    <div className="nav-right">
                        <Link className='name-pic' to={`/user/${currentUser.id}`}>
                            <img src={currentUser.photoUrl} alt=""/>
                            <div className="display-name">{currentUser.firstName} {currentUser.lastName}</div>
                        </Link>
                        <i className="fas fa-plus-circle"></i>
                    </div>
                    <div className="settings-dropdown">
                        <i onClick={this.handleClick} className="fas fa-caret-square-down"></i>
                        {!this.state.hidden && <div className="dropdown-contents" onClick={e => e.stopPropagation()}>
                            <i onClick={logout} className="fas fa-sign-out-alt">Log Out</i>
                        </div>}
                    </div>
                </div>

            </div>
        );

        return currentUser && personalGreeting();

    }
}