import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
    render() {
        const { currentUser } = this.props;
        return (
            <div className="navigation">

                <a className="social-link" href="https://github.com/tasnim-s" target="_blank" rel="noopener noreferrer"><img src={window.tasnim} /><span>Tasnim Saiduzzaman</span></a>
                <a className="social-link" href="https://github.com/tasnim-s" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i><span>GitHub</span></a>
                <a className="social-link" href="https://www.linkedin.com/in/tasnim-s/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i><span>LinkedIn</span></a>
                <a className="social-link" href="https://angel.co/u/tasnim-saiduzzaman" target="_blank" rel="noopener noreferrer"><i className="fab fa-angellist"></i>Angel List</a>
            </div>
        )
    }
}