import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    render() {
        const {currentUser, logout} = this.props;
        const personalGreeting = () => (
            <div className="nav-bar">
                <div className="logo-and-search">
                    <Link className="logo-icon" to="/"><i className="fas fa-jedi fa-2x"></i></Link>
                    <input className="search-field" type="text" placeholder="Search Holocron" />
                </div>

                <div className="newsfeed-friends-links">
                    <Link className="newsfeed-link" to="/"><i className="fas fa-home fa-2x"></i></Link>
                    <Link className="friends-link" to="/friends"><i className="fas fa-user-friends fa-2x"></i></Link>
                    <a className="github-link" href="https://github.com/tasnim-s"><i className="fab fa-github fa-2x"></i></a>
                </div>

                <div className="settings-link">
                    <div className="profile-page-link">
                        <Link to={`/user/${currentUser.id}`}>{currentUser.first_name} {currentUser.last_name}</Link>
                    </div>
                    <div className="settings-dropdown">
                        <i className="fas fa-caret-square-down fa-2x"></i>
                        <div className="drop-down-contents">
                            <i onClick={logout} class="fas fa-sign-out-alt fa-2x">Log Out</i>
                        </div>
                    </div>
                </div>

            </div>
        );

        return currentUser ? personalGreeting() : null;

    }
}