import React from 'react';
import { connect } from 'react-redux';

class Newsfeed extends React.Component {
    render() {
        return (
            <div className="newsfeed">
                Newsfeed
            </div>
        )
    }
}

const mstp = (state, ownProps) => {
    return {

    }
}

const mdtp = (dispatch) => {
    return {

    }
}

export default connect(mstp, mdtp)(Newsfeed);