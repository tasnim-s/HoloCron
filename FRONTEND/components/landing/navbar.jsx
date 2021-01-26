import React from 'react';
import { Link } from 'react-router-dom';


export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {hidden: true};
        this.handleClick = this.handleClick.bind(this);
        this.dropDown = React.createRef();
        this.logo = window.logo;
        this.babyYoda = window.babyYoda;
    }
    componentDidMount() {
        this.dropDownListener = e => {
            if (!this.dropDown.contains(e.target)) this.setState({hidden: true});
        }
        document.addEventListener('click', this.dropDownListener, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.dropDownListener);
    }

    handleClick(e) {
        this.setState({hidden: !this.state.hidden});
    }


    render() {
        const {currentUser, logout} = this.props;
        const personalGreeting = () => (
            <div className="nav-bar">
                <div className="logo-and-search">
                    <Link className="logo-icon" to="/"><img src={this.logo} alt=""/></Link>
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
                            <img src={this.babyYoda} alt=""/>
                            <div className="display-name">{currentUser.firstName} {currentUser.lastName}</div>
                        </Link>
                        <i className="fas fa-plus-circle"></i>
                    </div>
                    <div onClick={this.handleClick} ref={div => this.dropDown = div} className="settings-dropdown">
                        <i  className="fas fa-caret-square-down"></i>
                        {!this.state.hidden && <div className="dropdown-contents" onClick={e => e.stopPropagation()}>
                            <div className="see-your-profile">
                                <img src={this.babyYoda} alt="" />
                                <div className="see-your-profile-container">
                                    <span className="display-name">{currentUser.firstName} {currentUser.lastName}</span>
                                    <span className="see-your-profile-text">See your profile</span>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div onClick={logout} className="logout-button">
                                <i className="fas fa-sign-out-alt"></i>
                                <div className="logout-text">Log Out</div>
                            </div>
                            
                        </div>}
                    </div>
                </div>

            </div>
        );

        return currentUser && personalGreeting();

    }
}