import React from 'react';

export default class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {focused: false, search: ""}
    }
    render() {
        const { users } = this.props;
        return (
            <div className="searchbar">
                <div onClick={() => this.setState({focused: true})} className="search-field"><i className="fas fa-search"></i>Search Holocron</div>

                <div onClick={() => this.setState({focused: false})}  className="searchblock">
                    <div className="input-bar">
                        <div className="close-search"><i className="fas fa-arrow-left"></i></div>
                        <input type="search" placeholder="Search Holocron" value={this.state.search}/>
                    </div>
                    <div className="search-index">
                        <div className="no-results">No results found</div>
                        
                    </div>

                </div>
            </div>
        )
    }
}