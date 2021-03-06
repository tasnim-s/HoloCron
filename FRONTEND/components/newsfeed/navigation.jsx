import React from 'react';

export default class Navigation extends React.Component {
    render() {
        return (
            <div className="navigation">

                <a className="social-link" href="http://tasnimsaiduzzaman.com/" target="_blank" rel="noopener noreferrer"><img src={window.tasnim} /><span>Tasnim Saiduzzaman (Creator)</span></a>
                <a className="social-link" href="https://github.com/tasnim-s" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i><span>GitHub</span></a>
                <a className="social-link" href="https://www.linkedin.com/in/tasnim-s/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i><span>LinkedIn</span></a>
                <a className="social-link" href="https://angel.co/u/tasnim-saiduzzaman" target="_blank" rel="noopener noreferrer"><i className="fab fa-angellist"></i>Angel List</a>
                <div className="border"></div>
                <div className="semi-footer">
                    <div className="blurb">
                        Holocron is a clone of the popular social media site Facebook • Tasnim Saiduzzaman © 2021
                    </div>
                </div>
            </div>
        )
    }
}