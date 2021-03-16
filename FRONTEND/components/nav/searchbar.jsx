import React from 'react';
import { Link } from 'react-router-dom';

export default class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {focused: false, search: ""}
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.dropDown = React.createRef();
    }

    componentDidMount() {
        this.dropDownListener = e => {
            if (!this.block.contains(e.target)) this.setState({ focused: false, search: ""});
        }
        document.addEventListener('mousedown', this.dropDownListener, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.dropDownListener);
    }

    handleChange(e) {
        this.setState({search: e.currentTarget.value});
    }

    handleClick(e) {
        this.setState({search: "", focused: false});
        e.stopPropagation()
    }

    render() {
        const { users } = this.props;
        let filteredUsers = users.filter(user => {
            const fullName = user.firstName + " " + user.lastName;
            return fullName.toLowerCase().includes(this.state.search.toLowerCase());
        }).sort().map(user => {
            return (
                <div onClick={this.handleClick} className="search-item" key={user.id}>
                    <Link to={`/profile/${user.id}`} >
                        <div className="pp">{user.profilePic ? <img className="pp" src={user.profilePic} /> : <img className="pp" src={window.defaultPropic} />}</div>
                        <div className="name">{user.firstName} {user.lastName}</div>
                    </Link>
                </div>
            )
        });
        

        
        return (
            <div className="searchbar">
                <div className={this.state.focused ? "searchblock" : "searchblock unfocused"} ref={div => this.block = div}>
                    <div className="input-bar">
                        {this.state.focused && <div onClick={this.handleClick} className="close-search"><i className="fas fa-arrow-left"></i></div>}
                        <input ref={input => this.inputField = input} onFocus={() => this.setState({focused: true})} type="search" className="search-field" placeholder="Search Holocron" value={this.state.search} onChange={this.handleChange}/>
                    </div>
                    {this.state.focused && <div className="search-index" >
                        { this.state.search ? filteredUsers : <div className="search-item">No results found</div>}
                    </div>}
                </div>
            </div>
        )
    }
}