import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Modal from './modal';
import Greeting from './header';

export default () => (
    <div>
        <Modal />
        <header>
            <Link to="/">
                <h1>Holocron™</h1>
            </Link>
            <Greeting />
        </header>
        
    </div>
);