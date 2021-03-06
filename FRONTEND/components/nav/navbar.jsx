import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import { whichWall } from '../../actions/filter_actions';
import Spinner from '../loading/spinner';
import Searchbar from './searchbar';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {hidden: true};
        this.handleClick = this.handleClick.bind(this);
        this.dropDown = React.createRef();
        this.logo = window.logo;
    }
    componentDidMount() {
        this.dropDownListener = e => {
            if (!this.dropDown.contains(e.target)) this.setState({hidden: true});
        }
        document.addEventListener('click', this.dropDownListener, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.dropDownListener);
    }

    handleClick(e) {
        this.setState({hidden: !this.state.hidden});
    }


    render() {
        const {currentUser, logout, createPostForm, page, users} = this.props;
        const selected = (klass) => {
            if(klass.includes("home")) {
                return page.includes('newsfeed') ? klass + " selected" : klass;
            } else if(klass.includes("friends")){
                return page.includes('friends') ? klass + " selected" : klass;
            }
        };
        const personalGreeting = () => (
            <div className="nav-bar">
                <div className="logo-and-search">
                    <Link className="logo-icon" to="/"><img src={this.logo} alt=""/></Link>
                    <Searchbar users={users}/>
                </div>

                <div className="newsfeed-friends-links">
                    <div className="newsfeed-link-container">
                        <Link className="newsfeed-link" to="/"><i className={selected("fas fa-home")}></i></Link>
                        {page.includes("newsfeed") ? <div className="bottom-bar-selected"></div> : <div className="bottom-bar"></div> }
                    </div>
                    <div className="friends-link-container">
                        <Link className="friends-link" to="/friends"><i className={selected("fas fa-user-friends")}></i></Link>
                        {page.includes("friends") ? <div className="bottom-bar-selected"></div> : <div className="bottom-bar"></div> }
                    </div>
                    <a className="social-link" href="http://tasnimsaiduzzaman.com/" target="_blank" rel="noopener noreferrer"><i className="fas fa-user-tie"></i></a>
                </div>

                <div className="settings-link">
                    <div className="nav-right">
                        <Link className={page === `/profile/${currentUser.id}` ? "name-pic mypage" : "name-pic"} to={`/profile/${currentUser.id}`}>
                            {currentUser.profilePic ? <img src={currentUser.profilePic} /> : <img src={window.defaultPropic} />}
                            <div className="display-name">{currentUser.firstName}</div>
                        </Link>
                        <div onClick={() => createPostForm(currentUser.id)} className="plus-post"><i className="fas fa-plus"></i></div>
                    </div>
                    <div onClick={this.handleClick} ref={div => this.dropDown = div} className="settings-dropdown">
                        <div className={this.state.hidden ? "caret-boundary" : "caret-boundary open"}><i className="fas fa-caret-down"></i></div>
                        {!this.state.hidden && <div className="dropdown-contents" onClick={e => e.stopPropagation()}>
                            <Link to={`/profile/${currentUser.id}`} >
                            <div className="see-your-profile">
                                {currentUser.profilePic ? <img src={currentUser.profilePic} /> : <img src={window.defaultPropic} />}
                                <div className="see-your-profile-container">
                                    <span className="display-name">{currentUser.firstName} {currentUser.lastName}</span>
                                    <span className="see-your-profile-text">See your profile</span>
                                </div>
                            </div>
                            </Link>
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

        return currentUser ? personalGreeting() : <Spinner />;
    }
}

const mstp = ({ session , entities: {users}}, ownProps) => {
    return {
        currentUser: users[session.id],
        page: ownProps.location.pathname,
        users: Object.values(users)
    }
};

const mdtp = dispatch => ({
    logout: () => dispatch(logout()),
    createPostForm: (wallId) => {
        dispatch(whichWall(wallId));
        dispatch(openModal('createPost'));
    },
});

export default connect(mstp, mdtp)(NavBar);